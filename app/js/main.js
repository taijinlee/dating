
require.config({
  paths: {
    jQuery: 'libs/jquery/jquery',
    Underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone'
  }
});

require([
  // load the app
  'app',
], function(App) {
  // The "app" is passed in as App
  App.initialize();

});
