
define([
  'collections/images'
//  'text!/templates/profile/userPictures.html'
], function(imagesCollection, userPicturesTemplate) {

  var userPicturesView = Backbone.View.extend({

    tagName: 'ul',

    events: {
      'click a.delete': 'deleteImage'
    },


    initialize: function(options) {
      this.vent = options.vent;

      $(this.el).attr('class', 'userPictures eight columns');

      this.vent.bind('image_uploaded', this.addImage, this);
      this.collection = new imagesCollection();
      this.collection.bind('reset', this.showImages, this);
      this.collection.bind('add', this.showImages, this);
    },

    render: function(user) {
      this.collection.user_id = user.id;
      this.collection.fetch();
      return this;
    },

    addImage: function(imageJSON) {
      this.collection.add(imageJSON);
    },

    showImages: function() {
      $(this.el).empty();
      var self = this;
      this.collection.each(function(imageModel) {
        self.showImage(imageModel);
      });
    },

    showImage: function(imageModel) {
      var img = this.make('img', { 'src': '/actions/image/' + imageModel.get('id') });
      var profile_photo = this.make('a', { 'href': '#', 'class': 'makeProfilePhoto' }, 'Make profile picture');
      var delete_photo = this.make('a', { 'href': '#', 'class': 'delete', 'id': 'image_' +imageModel.get('id') }, 'x');

      var li = this.make('li', { 'class': 'picture', 'id': 'image_container_' + imageModel.get('id') });
      $(li).append(img).append(profile_photo).append(delete_photo);
      $(this.el).append(li);
    },

    deleteImage: function(event, something) {
      var image = this.collection.get($(event.target).attr('id').split('_')[1]);
      this.collection.remove(image);
      $('#image_container_' + image.get('id')).remove();
      image.destroy();
      return false;
    }

  });

  return userPicturesView;

});
