
define([
  'models/message',
  'text!/templates/profile/userPeek.html'
], function(messageModel, userPeekTemplate) {

  var userPeekView = Backbone.View.extend({

    tagName: 'section',
    className: 'userPeek',

    events: {
      'click a.message': 'message'
    },

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;
    },

    render: function(userJSON) {
      $(this.el).html(_.template(userPeekTemplate, userJSON));
      return this;
    },

    message: function(event) {
      var user_id = $(event.target).attr('id').split('_')[1];
      console.log(user_id);
      var message_text = "Hey what's up?";
      var message = new messageModel({ 'from_user_id': this.session.user_id, 'to_user_id': user_id, 'message': message_text });
      message.save();
      return false;
    },

    updateProfilePicture: function() {

    }

  });

  return userPeekView;


});
