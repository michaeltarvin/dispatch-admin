var gulp = require('gulp');
var rimraf = require('rimraf');
var fs = require('fs');
var cheerio = require('cheerio');

gulp.task('dist', function(done) {

  var content = fs.readFileSync('./dist/dispatch/index.html', 'utf8');

  fs.writeFileSync('../backend/resources/views/welcome.blade.php', content, 'utf8');
  done();
});
