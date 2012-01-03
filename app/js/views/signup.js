
define([
  'models/user',
  'text!/templates/signup.html'
], function(userModel, signupTemplate) {

  var signupView = Backbone.View.extend({
    el: $('#content'),

    events: {
      'click a#signup_button': 'signup'
    },

    initialize: function(options) {
      this.session = options.session;
      this.vent = options.vent;
    },

    render: function() {
      if (this.is_logged_in) {
        Backbone.history.navigate('/users', true);
        return;
      }

      $(this.el).html(_.template(signupTemplate));
    },

    signup: function() {
      var values = {};
      $('form.signup :input').each(function() {
        values[this.name] = $(this).val();
      });

      var user = new userModel();
      user.save(values);
      this.vent.trigger('renderNotification', 'An email has been sent to you', 'success');
    }

  });

  return signupView;

});