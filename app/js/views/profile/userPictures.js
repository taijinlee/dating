define([
  'views/profile/userPicturesList',
  'views/lib/imageUploader'

], function(userPicturesListView, imageUploaderView) {

  var userPicturesView = Backbone.View.extend({

    tagName: 'section',
    className: 'userPictures eleven columns',

    initialize: function(options) {
      this.options = options;
      this.vent = options.vent;
      this.session = options.session;
    },

    render: function() {
      var picturesList = new userPicturesListView(this.options);

      $(this.el).empty();
      $(this.el).append(this.make('h2', {}, 'Photos'));

      if (this.options.session.user_id == this.options.user.id) {
        var imageUploader = new imageUploaderView(this.options);
        $(this.el).append(imageUploader.render().el);
      }

      $(this.el).append(picturesList.render().el);
      return this;
    }

  });

  return userPicturesView;

});
