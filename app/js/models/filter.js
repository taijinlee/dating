define([], function() {
  var filterModel = Backbone.Model.extend({
    defaults: {
      email: '',
      handle: ''
    }
  });

  return filterModel;

});
