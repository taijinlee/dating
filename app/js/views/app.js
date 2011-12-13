define([
], function(logoutTemplate) {

  var appView = Backbone.View.extend({

    events: {
      'click a.logout': 'logout',
      'click a.profile': 'gotoProfile'
    },

    /**
     * Render functions
     */

    /**
     * Routing functions
     */
    gotoProfile: function() {
      Backbone.history.navigate('/profile', true);
      return false;
    },


    /**
     * Application functions
     */
    checkLogin: function() {
      var is_logged_in = false;
      $.ajax({
        'url': '/actions/login',
        'type': 'get',
        'async': false,
        'success': function(logged_in, textStatus) {
          if (logged_in == 'false') {
            Backbone.history.navigate('', true);
          } else {
            is_logged_in = true;
          }
        }
      });
      return is_logged_in;
    },

    logout: function() {
      $.ajax({
        'url': '/actions/logout',
        'type': 'get',
        'success': function(logged_out) {
          Backbone.history.navigate('', true);
        }
      });
      return false;
    }

  });

  return appView;

});