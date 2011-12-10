
define([
  'views/users/list'
], function(usersListView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '/users': 'showUsers',
      '*actions': 'defaultAction'
    },

    showUsers: function() {
      usersListView.render();
    },

    defaultAction: function(actions) {
      console.log('No Route:', actions);
    }

  });

  var initialize = function() {
    var app_router = new AppRouter;
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});
