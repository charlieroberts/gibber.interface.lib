var browserify = require( 'gulp-browserify' ),
    gulp = require( 'gulp' ),
    buffer = require( 'vinyl-buffer' ),
    uglify = require( 'gulp-uglify' ),
    rename = require( 'gulp-rename' ),
    insert = require( 'gulp-insert' );

gulp.task( 'client', function(){
  var out = gulp.src( './scripts/gibber/interface.lib.js')
    .pipe( browserify({ standalone:'Gibber', bare:true }) )
    .pipe( rename('gibber.interface.lib.js') )
    .pipe( gulp.dest('./build/') )
    .pipe( buffer() )
    .pipe( uglify() )
    .pipe( rename('gibber.interface.lib.min.js') )
    .pipe( gulp.dest('./build/') )
    
    return out
});

gulp.task( 'default', ['client'] )