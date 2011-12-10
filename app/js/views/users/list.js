
define([
  'views/paginated',
  'collections/users',
  'views/users/user',
  'text!/templates/users/user.html',
], function(paginatedView, userCollection, userView, userTemplate) {

  var usersListView = paginatedView.extend({
    el: $('#content'),

    template: _.template(userTemplate),

    // template: _.template(userTemplate),

    initialize: function() {
      _.bindAll(this, 'previous', 'next', 'render');

      this.collection = new userCollection;
      this.collection.bind('add', this.addUser, this);
      this.collection.bind('fetched', this.renderPager, this);
      this.collection.bind('reset', this.listUsers, this);

      this.collection.fetch();
    },

    addUser: function(userModel) {
      var view = new userView({ model: userModel});
      this.el.append(view.render().el);
    },

    listUsers: function() {
      $("#users").html('');
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        $("#users").append(view.render().el);
      });
    }

  });

  return new usersListView;
});
