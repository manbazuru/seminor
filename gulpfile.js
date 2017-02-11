var gulp = require("gulp");

var sass = require("gulp-sass"); // sassコンパイル
var autoprefixer = require("gulp-autoprefixer"); // ベンダープレフィックス自動付与
var uglify = require("gulp-uglify"); // javascriptファイルの自動ミニファイド
var plumber = require("gulp-plumber"); // コンパイルエラー時にコネクト解除しない
var notify  = require('gulp-notify'); // エラー時にデスクトップに通知
var browser = require("browser-sync"); // ブラウザー自動リロード
var imagemin = require("gulp-imagemin"); //画像圧縮

var baseDir = './resourse';
var dist = './public';


 // サーバー設定
 gulp.task("server", function() {
    browser({
        server: {
            baseDir : dist, // 対象ディレクトリ
            index   : 'index.html' // インデックスファイル
        }
    });
});

//HTML リロード自動更新
gulp.task('html',function(){
gulp.src(dist + '/*.html')  
    .pipe(plumber())
    .pipe(browser.reload({stream:true}));
});
 
 //sassコンパイル、ベンダープレフィックス自動付与
gulp.task("sass", function() {
    gulp.src(baseDir + "/sass/*.scss")
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(dist + "/css"))
        .pipe(browser.reload({stream:true}));
});

 // javascriptファイルの自動ミニファイド
//  gulp.task("js", function() {
//      gulp.src(["./public/js/*.js","!js/min/**/*.js"])
//          .pipe(plumber())
//          .pipe(uglify())
//          .pipe(gulp.dest("./public/js/min"))
//          .pipe(browser.reload({stream:true}));
//  });

// 画像圧縮
// gulp.task('img',function(){
// gulp.src(baseDir + '/img/**/*.{jpg,png,gif}')  
//     .pipe(imagemin())
//     .pipe(gulp.dest(dist + "/img/"));
// });

//デフォルトタスク
 gulp.task("default",['server'], function() {
 //    gulp.watch(["./public/js/*.js","!js/min/**/*.js"],["js"]);
     gulp.watch(baseDir + "/sass/*.scss",["sass"]);
     gulp.watch(dist + "/*.html",["html"]);
     // gulp.watch(baseDir + '/img/**/*.{jpg,png,gif}',["img"]) ; 
 });

