
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
      _.bindAll(this, 'previous', 'next', 'render');

      this.collection = new userCollection;
      this.collection.bind('fetched', this.renderPager, this);
      this.collection.bind('fetched', this.listUsers, this);
    },

    listUsers: function() {
      var users = $('#users');
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        $(users).append(view.render().el);
      });
    },

    render: function() {
      this.collection.fetch();
    }

  });

  return new usersListView;
});
