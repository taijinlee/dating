
define([
  'views/signup',
  'views/users/list',
  'views/profile'
], function(signupView, usersListView, profileView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'landingPage',
      '/users': 'showUsers',
      '/profile': 'editProfile',
      '*actions': 'defaultAction'
    },

    landingPage: function() {
      var view = new signupView();
      view.render();
    },

    showUsers: function() {
      var view = new usersListView;
      view.render();
    },

    editProfile: function() {
      var view = new profileView;
      view.render();
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
