
define([

], function() {
  var userProfileModel = Backbone.Model.extend({
    urlRoot: '/actions/userprofile',

    defaults: {
      gender: '',
      weight: '',
      marital_status: ''
    },

    validate: function() {
    }


  });

  return userProfileModel;

});
