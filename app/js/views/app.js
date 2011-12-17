define([
  'views/header',
  'views/notifications',
  'views/footer'
], function(headerView, notificationsView, footerView) {

  var appView = Backbone.View.extend({

    el: $('div#container'),

    initialize: function(options) {
      this.session = options.session;
      this.vent = options.vent;
    },

    /**
     * Render functions
     */
    render: function() {
      var is_logged_in = (this.session.user_id != undefined);
      var header = new headerView({ 'is_logged_in': is_logged_in });
      header.render();

      var notifications = new notificationsView({ vent: this.vent });
      notifications.render();

      var footer = new footerView();
      footer.render();
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
