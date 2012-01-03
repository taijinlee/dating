define([
  'text!/templates/notifications.html',
], function(notificationsTemplate) {

  var notificationsView = Backbone.View.extend({
    tagName: 'div',

    events: {
      'click a.alert_close': 'closeNotification'
    },

    initialize: function(options) {
      this.vent = options.vent;
    },

    bind: function() {
      this.vent.bind('renderNotification', this.renderNotification, this);
      // this.vent.bind('navigated', this.closeNotification, this);
    },

    renderNotification: function(message, alert_type) {
      $(this.el).attr('class', 'eight columns offset-by-four alert-box ' + alert_type);

      $(this.el).html(_.template(notificationsTemplate, {'message': message}));
      $('section#notifications').append($(this.el));
      this.delegateEvents();
    },

    closeNotification: function() {
      $('section#notifications').empty();
      return false;
    }

  });

  return notificationsView;

});
