define([
  'models/image'
], function(imageModel) {

  var imagesCollection = Backbone.Collection.extend({

    model: imageModel,
    baseUrl: '/actions/image',

    initialize: function(attrs) {
      this.user_id = attrs.user_id;
    },

    url: function() {
      return this.baseUrl + '/user/' + this.user_id;
    }

  });

  return imagesCollection;

});
