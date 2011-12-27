define([

], function() {
  var messageModel = Backbone.Model.extend({
    urlRoot: '/actions/messages',

    validate: function() {
    }

  });

  return messageModel;

});
