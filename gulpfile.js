/// Gulp configuration for Typescript, SASS and Live Reload
'use strict';

// initialize all the requried libraries and files
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    config = {
        app: {
            source: './src',
            dest: './dist'
        },
        browserSync: {
            server: {
                baseDir: './demo',
                routes: {
                    '/node_modules': 'node_modules',
                    '/rxjs': 'node_modules/rxjs'
                }
            }
        }
    };

// create the typescript project for transpiling
var tsProject = typescript.createProject('./tsconfig.json');

// compile all typescript files
gulp.task('compile:ts', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))

    tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.app.dest))
        .pipe(browserSync.stream());
});

// copy anything that is not a sass file or typescript file
gulp.task('copy', function () {
    gulp.src('!' + config.app.source + '/**/*.ts', { base: config.app.source })
        .pipe(gulp.dest(config.app.dest))
});

gulp.task('build', ['copy']);

// start webserver and observe files for changes
gulp.task('serve', ['build'], function () {
    browserSync.init(config.browserSync);
    gulp.watch(config.app.source + '/**/*.ts', ['compile:ts']);
    gulp.watch(config.browserSync.server.baseDir + '/**/*.*', ['copy'])
        .on('change', browserSync.reload);
});