requirejs.config({
    baseUrl: 'public/js/',
    paths: {
        jquery: 'jquery-3.1.1.min',
        angular: 'angular.min',
        ngResource: 'angular-resource.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ngResource': ['angular']
    },
    deps: ['metro.min', 'tinymce.min', 'Chart.min']
});