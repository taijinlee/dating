
define([
  'views/profile/userPeek',
  'views/profile/userStats',
  'views/profile/userPictures',
  'views/lib/imageUploader',
  'models/user'
], function(userPeekView, userStatsView, userPicturesView, imageUploaderView, userModel) {

  var profileDetailsView = Backbone.View.extend({

    el: $('#content'),

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

      $(this.el).attr('class', 'row');

      this.userPeek = new userPeekView(options);
      this.userStats = new userStatsView(options);
      this.userPictures = new userPicturesView(options);
      this.imageUploader = new imageUploaderView(options);

      this.user = new userModel();
      // this.user.bind('change', this.renderUserDetails, this);
    },


    render: function(options) {
      this.user.set({ id: options.id }, { silent: true });
      var self = this;
      this.user.fetch({
        success: function() { self.renderUserDetails(); }
      });
    },

    renderUserDetails: function() {
      $(this.el).empty();
      $(this.el).append(this.userPeek.render(this.user.toJSON()).el);
      var row = $(this.make('div', { 'class': 'row' }));
      row.append(this.userStats.render(this.user).el);
      row.append(this.userPictures.render(this.user.toJSON()).el);
      $(this.el).append(row);

      $(this.el).append(this.imageUploader.render().el);
    }

  });


  return profileDetailsView;


});
