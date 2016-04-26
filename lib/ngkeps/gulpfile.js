var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache');

    gulp.task('build-dist',function(){
        var componentsCss = [
            'lib/textAngular/dist/textAngular.css',
            'lib/intl-tel-input/build/css/intlTelInput.css'
        ];

        gulp.src(componentsCss)
            .pipe(concat('concat.css'))
            .pipe(rename('ngkeps.css'))
            .pipe(gulp.dest('dist'));

        gulp.src('src/templates/**/*.html')
            .pipe(templateCache({module:'ngKeps', root:'../templates/'}))
            .pipe(gulp.dest('src/config'));

        var componentsJs = [
            'src/ngKeps.js',
            'src/config/*.js',
            'src/directives/*.js',
            'src/services/*.js',
            'lib/textAngular/dist/textAngular-rangy.min.js',
            'lib/textAngular/dist/textAngular-sanitize.min.js',
            'lib/textAngular/dist/textAngularSetup.js',
            'lib/textAngular/dist/textAngular.min.js',
            'src/load-dependencies-async.js'
        ];

        gulp.src(["src/ngKeps-services.js", "src/services/*.js"])
            .pipe(concat('concat.js'))
            .pipe(rename("ngkeps-services.js"))
            .pipe(gulp.dest("dist"));

    	return gulp.src(componentsJs)
    		.pipe(concat('concat.js'))
    		.pipe(rename('ngkeps.js'))
    		.pipe(gulp.dest('dist'))
            .pipe(uglify())
            .pipe(rename('ngkeps.min.js'))
            .pipe(gulp.dest('dist'));
    });

    //build just the ngkeps services into dist
    gulp.task("build-dist-services", function(){
        return gulp.src(["src/ngKeps-services.js", "src/services/*.js"])
                .pipe(concat('concat.js'))
                .pipe(rename("ngkeps-services.js"))
                .pipe(gulp.dest("dist"));
    });
