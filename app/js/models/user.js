define([], function() {
  var userModel = Backbone.Model.extend({
    urlRoot: '/actions/users',

    defaults: {
      email: '',
      handle: ''
    },

  });

  return userModel;

});
