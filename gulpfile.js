var fs = require('fs');
var gulp = require('gulp');
var gutil = require("gulp-util");
var del = require('del');
var webpack = require('webpack');
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
var SOURCE = __dirname + '/resources/assets';
var BUILD = __dirname + '/public/assets';
var STATIC_HOST = (function() {
    return /STATIC_HOST=.*/.test(env) ? env.match(/STATIC_HOST=(.*)/)[1] : 'http://assets.itfind.me';
})();
var VIEWS_ROOT = (function() {
    return /VIEWS_ROOT=.*/.test(env) ? env.match(/VIEWS_ROOT=(.*)/)[1] : 'resources/views';
})();
var VIEWS_BUILD_ROOT = (function() {
    return /VIEWS_BUILD_ROOT=.*/.test(env) ? env.match(/VIEWS_BUILD_ROOT=(.*)/)[1] : 'resources/views_build';
})();
//clean mobile
gulp.task('clean:mobile-css', function() {
    return del([BUILD + '/css/mobile/**/*']);
});
gulp.task('clean:mobile-js', function() {
    return del([BUILD + '/js/mobile/**/*']);
});
gulp.task('clean:mobile-html', function() {
    return del([VIEWS_BUILD_ROOT + '/mobile/**/*']);
});
//clean pc
gulp.task('clean:pc-css', function() {
    return del([BUILD + '/css/pc/**/*']);
});
gulp.task('clean:pc-js', function() {
    return del([BUILD + '/js/pc/**/*']);
});
gulp.task('clean:pc-html', function() {
    return del([VIEWS_BUILD_ROOT + '/pc/**/*']);
});
//clean common
gulp.task('clean:lib-css', function() {
    return del([BUILD + '/css/lib/**/*']);
});
gulp.task('clean:lib-js', function() {
    return del([BUILD + '/js/lib/**/*']);
});
gulp.task('clean:img', function() {
    return del([BUILD + '/img/**/*']);
});
//clean rev-manifest
gulp.task('clean:mobile-rev-manifest', function() {
    return del([BUILD + '/mobile-rev-manifest.json']);
});
//clean rev-manifest
gulp.task('clean:pc-rev-manifest', function() {
    return del([BUILD + '/pc-rev-manifest.json']);
});
//copy common
gulp.task('copy:lib-css', ['clean:lib-css'], function() {
    return gulp.src([SOURCE + '/css/lib/**/*.css']).pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(gulp.dest(BUILD + '/css/lib'));
});
gulp.task('copy:lib-css-dev', ['clean:lib-css'], function() {
    return gulp.src([SOURCE + '/css/lib/**/*.css']).pipe(gulp.dest(BUILD + '/css/lib'));
});
gulp.task('copy:lib-js', ['clean:lib-js'], function() {
    return gulp.src([SOURCE + '/js/lib/**/*.js']).pipe(uglify()).pipe(gulp.dest(BUILD + '/js/lib'));
});
gulp.task('copy:lib-js-dev', ['clean:lib-js'], function() {
    return gulp.src([SOURCE + '/js/lib/**/*.js']).pipe(gulp.dest(BUILD + '/js/lib'));
});
gulp.task('copy:img', ['clean:img'], function() {
    return gulp.src(SOURCE + '/img/**/*').pipe(gulp.dest(BUILD + '/img'));
});
//copy mobile js
gulp.task('mobile-webpack', ['clean:mobile-js'], function(callback) {
    var webpackConf = require('./webpack.mobile.config.js');
    webpack(webpackConf, function(err, stats) {
        if (err) throw new gutil.PluginError("mobile-webpack", err);
        gutil.log("[mobile-webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
gulp.task('mobile-js', ['mobile-webpack'], function() {
    return gulp.src([BUILD + '/js/mobile/**/*.js']).pipe(jshint()).pipe(uglify()).pipe(rev()).pipe(gulp.dest(BUILD + '/js/mobile')).pipe(rev.manifest(BUILD + '/mobile-rev-manifest.json', {
        base: BUILD,
        merge: true
    })).pipe(gulp.dest(BUILD));
});
gulp.task('mobile-js-dev', ['mobile-webpack'], function() {
    return gulp.src([BUILD + '/js/mobile/**/*.js']).pipe(jshint()).pipe(gulp.dest(BUILD + '/js/mobile'));
});
//copy pc js
gulp.task('pc-webpack', ['clean:pc-js'], function(callback) {
    var webpackConf = require('./webpack.pc.config.js');
    webpack(webpackConf, function(err, stats) {
        if (err) throw new gutil.PluginError("pc-webpack", err);
        gutil.log("[pc-webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
gulp.task('pc-js', ['pc-webpack'], function() {
    return gulp.src([BUILD + '/js/pc/**/*.js']).pipe(jshint()).pipe(uglify()).pipe(rev()).pipe(gulp.dest(BUILD + '/js/pc')).pipe(rev.manifest(BUILD + '/pc-rev-manifest.json', {
        base: BUILD,
        merge: true
    })).pipe(gulp.dest(BUILD));
});
gulp.task('pc-js-dev', ['pc-webpack'], function() {
    return gulp.src([BUILD + '/js/pc/**/*.js']).pipe(jshint()).pipe(gulp.dest(BUILD + '/js/pc'));
});
//copy mobile css
gulp.task('mobile-sass', ['clean:mobile-css', 'copy:img'], function() {
    return gulp.src([SOURCE + '/css/mobile/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass()).on('error', sass.logError).pipe(autoprefixer({
        browsers: ['last 18 versions'],
        cascade: false
    })).pipe(csslint(SOURCE + '/css/mobile/.csslintrc.json')).pipe(csscomb(SOURCE + '/css/.csscomb.json')).pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(cssBase64({
        baseDir: BUILD,
        maxWeightResource: 32768,
        extensionsAllowed: ['.gif', '.jpg', '.png']
    })).pipe(rev()).pipe(gulp.dest(BUILD + '/css/mobile')).pipe(rev.manifest(BUILD + '/mobile-rev-manifest.json', {
        base: BUILD,
        merge: true
    })).pipe(gulp.dest(BUILD));
});
gulp.task('mobile-sass-dev', ['clean:mobile-css', 'copy:img'], function() {
    return gulp.src([SOURCE + '/css/mobile/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass()).on('error', sass.logError).pipe(gulp.dest(BUILD + '/css/mobile'));
});
//copy pc css
gulp.task('pc-sass', ['clean:pc-css', 'copy:img'], function() {
    return gulp.src([SOURCE + '/css/pc/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass()).on('error', sass.logError).pipe(autoprefixer({
        browsers: ['last 18 versions'],
        cascade: false
    })).pipe(csslint(SOURCE + '/css/pc/.csslintrc.json')).pipe(csscomb(SOURCE + '/css/.csscomb.json')).pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(cssBase64({
        baseDir: BUILD,
        maxWeightResource: 32768,
        extensionsAllowed: ['.gif', '.jpg', '.png']
    })).pipe(rev()).pipe(gulp.dest(BUILD + '/css/pc')).pipe(rev.manifest(BUILD + '/pc-rev-manifest.json', {
        base: BUILD,
        merge: true
    })).pipe(gulp.dest(BUILD));
});
gulp.task('pc-sass-dev', ['clean:pc-css', 'copy:img'], function() {
    return gulp.src([SOURCE + '/css/pc/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass()).on('error', sass.logError).pipe(gulp.dest(BUILD + '/css/pc'));
});
//copy mobile html
gulp.task('mobile-html', ['mobile-js', 'mobile-sass', 'clean:mobile-html'], function() {
    var resourcesMap = require(BUILD + '/mobile-rev-manifest.json');
    return gulp.src(VIEWS_ROOT + '/mobile/**/*').pipe(revReplace({
        replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php'],
        manifest: gulp.src(BUILD + '/mobile-rev-manifest.json')
    })).pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    })).pipe(gulp.dest(VIEWS_BUILD_ROOT + '/mobile'));
});
//copy pc html
gulp.task('pc-html', ['pc-js', 'pc-sass', 'clean:pc-html'], function() {
    var resourcesMap = require(BUILD + '/pc-rev-manifest.json');
    return gulp.src(VIEWS_ROOT + '/pc/**/*').pipe(revReplace({
        replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php'],
        manifest: gulp.src(BUILD + '/pc-rev-manifest.json')
    })).pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    })).pipe(gulp.dest(VIEWS_BUILD_ROOT + '/pc'));
});
//watch mobile
gulp.task('watch:mobile', function() {
    gulp.watch(SOURCE + '/js/mobile/**/*.js', ['mobile-js-dev']);
    gulp.watch(SOURCE + '/css/mobile/**/*.scss', ['mobile-sass-dev']);
});
//watch pc
gulp.task('watch:pc', function() {
    gulp.watch(SOURCE + '/js/pc/**/*.js', ['pc-js-dev']);
    gulp.watch(SOURCE + '/css/pc/**/*.scss', ['pc-sass-dev']);
});
//watch 全部
gulp.task('watch', ['watch:mobile', 'watch:pc']);
//build mobile
gulp.task('build:mobile', ['copy:lib-css', 'copy:lib-js', 'mobile-html']);
//开发环境下build mobile
gulp.task('build:mobile-dev', ['copy:lib-css-dev', 'copy:lib-js-dev', 'mobile-js-dev', 'mobile-sass-dev']);
//build pc
gulp.task('build:pc', ['copy:lib-css', 'copy:lib-js', 'pc-html']);
//开发环境下build pc
gulp.task('build:pc-dev', ['copy:lib-css-dev', 'copy:lib-js-dev', 'pc-js-dev', 'pc-sass-dev']);
//默认build全部
gulp.task('default', ['copy:lib-css', 'copy:lib-js', 'mobile-html', 'pc-html']);
//开发环境下build全部
gulp.task('dev', ['copy:lib-css-dev', 'copy:lib-js-dev', 'mobile-js-dev', 'mobile-sass-dev', 'pc-js-dev', 'pc-sass-dev']);