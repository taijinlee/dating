
define([
  'views/app',
  'views/users/filters',
  'views/users/users'
], function(appView, filtersView, usersView) {

  var usersBrowseView = appView.extend({

    el: $('#content'),

    render: function() {
      appView.prototype.render.call(this);

      var filters = new filtersView({ vent: this.vent });
      var users = new usersView({ vent: this.vent });

      $(this.el).empty();
      $(this.el).append(filters.render().el);
      $(this.el).append(users.render().el);
    }

  });

  return usersBrowseView;
});
