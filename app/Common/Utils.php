<?php
namespace App\Common;

use Agent;
/**
* 
*/
class Utils
{
    static public function getAgent()
    {
        if(Agent::isDesktop()){
            return 'pc';
        }else{
            if(Agent::isPhone()){
                return 'mobile';
            }else{
                if(Agent::isRobot()){
                    return 'robot';
                }else{
                    return Agent::device();
                }
            }
        }
    }
    
}