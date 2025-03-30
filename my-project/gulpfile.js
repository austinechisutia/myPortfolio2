const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// File paths
const paths = {
    scss: "scss/**/*.scss", // Watch all SCSS files in scss/ folder
    css: "css" // Output folder for compiled CSS
};

// Compile SCSS to CSS
function compileSCSS() {
    return gulp.src(paths.scss) // Source SCSS files
        .pipe(sass().on("error", sass.logError)) // Compile SCSS
        .pipe(postcss([autoprefixer()])) // Add vendor prefixes
        .pipe(gulp.dest(paths.css)) // Save CSS
        .pipe(cleanCSS()) // Minify CSS
        .pipe(rename({ suffix: ".min" })) // Rename to style.min.css
        .pipe(gulp.dest(paths.css)) // Save minified CSS
        .pipe(browserSync.stream()); // Inject changes into browser
}

// Watch files for changes
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: "./" // Serve from root folder
        }
    });
    gulp.watch(paths.scss, compileSCSS); // Watch SCSS files
    gulp.watch("*.html").on("change", browserSync.reload); // Reload on HTML change
}

// Default task
exports.default = gulp.series(compileSCSS, watchFiles);
