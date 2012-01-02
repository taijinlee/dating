define([
  'text!/templates/message.html'

], function() {

  var messageView = Backbone.View.extend({

    tagName: 'aside',
    className: 'message',

    events: {
      'click a.message': 'message'
    }

    initialize: function(options) {
      this.options = options;
    },

    message: function(event) {
      var user_id = $(event.target).attr('id').split('_')[1];
      var message_text = "Hey what's up?";
      var message = new messageModel({ 'from_user_id': this.session.user_id, 'to_user_id': user_id, 'message': message_text });
      message.save();
      return false;
    }

  });

  return messageView;

});
