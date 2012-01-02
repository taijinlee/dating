
define([
  'views/profile/userPeek',
  'views/profile/userStats',
  'views/profile/userPictures',
  'models/user'
], function(userPeekView, userStatsView, userPicturesView, userModel) {

  var profileDetailsView = Backbone.View.extend({

    el: $('#content'),
    className: 'row',

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;
      this.options = options;

      this.user = new userModel();
      this.options.user = this.user;

      this.vent.bind('userProfileFetched', this.renderUserDetails, this);
      this.vent.bind('profilePictureUpdated', this.render, this);
    },

    render: function(options) {
      this.user.set({ id: options.id }, { silent: true });
      var self = this;
      this.user.fetch({
        success: function() { self.vent.trigger('userProfileFetched'); }
      });
    },

    renderUserDetails: function() {
      this.userPeek = new userPeekView(this.options);
      this.userStats = new userStatsView(this.options);
      this.userPictures = new userPicturesView(this.options);

      $(this.el).empty();
      $(this.el).append(this.userPeek.render(this.user.toJSON()).el);
      var row = $(this.make('section', { 'class': 'details' }));
      row.append(this.userStats.render(this.user).el);
      row.append(this.userPictures.render(this.user.toJSON()).el);
      $(this.el).append(row);
    }

  });


  return profileDetailsView;


});
