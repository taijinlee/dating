define([], function() {
  var userModel = Backbone.Model.extend({
    urlRoot: '/actions/users',

    defaults: {
      email: '',
      handle: ''
    },

      parse: function(resp) {
          console.log('hi');
          console.log(resp);
      }
  });

  return userModel;

});
