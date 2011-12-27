
define([
  'models/user',
  'collections/images'
], function(userModel, imagesCollection) {

  var userPicturesView = Backbone.View.extend({

    tagName: 'ul',

    events: {
      'click a.delete': 'deleteImage',
      'click a.makeProfilePhoto': 'chooseProfileImage'
    },


    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

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
      var profile_photo = this.make('a', { 'href': '#', 'class': 'makeProfilePhoto', 'id': 'imageprofile_' + imageModel.get('id')}, 'Make profile picture');
      var delete_photo = this.make('a', { 'href': '#', 'class': 'delete', 'id': 'image_' +imageModel.get('id') }, 'x');

      var li = this.make('li', { 'class': 'picture', 'id': 'image_container_' + imageModel.get('id') });
      $(li).append(img).append(profile_photo).append(delete_photo);
      $(this.el).append(li);
    },

    deleteImage: function(event) {
      var image = this.collection.get($(event.target).attr('id').split('_')[1]);
      this.collection.remove(image);
      $('#image_container_' + image.get('id')).remove();
      image.destroy();
      return false;
    },

    chooseProfileImage: function(event) {
      this.user = new userModel({ id: this.session.user_id });
      this.user.set({ 'profile_image_id': $(event.target).attr('id').split('_')[1] });
      this.user.save();
      this.vent.trigger('profilePictureUpdated', { id: this.session.user_id });
      return false;
    }

  });

  return userPicturesView;

});
