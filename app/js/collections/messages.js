
define([
  'models/message',
  'collections/paginated'
], function(messageModel, paginatedCollection) {

  var messageCollection = paginatedCollection.extend({

    model: messageModel,
    baseUrl: '/actions/messages'

  });

  return messageCollection;

});
