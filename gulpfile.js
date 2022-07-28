/**
 * Require pliguns
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');
const uglify  = require('gulp-uglify');
const newer = require('gulp-newer');

/**
 * Require project's config
 */
const projectConfig = require('./config.json');

/**
 * Project's paths
 */
const path = projectConfig.path;
path.watch = {};

path.src.html[0] = path.src.srcPath + path.src.html[0];
path.src.html[1] =  "!" + path.src.html[0].slice(0, -6) + "_*.html";
path.src.html[2] =  "!" + path.src.srcPath + "/assets";
path.src.html[3] =  "!" + path.src.srcPath + "/html";
path.dist.html = path.dist.distPath + path.dist.html;
path.watch.html = [];
path.watch.html[0] = path.src.html[0];

path.src.style[0] = path.src.srcPath + path.src.style[0];
path.dist.style = path.dist.distPath + path.dist.style;
path.watch.style = [];
path.watch.style[0]  = path.src.style[0].replace( path.src.style[0].split('/').pop(), '**/*.scss' );

path.src.script[0] = path.src.srcPath + path.src.script[0];
path.dist.script = path.dist.distPath + path.dist.script;
path.watch.script = [];
path.watch.script[0] = path.src.script[0].replace( path.src.script[0].split('/').pop(), '**/*.js' );

path.src.image[0] = path.src.srcPath + path.src.image[0];
path.dist.image = path.dist.distPath + path.dist.image;
path.watch.image = [];
path.watch.image[0] = path.src.image[0];

path.src.font[0] = path.src.srcPath + path.src.font[0];
path.src.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";
path.dist.font = path.dist.distPath + path.dist.font;
path.watch.font = [];
path.watch.font[0] = path.src.font[0];
path.watch.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";

/**
 * Nunjucks
 */
function njk() {
	return gulp.src(path.src.html)
		.pipe(nunjucks.compile())
		.pipe(gulp.dest(path.dist.html))
		.on('end', browserSync.reload);
}
exports.njk = njk;

/**
 * Scss
 */
function scss() {
	return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			grid: true
		}))
		.pipe(gcmq())
		.pipe(csso())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.dist.style))
		.pipe(browserSync.reload({stream: true}));
}

/**
 * JavaScript
 */
function script() {
	return gulp.src(path.src.script)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.dist.script))
		.pipe(browserSync.reload({stream: true}));
}

/**
 * Image
 */
 function image() {
	return gulp.src(path.src.image)
		.pipe(newer(path.dist.image))
		.pipe(gulp.dest(path.dist.image))
		.pipe(browserSync.reload({stream: true}));
}

/**
 * Font
 */
function font() {
	return gulp.src(path.src.font)
		.pipe(gulp.dest(path.dist.font))
		.pipe(browserSync.reload({stream: true}));
}

/**
 * Watch changes
 */
function watch() {
	gulp.watch(path.watch.html, njk);
	gulp.watch(path.watch.style, scss);
	gulp.watch(path.watch.script, script);
	gulp.watch(path.watch.image, image);
	gulp.watch(path.watch.font, font);
}

/**
 * Serve
 */
function browsersync() {
	browserSync.init({
			open: true,
			server: path.dist.distPath,
	});
}

exports.default = gulp.series(
	gulp.parallel(njk, scss, script, image, font),
	gulp.parallel(browsersync, watch)
);
