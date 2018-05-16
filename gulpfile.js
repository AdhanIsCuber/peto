const gulp = require('gulp')
const sass = require('gulp-sass')



gulp.task('sass', () => {
  return gulp.src('public/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/styles/'))
})


gulp.task('watch', () => {
  gulp.watch('public/styles/**/*.scss', ['sass']);

})

gulp.task('default', ['watch', 'sass']);