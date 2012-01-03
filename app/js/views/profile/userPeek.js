
define([
  'models/message',
  'text!/templates/profile/userPeek.html'
], function(messageModel, userPeekTemplate) {

  var userPeekView = Backbone.View.extend({

    tagName: 'section',
    className: 'userPeek',

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;
    },

    render: function(userJSON) {
      $(this.el).html(_.template(userPeekTemplate, userJSON));
      return this;
    }

  });

  return userPeekView;


});
