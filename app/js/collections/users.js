
define([
  'models/user',
  'collections/paginated'
], function(userModel, paginatedCollection) {

  var userCollection = paginatedCollection.extend({

    model: userModel,
    baseUrl: '/actions/users'

  });

  return userCollection;

});
