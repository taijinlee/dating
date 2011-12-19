
define([
  'views/users/filters',
  'views/users/users'
], function(filtersView, usersView) {

  var usersBrowseView = Backbone.View.extend({

    el: $('#content'),

    initialize: function(options) {
      this.vent = options.vent;

      this.filters = new filtersView({ vent: this.vent });
      this.users = new usersView({ vent: this.vent });

      $(this.el).attr('class', 'row');
    },

    render: function() {
      $(this.el).empty();
      $(this.el).append(this.filters.render().el);
      $(this.el).append(this.users.render().el);
    }

  });

  return usersBrowseView;
});
