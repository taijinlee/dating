
define([
  'views/app',
  'models/user',
  'text!/templates/signup.html',
  'text!/templates/login.html'
], function(appView, userModel, signupTemplate, loginTemplate) {

  var signupView = appView.extend({
    el: $('#content'),

    signupTemplate: _.template(signupTemplate),
    loginTemplate: _.template(loginTemplate),

    events: {
      'click button.signup': 'signup',
      'click button.login': 'login'
    },

    render: function() {
      appView.prototype.render.call(this);

      if (this.is_logged_in) {
        Backbone.history.navigate('/users', true);
        return;
      }

      $(this.el).html(this.signupTemplate());
      $(this.el).append(this.loginTemplate());
    },

    signup: function() {
      var values = {};
      $('#signup :input').each(function() {
        values[this.name] = $(this).val();
      });

      var user = new userModel();
      user.save(values);
    },

    login: function() {
      var values = {};
      $('#login :input').each(function() {
        values[this.name] = $(this).val();
      });

      var self = this;
      $.ajax({
        'url': '/actions/login',
        'type': 'post',
        'data': values,
        'success': function(response) {
          if (response == 'true') {
            Backbone.history.navigate('/users', true);
          } else {
            // do some error message
          }
        }
      });
    },


  });

  return signupView;

});