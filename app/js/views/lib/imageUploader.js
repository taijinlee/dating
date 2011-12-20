define([
  'libs/jquery/jquery.form',
  'collections/images',
  'text!/templates/imageUploader.html'
], function(jqueryForm, imagesCollection, imageUploaderTemplate) {

  var imageUploaderView = Backbone.View.extend({

    tagName: 'section',

    events: {
      'change input#image': 'formSubmit',
      'click a#image_upload_button': 'triggerUploaderClick',
    },


   initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

      $(this.el).attr('id', 'images').attr('class', 'eight columns');

      this.collection = new imagesCollection({ 'user_id': this.session.user_id });
      this.collection.bind('reset', this.showImages, this);
      this.collection.bind('add', this.showImage, this);

      this.collection.fetch();
    },

    render: function() {
      $(this.el).html(_.template(imageUploaderTemplate));
      return this;
    },

    formSubmit: function() {
      var self = this;
      $('form#uploader').ajaxSubmit({
        success: function(response) {
          self.collection.add([JSON.parse(response)]);
        }
      });
    },

    showImages: function() {
      var self = this;
      this.collection.each(function(imageModel) {
        self.showImage(imageModel);
      });
    },

    showImage: function(imageModel) {
      var img = $('<img/>').attr({ src: '/actions/image/' + imageModel.get('id') });
      $(this.el).append(img);
    },

    triggerUploaderClick: function() {
      $('#image').click();
      return false;
    }

  });

  return imageUploaderView;

});
