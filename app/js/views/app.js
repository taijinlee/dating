define([
  'views/header',
  'views/notifications',
  'views/footer'
], function(headerView, notificationsView, footerView) {

  var appView = Backbone.View.extend({

    el: $('div#container'),

    initialize: function(options) {
      this.vent = options.vent;

      this.header = new headerView({ vent: this.vent });
      this.notifications = new notificationsView({ vent: this.vent });
      this.footer = new footerView({ vent: this.vent });
    },

    /**
     * Render functions
     */
    render: function(session) {
      this.header.is_logged_in = (session.user_id != undefined);
      this.header.render();

      this.notifications.render();

      this.footer.render();
    },

    /**
     * Application functions
     */
    navigate: function(url) {
      // this.vent.trigger('navigated');
      Backbone.history.navigate(url, true);
    }

  });

  return appView;

});
