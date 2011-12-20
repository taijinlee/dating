
define([
  'collections/images'
//  'text!/templates/profile/userPictures.html'
], function(imagesCollection, userPicturesTemplate) {

  var userPicturesView = Backbone.View.extend({

    tagName: 'ul',

    initialize: function(options) {
      //this.vent = options.vent;
      this.collection = new imagesCollection();
      this.collection.bind('reset', this.showImages, this);
    },

    render: function(user) {
      this.collection.user_id = user.id;
      this.collection.fetch();
      return this;
    },

    showImages: function() {
      var self = this;
      this.collection.each(function(imageModel) {
        self.showImage(imageModel);
      });
    },

    showImage: function(imageModel) {
      var li = this.make('li', {}, this.make('img', { src: '/actions/image/' + imageModel.get('id') }));
      $(this.el).append(li);
    }

  });

  return userPicturesView;

});
