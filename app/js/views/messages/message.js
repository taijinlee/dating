define([
  'models/message',
  'text!/templates/messages/message.html'
], function(messageModel, messageTemplate) {

  var messageView = Backbone.View.extend({

    tagName: 'li',
    className: 'message',

    render: function() {
      $(this.el).html(_.template(messageTemplate, this.model.toJSON()));
      return this;
    }

  });

  return messageView;



});
