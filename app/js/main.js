
require([
  'router' // get router.js
], function(Router) {
  var vent = _.extend({}, Backbone.Events);
  var router = new Router({ 'vent': vent });

});
