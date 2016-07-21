var fs = require('fs');
var url = require('url');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var del = require('del');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxy = require('proxy-middleware');
var browserSync = require('browser-sync').create();
//CSS
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var csscomb = require('gulp-csscomb');
var cssBase64 = require('gulp-css-base64');
//JS
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
//HTML
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
//配置路径
var env = fs.readFileSync(__dirname + '/.env', {
    encoding: 'utf8'
});
var projects = ['mobile-main', 'pc-admin', 'pc-main', 'pc-auth'];
var SOURCE = __dirname + '/resources/assets';
var BUILD = __dirname + '/public/assets';
var STATIC_URL_PREFIX = (function() {
    return /STATIC_URL_PREFIX=.*/.test(env) ? env.match(/STATIC_URL_PREFIX=(.*)/)[1] : 'http://assets.itfind.me';
})();
var VIEWS_ROOT = (function() {
    return /VIEWS_ROOT=.*/.test(env) ? env.match(/VIEWS_ROOT=(.*)/)[1] : 'resources/views';
})();
var VIEWS_BUILD_ROOT = (function() {
    return /VIEWS_BUILD_ROOT=.*/.test(env) ? env.match(/VIEWS_BUILD_ROOT=(.*)/)[1] : 'resources/views_build';
})();
//clean common
gulp.task('clean:libs', function() {
    return del([BUILD + '/libs/**/*']);
});
gulp.task('clean:img', function() {
    return del([BUILD + '/img/**/*']);
});
//copy common
gulp.task('copy:libs', ['clean:libs'], function() {
    return gulp.src([SOURCE + '/libs/**/*']).pipe(gulpif('*.css', cleanCSS({
        compatibility: 'ie8'
    }))).pipe(gulpif('*.js', uglify())).pipe(gulp.dest(BUILD + '/libs'));
});
gulp.task('copy:libs-dev', ['clean:libs'], function() {
    return gulp.src([SOURCE + '/libs/**/*']).pipe(gulp.dest(BUILD + '/libs'));
});
gulp.task('copy:img', ['clean:img'], function() {
    return gulp.src(SOURCE + '/img/**/*').pipe(gulp.dest(BUILD + '/img'));
});

var generateProjectTasks = function(project) {
    //clean project
    gulp.task('clean:' + project + '-css', function() {
        return del([BUILD + '/' + project + '/css/**/*']);
    });
    gulp.task('clean:' + project + '-js', function() {
        return del([BUILD + '/' + project + '/js/**/*']);
    });
    gulp.task('clean:' + project + '-html', function() {
        return del([VIEWS_BUILD_ROOT + '/' + project + '/**/*']);
    });
    //clean project rev-manifest
    gulp.task('clean:' + project + '-rev-manifest', function() {
        return del([BUILD + '/' + project + '-rev-manifest.json']);
    });
    //copy project js
    gulp.task(project + '-webpack', ['clean:' + project + '-js'], function(callback) {
        var webpackConfFile = './webpack.' + project + '.config.prod.js';
        if (fs.existsSync(webpackConfFile)) {
            var webpackConf = require(webpackConfFile);
            webpack(webpackConf, function(err, stats) {
                if (err) throw new gutil.PluginError('[' + project + '-webpack]', err);
                gutil.log('[' + project + '-webpack]', stats.toString({
                    // output options
                }));
                callback();
            });
        } else {
            callback();
        }
    });
    gulp.task(project + '-webpack-dev', ['clean:' + project + '-js'], function(callback) {
        var webpackConfFile = './webpack.' + project + '.config.dev.js';
        if (fs.existsSync(webpackConfFile)) {
            var webpackConf = require(webpackConfFile);
            webpack(webpackConf, function(err, stats) {
                if (err) throw new gutil.PluginError('[' + project + '-webpack-dev]', err);
                gutil.log('[' + project + '-webpack]', stats.toString({
                    // output options
                }));
                callback();
            });
        } else {
            callback();
        }
    });
    gulp.task(project + '-js', [project + '-webpack'], function() {
        return gulp.src([BUILD + '/' + project + '/js/**/*.js']).pipe(jshint()).pipe(uglify()).pipe(rev()).pipe(gulp.dest(BUILD + '/' + project + '/js')).pipe(rev.manifest(BUILD + '/' + project + '-rev-manifest.json', {
            base: BUILD,
            merge: true
        })).pipe(gulp.dest(BUILD));
    });
    gulp.task(project + '-js-dev', [project + '-webpack-dev']);
    //copy project css
    gulp.task(project + '-sass', ['clean:' + project + '-css', 'copy:img'], function() {
        return gulp.src([SOURCE + '/' + project + '/css/**/*.scss']).pipe(sass().on('error', sass.logError)).pipe(replace('@host', STATIC_URL_PREFIX)).pipe(autoprefixer({
            browsers: ['last 18 versions'],
            cascade: false
        })).pipe(csslint(SOURCE + '/.csslintrc.json')).pipe(csscomb(SOURCE + '/.csscomb.json')).pipe(cleanCSS({
            compatibility: 'ie8'
        })).pipe(cssBase64({
            baseDir: BUILD,
            maxWeightResource: 32768,
            extensionsAllowed: ['.gif', '.jpg', '.png']
        })).pipe(rev()).pipe(gulp.dest(BUILD + '/' + project + '/css')).pipe(rev.manifest(BUILD + '/' + project + '-rev-manifest.json', {
            base: BUILD,
            merge: true
        })).pipe(gulp.dest(BUILD));
    });
    gulp.task(project + '-sass-dev', ['clean:' + project + '-css', 'copy:img'], function() {
        return gulp.src([SOURCE + '/' + project + '/css/**/*.scss']).pipe(sass().on('error', sass.logError)).pipe(replace('@host', STATIC_URL_PREFIX)).pipe(gulp.dest(BUILD + '/' + project + '/css')).pipe(browserSync.stream());
    });
    //copy project html
    gulp.task(project + '-html', [project + '-js', project + '-sass', 'clean:' + project + '-html'], function() {
        return gulp.src(VIEWS_ROOT + '/' + project + '/**/*').pipe(revReplace({
            replaceInExtensions: ['.html', '.php'],
            manifest: gulp.src(BUILD + '/' + project + '-rev-manifest.json')
        })).pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })).pipe(gulp.dest(VIEWS_BUILD_ROOT + '/' + project));
    });
    //watch project
    gulp.task('watch:' + project, function() {
        gulp.watch(SOURCE + '/' + project + '/js/**/*.js', [project + '-js-dev']);
        gulp.watch(SOURCE + '/' + project + '/css/**/*.scss', [project + '-sass-dev']);
    });
    gulp.task('serve:' + project, [project + '-sass-dev'], function() {
        var webpackConfig = require('./webpack.' + project + '.config.dev.js');
        for (var i in webpackConfig.entry) {
            webpackConfig.entry[i].unshift('webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true&path=http://' + webpackConfig.devServer.host + ':' + webpackConfig.devServer.port + '/__webpack_hmr');
        }
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        var bundler = webpack(webpackConfig);
        var proxyOptions = url.parse(webpackConfig.devServer.proxy['*'].target);
        proxyOptions.route = '/';
        browserSync.init({
            server: {
                baseDir: 'public',
            },
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    noInfo: false,
                    quiet: false,
                    hot: true,
                    stats: {
                        colors: true
                    },
                }),
                webpackHotMiddleware(bundler),
                proxy(proxyOptions)
            ],
            open: false,
            port: webpackConfig.devServer.port
        });
        gulp.watch(SOURCE + '/' + project + '/css/**/*.scss', [project + '-sass-dev']);
    });
    //build project
    gulp.task('build:' + project, ['copy:libs', project + '-html']);
    //开发环境下build project
    gulp.task('build:' + project + '-dev', ['copy:libs-dev', project + '-js-dev', project + '-sass-dev']);
};

projects.forEach(function(project) {
    generateProjectTasks(project);
});
//默认build全部
gulp.task('default', ['copy:libs'], function() {
    projects.forEach(function(project) {
        gulp.start(project + '-html');
    });
});
//开发环境下build全部
gulp.task('dev', ['copy:libs-dev'], function() {
    projects.forEach(function(project) {
        gulp.start(project + '-js-dev');
        gulp.start(project + '-sass-dev');
    });
});
//watch 全部
gulp.task('watch', function() {
    projects.forEach(function(project) {
        gulp.start('watch:' + project);
    });
});