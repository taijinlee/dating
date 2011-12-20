define([

], function() {
  var userModel = Backbone.Model.extend({
    urlRoot: '/actions/users',

    defaults: {
      gender: '',
      weight: '',
      marital_status: ''
    },

    validate: function() {
    }

  });

  return userModel;

});
