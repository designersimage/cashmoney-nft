// Load Gulp
import pkg from 'gulp';
const { src, dest, task, watch, series, parallel } = pkg;

// CSS related plugins
import dartSass              from 'sass';
import gulpSass              from 'gulp-sass';
const sass = gulpSass(dartSass)
import autoprefixer          from 'gulp-autoprefixer';

// JS related plugins
import uglify                from 'gulp-uglify';
import babelify              from 'babelify';
import browserify            from 'browserify';
import source                from 'vinyl-source-stream';
import buffer                from 'vinyl-buffer';
import stripDebug            from 'gulp-strip-debug';

// Image related plugins
import changed               from 'gulp-changed';
import imagemin              from 'gulp-imagemin';

// Utility plugins
import rename                from 'gulp-rename';
import sourcemaps            from 'gulp-sourcemaps';
import notify                from 'gulp-notify';
import plumber               from 'gulp-plumber';
import options               from 'gulp-options';
import gulpif                from 'gulp-if';

// Browers related plugins
import browserSync           from 'browser-sync';
browserSync.create();

// Project related variables
const projectURL                = 'http://cashmoneycoin.local/';

const styleThemeSRC             = './src/scss/main.scss';
const styleThemeURL             = './assets/';
const mapThemeURL               = './';

const jsThemeSRC                = './src/js/';
const jsTheme                   = 'main.js';
const jsThemeForms              = 'forms.js';
const jsThemeFiles              = [ jsTheme, jsThemeForms ];
const jsThemeURL                = './assets/';

const imgSRC                    = './src/images/*.{png,jpg}';
const imgURL                    = './assets/images/';

const svgSRC                    = './src/images/*.{svg}';
const svgURL                    = './assets/images/';

const fontsSRC     = './src/fonts/*.{otf,ttc,ttf}';
const fontsURL     = './assets/fonts/';

const styleThemeWatch   = './src/scss/**/*.scss';
const jsThemeWatch      = './src/js/**/*.js';
const imgWatch          = './src/images/*.{png,jpg}';
const svgWatch          = './src/images/*.{svg}';
const fontsWatch        = './src/fonts/*.{otf,ttc,ttf}';
const htmlWatch         = './**/*.html';
//const phpWatch    = './**/*.php';

// Tasks
function browser_sync() {
	browserSync.init({
		proxy: projectURL,
	});
}

function reload(done) {
	browserSync.reload();
	done();
}

function css(done) {

    /* Theme CSS Style */
    src( [ styleThemeSRC ] )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( mapThemeURL ) )
		.pipe( dest( styleThemeURL ) )
		.pipe( browserSync.stream() );
	
    done();
};

function js(done) {
	
    jsThemeFiles.map( function( entry ) {
		return browserify({
			entries: [jsThemeSRC + entry]
		})
		.transform( babelify, { presets: [ '@babel/preset-env' ] } )
		.bundle()
		.pipe( source( entry ) )
		.pipe( rename( {
			extname: '.min.js'
        } ) )
		.pipe( buffer() )
		.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( dest( jsThemeURL ) )
		.pipe( browserSync.stream() );
	});

	done();
};

function triggerPlumber( src_file, dest_file ) {
	return src( src_file )
		.pipe( plumber() )
		.pipe( dest( dest_file ) );
}

function images(done) {
    src( imgSRC )
        .pipe( changed( imgURL ) )
        .pipe( imagemin() )
        .pipe( dest( imgURL ) );
    
    done();
	//return triggerPlumber( imgSRC, imgURL );
};

function svg() {
	return triggerPlumber( svgSRC, svgURL );
};

function fonts() {
	return triggerPlumber( fontsSRC, fontsURL );
};

function watch_files() {
	watch(styleThemeWatch, series(css, reload));
	watch(jsThemeWatch, series(js, reload));
	watch(imgWatch, series(images, reload));
    watch(svgWatch, series(svg, reload));
	watch(fontsWatch, series(fonts, reload));
    watch(htmlWatch, reload);
    src(jsThemeURL + 'main.min.js');
}

function watch_php() {
    watch(phpWatch, reload);
}

function watch_html() {
    watch(htmlWatch, reload);
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
// task("live", parallel(browser_sync, watch_php));
task("html", parallel(browser_sync, watch_html));
task("default", parallel(css, js, svg, images, fonts));
task("watch", parallel(browser_sync, watch_files));