define([
  'text!/templates/header.html',
  'text!/templates/header_loggedin.html',
  'text!/templates/header_login.html'
], function(headerTemplate, loggedInTemplate, loginTemplate) {

  var headerView = Backbone.View.extend({

    el: $('header#header'),

    events: {
      'click a.logout': 'logout',
      'click a#login_button': 'login'
    },

    render: function(options) {
      $(this.el).html(_.template(headerTemplate)).attr('id', 'header');

      if (options.user_id != undefined) {
        $(this.el).find('aside').html(_.template(loggedInTemplate, options));
      } else {
        $(this.el).find('aside').html(_.template(loginTemplate, options));
      }
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
    }



  });

  return headerView;

});
