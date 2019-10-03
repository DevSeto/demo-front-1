import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';
import {staticFiles} from './gulp-static-files.ts';

const gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    hash = require('gulp-hash'),
    tap = require('gulp-tap'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    gzip = require('gulp-gzip'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    replace = require('gulp-string-replace'),
    strip = require('gulp-strip-comments'),
    stripCssComments = require('gulp-strip-css-comments');

@Gulpclass()
export class Gulpfile {

    private destRoot: string = 'dist/';
    private Build: string = this.destRoot + 'build.js';

    private generatedFiles: any = {
        css: '',
        js: '',
    };

    private hashSettings: any = {
        hashLength: 5,
        algorithm: 'md5',
    };

    private imageOptimisationSettings: any = {
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: true}],
    };

    private replaceNameHelper: any = ( file: any ): string => file.relative.split('.')[1];

    @Task()
    public copyFiles(): any
    {
        return  gulp.src('client/src/index-aot.html')
            .pipe(rename({
                basename: 'index',
                extname: '.html',
            }))
            .pipe(gulp.dest(this.destRoot)),

            gulp.src('.htaccess').pipe(gulp.dest(this.destRoot)),
            gulp.src('favicon.ico').pipe(gulp.dest(this.destRoot)),
            gulp.src('public/fonts/**').pipe(gulp.dest(this.destRoot + 'public/fonts')),
            gulp.src('public/js/extsrc.min.js').pipe(gulp.dest(this.destRoot + 'public/js'));
    }

    @Task()
    public concatMainJs(): any
    {
        return gulp.src(staticFiles.js)
              .pipe(uglify().on('error', function(e){
                  console.log(e);
              }))
            .pipe(concat('main.js'))
            .pipe(gulp.dest(this.destRoot + 'public/js'));
    }

    @Task()
    public bowerConcat(): any
    {
        return gulp.src(staticFiles.bower)
            .pipe(uglify())
            .pipe(concat('bower.js'))
            .pipe(gulp.dest(this.destRoot + 'public/js'));
    }

    @Task()
    public zoneMinify(): any
    {
        return gulp.src('node_modules/zone.js/dist/zone.js')
            .pipe(uglify())
            .pipe(gulp.dest(this.destRoot));
    }

    @Task()
    public concatAllJs(): any
    {
        return gulp.src([
            this.destRoot + 'public/js/bower.js',
            this.destRoot + 'public/js/main.js',
            'node_modules/core-js/client/shim.min.js',
            this.destRoot + 'zone.js',
            this.Build])

            .pipe(concat('main.min.js'))
            .pipe(hash(this.hashSettings))
            .pipe(gulp.dest(this.destRoot + 'public/js'))

            .pipe(tap( ( file: any ) => {
                this.generatedFiles.js = 'public/js/main.' + this.replaceNameHelper(file) + '.js';
            }))

            .pipe(gzip())
            .pipe(gulp.dest(this.destRoot + 'public/js'));
    }

    @Task()
    public concatCss(): any
    {
        return gulp.src(staticFiles.css)
            .pipe(concatCss('main.min.css'))
            .pipe(cssmin())
            .pipe(hash(this.hashSettings))
            .pipe(gulp.dest(this.destRoot + 'public/css'))

            .pipe(tap( ( file: any ) => {
                this.generatedFiles.css = 'public/css/main.' + this.replaceNameHelper(file) + '.css';
            }))

            .pipe(gzip())
            .pipe(gulp.dest(this.destRoot + 'public/css'));
    }

    @Task()
    public concatMainCss(): any
    {
        return gulp.src(['public/css/main.css'])
          .pipe(cssmin())
          // .pipe(hash(this.hashSettings))
          .pipe(gulp.dest(this.destRoot + 'public/css'))

          .pipe(tap( ( file: any ) => {
              this.generatedFiles.css = 'public/css/main.main.css';
          }))

          .pipe(gzip())
          .pipe(gulp.dest(this.destRoot + 'public/css'));
    }
    @Task()
    public concatMainDarkCss(): any
    {
        return gulp.src(['public/css/main-dark.css'])
          .pipe(cssmin())
          // .pipe(hash(this.hashSettings))
          .pipe(gulp.dest(this.destRoot + 'public/css'))

          .pipe(tap( ( file: any ) => {
              this.generatedFiles.css = 'public/css/main.dark.css';
          }))

          .pipe(gzip())
          .pipe(gulp.dest(this.destRoot + 'public/css'));
    }
    @Task()
    public stripCss(): any
    {
        return gulp.src(this.destRoot + this.generatedFiles.css)
            .pipe(stripCssComments())
            .pipe(gulp.dest(this.destRoot + 'public/css'));
    }

    @Task()
    public stripJs(): any
    {
        return gulp.src(this.destRoot + this.generatedFiles.js)
            .pipe(strip())
            .pipe(gulp.dest(this.destRoot + 'public/js'));
    }

    @Task()
    public changeHtml(): any
    {
        return gulp.src(this.destRoot + 'index.html')
            .pipe(replace(/main.css/g, this.generatedFiles.css))
            .pipe(replace(/main.js/g, this.generatedFiles.js))
            .pipe(gulp.dest(this.destRoot));
    }

    @Task()
    public imagesOptimize(): any
    {
        return gulp.src('public/images/**').on('error', function(e){
            console.log(e);
        })
            .pipe(newer('dist/public/images')).on('error', function(e){
              console.log(e);
                })
            .pipe(imagemin(this.imageOptimisationSettings)).on('error', function(e){
              console.log(e);
          })
            .pipe(gulp.dest(this.destRoot + 'public/images')).on('error', function(e){
              console.log(e);
          });
    }

    @Task()
    public removeFiles(): any
    {
        const removedFiles: Array<string> = [
            this.destRoot + 'public/js/bower.js',
            this.destRoot + 'public/js/main.js',
            this.destRoot + 'build.js',
            this.destRoot + 'zone.js',
        ];

        return del(removedFiles);
    }

    @Task()
    public copyAllFiles(): any
    {
        return gulp.src(this.destRoot + '**').pipe(gulp.dest(this.destRoot + 'client'));
    }

    @Task()
    public removeAllFiles(): any
    {
        return del([
            this.destRoot + 'public/**',
            this.destRoot + '.htaccess',
            this.destRoot + 'favicon.ico',
            this.destRoot + 'index.html',
        ]);
    }

    @SequenceTask()
    public default(): Array<string>
    {
        console.log('Start minify and optimisation');

        return [
            'concatMainCss',
            'concatMainDarkCss',
            'copyFiles',
            'concatMainJs',
            'bowerConcat',
            'zoneMinify',
            'concatAllJs',
            'concatCss',
            'stripCss',
            'stripJs',
            'changeHtml',
            'imagesOptimize',
            'removeFiles',
            'copyAllFiles',
            'removeAllFiles',
        ];
    }
}