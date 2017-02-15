const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'index.js',
    ext: 'js'
  })
});