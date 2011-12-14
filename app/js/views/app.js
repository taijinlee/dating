define([
  'views/header',
  'views/footer'
], function(headerView, footerView) {

  var appView = Backbone.View.extend({

    el: $('div#container'),

    is_logged_in: false,

    /**
     * Render functions
     */
    render: function() {
      this.checkLogin();
      var header = new headerView({ is_logged_in: this.is_logged_in });
      header.render();

      var footer = new footerView();
      footer.render();
    },

    /**
     * Application functions
     */
    checkLogin: function() {
      this.is_logged_in = false;

      var self = this;
      $.ajax({
        'url': '/actions/login',
        'type': 'get',
        'async': false,
        'success': function(logged_in, textStatus) {
          if (logged_in == 'false') {
            self.navigate('', true);
          } else {
            self.is_logged_in = true;
          }
        }
      });
      return this.is_logged_in;
    },

    navigate: function(url) {
      Backbone.history.navigate(url, true);
    }

  });

  return appView;

});