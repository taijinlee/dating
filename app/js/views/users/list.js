
define([
  'views/paginated',
  'collections/users',
  'views/users/user',
  'text!/templates/users/user.html',
], function(paginatedView, userCollection, userView, userTemplate) {

  var usersListView = paginatedView.extend({
    el: $('#content'),

    template: _.template(userTemplate),

    initialize: function() {
      this.collection = new userCollection;
      this.collection.bind('fetched', this.renderPager, this);
      this.collection.bind('fetched', this.listUsers, this);
    },

    listUsers: function() {
      var users = $('#users');
      users.empty();
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        $(users).append(view.render().el);
      });
    },

    render: function() {
      if (this.checkLogin()) {
        this.collection.fetch();
      }
    }

  });

  return usersListView;
});
