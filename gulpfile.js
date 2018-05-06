const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create();
const util = require('gulp-util');

var config = {
  assetsDir: 'public/styles/',
  sassPattern: 'public/styles/*.scss',
  production: !!util.env.production
};

console.log(util.env.production);

gulp.task('sass', () => {
  return gulp.src('public/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/styles/'))
})

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: "127.0.0.1:8000"
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('public/styles/**/*.scss', ['sass']);
  gulp.watch('views/**/*.hbs').on('change', browserSync.reload);
})

gulp.task('default', ['watch', 'sass', 'browser-sync']);