<?php

namespace App\Http\Controllers\Auth;

use App\Http\Models\User;
use Validator;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use Illuminate\Foundation\Auth\ThrottlesLogins;
// use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    // use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    // protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(Request $req)
    {
        $this->middleware('guest', ['except' => 'logout']);

    }

    public function showLoginForm()
    {
        return view(\App\Common\Utils::getAgent().'.auth.login');
    }

    public function login(Request $req)
    {
        $credentials = $req->only('phone', 'password');
        $redirect_uri = $req->input('redirect_uri');
        $validator = $this->getLoginValidator($credentials);
        if($validator->fails()){
            return redirect()->route('login', ['redirect_uri' => $redirect_uri ?: '/'])->withInput($req->only('phone', 'remember'))->withErrors($validator);
        }else{
            if(Auth::guard('web')->attempt($credentials, $req->has('remember'))){
                if(Auth::user()->active){
                    return redirect()->intended($redirect_uri);
                }
                else{
                    return redirect()->back()->withInput($req->only('phone', 'remember'))->withErrors(['phone' => '你的账号已经被冻结，请联系管理员']);
                }
            }else{
                return redirect()->back()->withInput($req->only('phone', 'remember'))->withErrors(['phone' => '账号或者密码不正确']);
            }
        }
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getLoginValidator(array $data)
    {
        return Validator::make($data, [
            'phone' => 'required|size:11',
            'password' => 'required'
        ], ['phone.required' => '请输入手机号码', 'phone.size' => '请输入11位数字的手机号码', 'password.required' => '请输入密码']);
    }

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        Auth::guard('web')->logout();
        return redirect('/');
    }

    public function showRegistrationForm()
    {
        return view(\App\Common\Utils::getAgent().'.auth.register');
    }

    public function register(Request $req)
    {
        $credentials = $req->only('phone', 'nick', 'password', 'password_confirmation');
        $redirect_uri = $req->input('redirect_uri');
        $validator = $this->getRegisterValidator($credentials);
        if($validator->fails()){
            return redirect()->route('register', ['redirect_uri' => $redirect_uri ?: '/'])->withInput($req->only('phone', 'nick'))->withErrors($validator);
        }else{
            $user = $this->create($credentials);
            Auth::guard('web')->login($user);
            return redirect()->intended($redirect_uri);
        }
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getRegisterValidator(array $data)
    {
        return Validator::make($data, [
            'phone' => 'required|size:11|unique:users,phone',
            'password' => 'required|confirmed',
            'nick' => 'required',
        ], ['phone.required' => '请输入手机号码', 'phone.size' => '请输入11位数字的手机号码', 'phone.unique' => '手机号码已经被注册', 'password.required' => '请输入密码', 'password.confirmed' => '请输入一致的密码', 'nick.required' => '请输入昵称']);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'phone' => $data['phone'],
            'nick' => $data['nick'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
