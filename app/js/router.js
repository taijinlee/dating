
define([
  'views/signup',
  'views/users/browse',
  'views/profile/edit',
  'views/confirmUser'
], function(signupView, usersBrowseView, profileEditView, confirmUserView) {

  var AppRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.vent = options.vent;
      Backbone.history.start();
    },

    routes: {
      '': 'landingPage',
      '/users': 'usersBrowse',
      '/profile': 'editProfile',
      '/confirmuser/:token/:time/:email': 'confirmUser',
      '*actions': 'defaultAction'
    },

    landingPage: function() {
      var session = this.getSession();
      if (session.user_id != undefined) {
        this.navigate('/users', true);
      } else {
        var view = new signupView({ 'vent': this.vent, 'session': session });
        view.render();
      }
    },

    usersBrowse: function() {
      var session = this.getSession();
      if (!this.checkLogin(session)) {
        return;
      }
      var view = new usersBrowseView({ 'vent': this.vent, 'session': session });
      view.render();
    },

    editProfile: function() {
      var session = this.getSession();
      if (!this.checkLogin(session)) {
        return;
      }
      var view = new profileEditView({ 'vent': this.vent, 'session': session });
      view.render();
    },

    confirmUser: function(token, time, email) {
      var session = this.getSession();
      var view = new confirmUserView({ 'vent': this.vent, 'session': session, 'token': token, 'time': time, 'email': email });
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

  return AppRouter;

});
