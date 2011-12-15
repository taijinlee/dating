
define([
  'views/signup',
  'views/users/list',
  'views/profile/edit'
], function(signupView, usersListView, profileEditView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'landingPage',
      '/users': 'showUsers',
      '/profile': 'editProfile',
      '*actions': 'defaultAction'
    },

    landingPage: function() {
      var session = this.getSession();
      var view = new signupView({ 'session': session });
      view.render();
    },

    showUsers: function() {
      var session = this.getSession();
      if (!this.checkLogin(session)) {
        return;
      }
      var view = new usersListView({ 'session': session });
      view.render();
    },

    editProfile: function() {
      var session = this.getSession();
      if (!this.checkLogin(session)) {
        return;
      }
      var view = new profileEditView({ 'session': session });
      view.render();
    },

    defaultAction: function(actions) {
      console.log('No Route:', actions);
    },


    getSession: function() {
      var session;
      $.ajax({
        'url': '/actions/session',
        'type': 'get',
        'async': false,
        'success': function(response, textStatus) {
          session = JSON.parse(response);
        }
      });
      return session;
    },

    checkLogin: function(session) {
      if (session.user_id == undefined) {
        this.navigate('', true);
        return false;
      }
      return true;
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
