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
      this.header.render({ user_id: session.user_id });

      this.notifications.render();

      this.footer.render();
    },

    /**
     * Rebind notification triggers
     */
    bindNotifications: function() {
      this.notifications.bind();
    }

  });

  return appView;

});
