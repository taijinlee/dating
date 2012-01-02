
define([
  'views/users/filters',
  'views/users/users'
], function(filtersView, usersView) {

  var usersBrowseView = Backbone.View.extend({

    el: $('#content'),

    initialize: function(options) {
      this.vent = options.vent;
    },

    render: function() {
      $(this.el).empty();

      var filters = new filtersView({ vent: this.vent });
      var users = new usersView({ vent: this.vent });

      $(this.el).append(filters.render().el);
      $(this.el).append(users.render().el);
    }

  });

  return usersBrowseView;
});
