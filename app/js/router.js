
define([
  'views/app',
  'views/signup',
  'views/users/browse',
  'views/profile/details',
  'views/settings/settings',
  'views/messages/list',
  'views/confirmUser'
], function(appView, signupView, usersBrowseView, profileDetailsView, settingsView, messagesView, confirmUserView) {

  var AppRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.vent = options.vent;
      this.appView = new appView({ vent: this.vent });

      var self = this;
      var viewClosure = function() {

        var checkLogin = function(session) {
          if (session.user_id == undefined) {
            self.navigate('', true);
            return false;
          }
          return true;
        }

        var renderView = function(viewName, login_required, render_args) {

          $('#content').unbind();
          self.vent.unbind();
          self.appView.bindNotifications();

          if (login_required == undefined) {
            login_required = true;
          }

          var session = self.getSession();
          if (login_required && !checkLogin(session)) {
            return;
          }

          self.appView.render(session);

          var view = new viewName({ 'vent': self.vent, 'session': session });
          view.render(render_args);
        };

        return renderView;
      };

      this.renderView = viewClosure();

      Backbone.history.start();
    },

    routes: {
      '': 'signup',
      '/users': 'usersBrowse',
      '/profile/:user_id': 'profileDetails',
      '/settings': 'settings',
      '/messages': 'messages',
      '/confirmuser/:token/:time/:email': 'confirmUser',
      '*actions': 'defaultAction'
    },

    signup: function() {
      var session = this.getSession();
      if (session.user_id != undefined) {
        this.navigate('/users', true);
      } else {
        this.renderView(signupView, false);
      }
    },

    usersBrowse: function() {
      this.renderView(usersBrowseView);
    },

    profileDetails: function(user_id) {
      this.renderView(profileDetailsView, true, { id: user_id });
    },

    settings: function() {
      this.renderView(settingsView);
    },

    messages: function() {
      this.renderView(messagesView);
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
    }

  });

  return AppRouter;

});
