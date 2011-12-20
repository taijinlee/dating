
define([
  'views/profile/userPeek',
  'views/profile/userStats',
  'views/profile/userPictures',
  'models/user'
], function(userPeekView, userStatsView, userPicturesView, userModel) {

  var profileDetailsView = Backbone.View.extend({

    el: $('#content'),

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

      $(this.el).attr('class', 'row');

      this.userPeek = new userPeekView();
      this.userStats = new userStatsView();
      this.userPictures = new userPicturesView();

      this.user = new userModel();
      this.user.bind('change', this.renderUserDetails, this);
    },


    render: function(options) {
      this.user.set({ id: options.id }, { silent: true });
      $(this.el).empty();
      this.user.fetch();
    },

    renderUserDetails: function() {
      $(this.el).append(this.userPeek.render(this.user.toJSON()).el);
      $(this.el).append(this.userStats.render(this.user.toJSON()).el);
      // $(this.el).append(user.quip);
      $(this.el).append(this.userPictures.render(this.user.toJSON()).el);

      // var imageUploader = new imageUploaderView({ vent: this.vent, session: this.session });
      // $(this.el).append(imageUploader.render().el);
    }

  });


  return profileDetailsView;


});
