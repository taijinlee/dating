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
    },

    render: function() {
      $(this.el).html(_.template(imageUploaderTemplate));
      return this;
    },

    formSubmit: function() {
      var self = this;
      $('form#uploader').ajaxSubmit({
        success: function(response) {
          self.vent.trigger('image_uploaded', [JSON.parse(response)]);
        }
      });
    },

    triggerUploaderClick: function() {
      $('#image').click();
      return false;
    }

  });

  return imageUploaderView;

});
