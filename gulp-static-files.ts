'use strict';

let staticFiles = {
    css: [],
    js: [],
    bower: [],
};

staticFiles.css = [
    'node_modules/at.js/dist/css/jquery.atwho.min.css',
    'public/css/line-awesome.min.css',
    'public/css/line-awesome-font-awesome.min.css',
    'public/css/fonts.css',
    'public/css/bootstrap.min.css',
    'public/css/bootstrap-select.min.css',
    'node_modules/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
    'public/css/editor.min.css',
    'public/css/style.css',
    'public/css/responsive.css',
    'public/css/toastr.css',
];

staticFiles.js = [
    'public/js/crypto-js.min.js',
    'public/js/raven.min.js',
    'public/js/jquery-2.1.4.min.js',
    'public/js/bootstrap-select.min.js',
    // 'public/js/custom.js',
    'public/js/editor.min.js',
    'node_modules/at.js/dist/js/jquery.atwho.min.js',
    'node_modules/bootstrap-timepicker/js/bootstrap-timepicker.js',
    'socket.io-client/socket.io.js',
];

staticFiles.bower = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/slicknav/dist/jquery.slicknav.js',
    'bower_components/slick-carousel/slick/slick.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/owl.carousel/dist/owl.carousel.js',
    'bower_components/isotope/jquery.isotope.js',
    'bower_components/letteringjs/jquery.lettering.js',
    'bower_components/textillate/jquery.textillate.js',
    'bower_components/mediaelement/build/mediaelement-and-player.js',
    'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
];

exports.staticFiles = staticFiles;
