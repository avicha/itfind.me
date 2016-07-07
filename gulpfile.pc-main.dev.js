var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var del = require('del');
var replace = require('gulp-replace');
var webpack = require('webpack');
//CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
//JS
var jshint = require('gulp-jshint');

var SOURCE = __dirname + '/resources/assets';
var BUILD = __dirname + '/public/assets';
//配置路径
var env = fs.readFileSync(__dirname + '/.env', {
    encoding: 'utf8'
});
var STATIC_HOST = (function() {
    return /STATIC_HOST=.*/.test(env) ? env.match(/STATIC_HOST=(.*)/)[1] : 'http://assets.itfind.me';
})();
var block = 'pc-main';
var blockPath = 'pc/main';
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
gulp.task('copy:lib-css', ['clean:lib-css'], function() {
    return gulp.src([SOURCE + '/css/lib/**/*']).pipe(gulp.dest(BUILD + '/css/lib'));
});
gulp.task('copy:lib-js', ['clean:lib-js'], function() {
    return gulp.src([SOURCE + '/js/lib/**/*.js']).pipe(gulp.dest(BUILD + '/js/lib'));
});
gulp.task('copy:img', ['clean:img'], function() {
    return gulp.src(SOURCE + '/img/**/*').pipe(gulp.dest(BUILD + '/img'));
});
//clean block
gulp.task('clean:' + block + '-css', function() {
    return del([BUILD + '/css/' + blockPath + '/**/*']);
});
gulp.task('clean:' + block + '-js', function() {
    return del([BUILD + '/js/' + blockPath + '/**/*']);
});
gulp.task(block + '-webpack', ['clean:' + block + '-js'], function(callback) {
    var webpackConf = require('./webpack.' + block + '.config.dev.js');
    webpack(webpackConf, function(err, stats) {
        if (err) throw new gutil.PluginError('[' + block + '-webpack]', err);
        gutil.log('[' + block + '-webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});
gulp.task(block + '-js', [block + '-webpack'], function() {
    return gulp.src([BUILD + '/js/' + blockPath + '/**/*.js']).pipe(jshint()).pipe(gulp.dest(BUILD + '/js/' + blockPath));
});
gulp.task(block + '-sass', ['clean:' + block + '-css', 'copy:img'], function() {
    return gulp.src([SOURCE + '/css/' + blockPath + '/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(BUILD + '/css/' + blockPath));
});
//watch block
gulp.task('watch', function() {
    gulp.watch(SOURCE + '/js/' + blockPath + '/**/*.js', [block + '-js']);
    gulp.watch(SOURCE + '/css/' + blockPath + '/**/*.scss', [block + '-sass']);
});
gulp.task('default', ['copy:lib-css', 'copy:lib-js', block + '-js', block + '-sass']);