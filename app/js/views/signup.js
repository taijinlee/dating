
define([
  'views/app',
  'models/user',
  'text!/templates/signup.html',
  'text!/templates/login.html'
], function(appView, userModel, signupTemplate, loginTemplate) {

  var signupView = appView.extend({
    el: $('#content'),

    template_signup: _.template(signupTemplate),
    template_login: _.template(loginTemplate),

    events: {
      'click button.signup': 'signup',
      'click button.login': 'login'
    },

    initialize: function() {

    },

    render: function() {
      if (this.checkLogin()) {
        Backbone.history.navigate('/users', true);
        return;
      }
      $(this.el).html(this.template_signup());
      $(this.el).append(this.template_login());
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
        'success': function() {
          self.loggedIn();
        }
      });
    },

    loggedIn: function() {
      $(this.el).empty();
      $(this.el).append($('<div></div>').attr('id', 'logout'));
      $(this.el).append($('<div></div>').attr('id', 'filters'));
      $(this.el).append($('<div></div>').attr('id', 'users'));
      $(this.el).append($('<div></div>').attr('id', 'pager'));

      Backbone.history.navigate('/users', true);

    }

  });

  return signupView;

});