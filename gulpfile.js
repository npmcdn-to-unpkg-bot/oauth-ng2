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
gulp.task('compile', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))

    tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// start webserver and observe files for changes
gulp.task('serve', ['compile'], function () {
    browserSync.init(config.browserSync);
    gulp.watch(config.app.source + '/**/*.ts', ['compile:ts']);
    gulp.watch(config.browserSync.server.baseDir + '/**/*.*', ['copy'])
        .on('change', browserSync.reload);
});