
define([
  'views/app',
  'views/signup',
  'views/users/browse',
  'views/profile/edit',
  'views/confirmUser'
], function(appView, signupView, usersBrowseView, profileEditView, confirmUserView) {

  var views = {
    'signupView': signupView,
    'usersBrowseView': usersBrowseView,
    'profileEditView': profileEditView,
    'confirmUserView': confirmUserView
  };

  var AppRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.vent = options.vent;
      this.appView = new appView({ vent: this.vent });

      var self = this;
      var viewClosures = function() {
        var views_cache = {};

        var renderView = function(viewName, login_required) {
          if (login_required == undefined) {
            true;
          }

          var session = self.getSession();
          if (login_required && !self.checkLogin(session)) {
            return;
          }

          if (typeof views_cache[viewName] === 'undefined') {
            views_cache[viewName] = new views[viewName]({ 'vent': self.vent, 'session': session });
          }
          self.appView.render(session);
          views_cache[viewName].render();
        };
        return renderView;
      };

      this.renderView = viewClosures();

      Backbone.history.start();
    },

    routes: {
      '': 'signup',
      '/users': 'usersBrowse',
      '/profile': 'editProfile',
      '/confirmuser/:token/:time/:email': 'confirmUser',
      '*actions': 'defaultAction'
    },

    signup: function() {
      var session = this.getSession();
      if (session.user_id != undefined) {
        this.navigate('/users', true);
      } else {
        this.renderView('signupView', false);
      }
    },

    usersBrowse: function() {
      this.renderView('usersBrowseView');
    },

    editProfile: function() {
      this.renderView('profileEditView');
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
