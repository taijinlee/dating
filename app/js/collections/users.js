
define([
  'models/user',
  'collections/paginated'
], function(userModel, paginatedCollection) {
  var userCollection = PaginatedCollection.extend({

    model: userModel,
    baseUrl: '/actions/users'

  });
  return userCollection;

});
