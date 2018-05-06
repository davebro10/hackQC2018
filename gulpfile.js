const gulp = require('gulp');
const del = require('del');
const tscConfig = require('./tsconfig.json');

const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');

// Files paths
const jsFiles = './src/**/*.js'
const tsFiles = './src/**/*.ts';
const mapFiles = './src/**/*.map';

/**
 * Convert typescript to javascript files.
 * Add the files mapping for the debug.
 */
gulp.task('compile', ['clean', 'tslint'], () => {
    const tsProject = typescript.createProject('tsconfig.json');
    return gulp
        .src(tsFiles, { base: '.' })
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.', { sourceRoot: '' }))
        .pipe(gulp.dest('.'));
});

gulp.task("tslint", () =>
    gulp.src(tsFiles)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report({
            allowWarnings: true
        }))
);

/**
 * Clean the temporary files.
 * .js / .map
 */
gulp.task('clean', () => {
    del(jsFiles);
    del(mapFiles)
    return;
});

/**
 * 
 */
gulp.task('debug', ['compile'], () => {
    return nodemon({
        watch: 'src',
        tasks: ['compile']
    })
});