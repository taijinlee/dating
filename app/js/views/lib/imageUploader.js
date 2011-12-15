define([
  'libs/jquery/jquery.form',
  'collections/images',
  'text!/templates/imageUploader.html'
], function(jqueryForm, imagesCollection, imageUploaderTemplate) {

  var imageUploaderView = Backbone.View.extend({

    tagName: 'section',

    events: {
      'change input#uploader': 'formSubmit'
    },

    template: _.template(imageUploaderTemplate),

    initialize: function() {

      var session = {};
      $.ajax({
        'url': '/actions/session',
        'type': 'get',
        'async': false,
        'success': function(data) {
          session = JSON.parse(data);
        }
      });

      this.collection = new imagesCollection({ 'user_id': session.user_id });
      this.collection.bind('reset', this.showImages, this);
      this.collection.bind('add', this.showImage, this);

      this.collection.fetch();
    },

    render: function() {
      $(this.el).html(this.template());
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
    }

  });

  return imageUploaderView;

});

// exposing some global functionality for image uploader
var signal = function() {
  alert('hi');
};
