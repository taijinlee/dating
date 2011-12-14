define([
  'text!/templates/header.html',
  'text!/templates/header_loggedin.html'
], function(headerTemplate, loggedInTemplate) {

  var headerView = Backbone.View.extend({

    el: $('header#header'),
    tagName: 'header',

    events: {
      'click a.logout': 'logout'
    },

    initialize: function(attributes) {
      this.is_logged_in = attributes.is_logged_in;
    },

    render: function() {
      $(this.el).html(_.template(headerTemplate)).attr('id', 'header');

      if (this.is_logged_in) {
        $(this.el).find('aside').html(_.template(loggedInTemplate));
      } else {
        $(this.el).find('aside').empty();
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
    }


  });

  return headerView;

});
