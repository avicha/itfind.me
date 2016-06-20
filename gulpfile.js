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
var blocks = ['mobile', 'pc-admin'];
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

var generateBlockTasks = function(block, blockPath) {
    //clean block
    gulp.task('clean:' + block + '-css', function() {
        return del([BUILD + '/css' + blockPath + '/**/*']);
    });
    gulp.task('clean:' + block + '-js', function() {
        return del([BUILD + '/js' + blockPath + '/**/*']);
    });
    gulp.task('clean:' + block + '-html', function() {
        return del([VIEWS_BUILD_ROOT + blockPath + '/**/*']);
    });
    //clean block rev-manifest
    gulp.task('clean:' + block + '-rev-manifest', function() {
        return del([BUILD + '/' + block + '-rev-manifest.json']);
    });
    //copy block js
    gulp.task(block + '-webpack', ['clean:' + block + '-js'], function(callback) {
        var webpackConf = require('./webpack.' + block + '.config.js');
        webpack(webpackConf, function(err, stats) {
            if (err) throw new gutil.PluginError('[' + block + '-webpack]', err);
            gutil.log('[' + block + '-webpack]', stats.toString({
                // output options
            }));
            callback();
        });
    });
    gulp.task(block + '-js', [block + '-webpack'], function() {
        return gulp.src([BUILD + '/js' + blockPath + '/**/*.js']).pipe(jshint()).pipe(uglify()).pipe(rev()).pipe(gulp.dest(BUILD + '/js' + blockPath)).pipe(rev.manifest(BUILD + '/' + block + '-rev-manifest.json', {
            base: BUILD,
            merge: true
        })).pipe(gulp.dest(BUILD));
    });
    gulp.task(block + '-js-dev', [block + '-webpack'], function() {
        return gulp.src([BUILD + '/js' + blockPath + '/**/*.js']).pipe(jshint()).pipe(gulp.dest(BUILD + '/js' + blockPath));
    });
    //copy block css
    gulp.task(block + '-sass', ['clean:' + block + '-css', 'copy:img'], function() {
        return gulp.src([SOURCE + '/css' + blockPath + '/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass().on('error', sass.logError)).pipe(autoprefixer({
            browsers: ['last 18 versions'],
            cascade: false
        })).pipe(csslint(SOURCE + '/css/.csslintrc.json')).pipe(csscomb(SOURCE + '/css/.csscomb.json')).pipe(cleanCSS({
            compatibility: 'ie8'
        })).pipe(cssBase64({
            baseDir: BUILD,
            maxWeightResource: 32768,
            extensionsAllowed: ['.gif', '.jpg', '.png']
        })).pipe(rev()).pipe(gulp.dest(BUILD + '/css' + blockPath)).pipe(rev.manifest(BUILD + '/' + block + '-rev-manifest.json', {
            base: BUILD,
            merge: true
        })).pipe(gulp.dest(BUILD));
    });
    gulp.task(block + '-sass-dev', ['clean:' + block + '-css', 'copy:img'], function() {
        return gulp.src([SOURCE + '/css' + blockPath + '/**/*.scss']).pipe(replace('@host', STATIC_HOST)).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(BUILD + '/css' + blockPath));
    });
    //copy block html
    gulp.task(block + '-html', [block + '-js', block + '-sass', 'clean:' + block + '-html'], function() {
        return gulp.src(VIEWS_ROOT + blockPath + '/**/*').pipe(revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php'],
            manifest: gulp.src(BUILD + '/' + block + '-rev-manifest.json')
        })).pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })).pipe(gulp.dest(VIEWS_BUILD_ROOT + blockPath));
    });
    //watch block
    gulp.task('watch:' + block, function() {
        gulp.watch(SOURCE + '/js' + blockPath + '/**/*.js', [block + '-js-dev']);
        gulp.watch(SOURCE + '/css' + blockPath + '/**/*.scss', [block + '-sass-dev']);
    });
    //build block
    gulp.task('build:' + block, ['copy:lib-css', 'copy:lib-js', block + '-html']);
    //开发环境下build block
    gulp.task('build:' + block + '-dev', ['copy:lib-css-dev', 'copy:lib-js-dev', block + '-js-dev', block + '-sass-dev']);
};

blocks.forEach(function(block) {
    var blockPath = block.split('-').map(function(str) {
        return '/' + str;
    }).join('');
    generateBlockTasks(block, blockPath);
});
//默认build全部
gulp.task('default', ['copy:lib-css', 'copy:lib-js'], function() {
    blocks.forEach(function(block) {
        gulp.start(block + '-html');
    });
});
//开发环境下build全部
gulp.task('dev', ['copy:lib-css-dev', 'copy:lib-js-dev'], function() {
    blocks.forEach(function(block) {
        gulp.start(block + '-js-dev');
        gulp.start(block + '-sass-dev');
    });
});
//watch 全部
gulp.task('watch', function() {
    blocks.forEach(function(block) {
        gulp.start(block + '-watch');
    });
});