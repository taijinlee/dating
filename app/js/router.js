
define([
  'views/signup',
  'views/users/list'
], function(signupView, usersListView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'landingPage',
      '/users': 'showUsers',
      '*actions': 'defaultAction'
    },

    landingPage: function() {
      signupView.render();
    },

    showUsers: function() {
      usersListView.render();
    },

    defaultAction: function(actions) {
      console.log('No Route:', actions);
    }

  });

  var initialize = function() {
    var router = new AppRouter;
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});
