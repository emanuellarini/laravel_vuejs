var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.scripts([
    	'/../../../node_modules/jquery/dist/jquery.js',
    	'/../../../node_modules/bootstrap/dist/js/bootstrap.js',
    	'/../../../node_modules/vue/dist/vue.js',
    	'/../../../node_modules/vue-resource/dist/vue-resource.js',
        '/../../../node_modules/moment/moment.js',
        '/../../../node_modules/lodash/lodash.js',
        '/../../../node_modules/select2/dist/js/select2.js',
        '/../../../node_modules/jquery-mask-plugin/dist/jquery.mask.js',
        '/../../../node_modules/jquery-validation/dist/jquery.validate.js',
        '/../../../node_modules/jquery-validation/dist/additional-methods.js',
        '/../../../node_modules/jquery-validation/dist/localization/messages_pt_BR.js',
    	'app.js'
    	], 'public/js/app.js');

    mix.styles([
    	'/../../../node_modules/bootstrap/dist/css/bootstrap.css',
        '/../../../node_modules/font-awesome/css/font-awesome.css',
        '/../../../node_modules/select2/dist/css/select2.css'
    	], 'public/css/app.css');

    mix.copy('node_modules/font-awesome/fonts', 'public/fonts');

});
