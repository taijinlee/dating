
define([
  'views/app',
  'views/users/filters',
  'views/users/users'
], function(appView, filtersView, usersView) {

  var usersBrowseView = appView.extend({

    el: $('#content'),

    initialize: function(options) {
      appView.prototype.initialize.call(this, options);
      $(this.el).attr('class', 'row');

      this.filters = new filtersView({ vent: this.vent });
      this.users = new usersView({ vent: this.vent });


    },

    render: function() {
      appView.prototype.render.call(this);

      $(this.el).empty();
      $(this.el).append(this.filters.render().el);
      $(this.el).append(this.users.render().el);
    }

  });

  return usersBrowseView;
});
