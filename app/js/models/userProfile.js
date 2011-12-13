
define([

], function() {
  var userProfileModel = Backbone.Model.extend({
    urlRoot: '/actions/userprofile',

    validate: function() {
    }


  });

  return userProfileModel;

});
