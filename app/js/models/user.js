define([

], function() {
  var userModel = Backbone.Model.extend({
    urlRoot: '/actions/users',

    validate: function() {
    }

  });

  return userModel;

});
