
define([
  'views/app',
  'collections/users',
  'views/users/user',
  'text!/templates/paginated.html'
], function(appView, userCollection, userView, paginateTemplate) {

  var usersListView = appView.extend({

    el: $('#content'),

    events: {
      'click a.prev': 'previous',
      'click a.next': 'next',
    },

    initialize: function(attr) {
      appView.prototype.initialize(attr);
      this.collection = new userCollection;
      this.collection.bind('fetched', this.listUsers, this);
    },

    render: function() {
      appView.prototype.render.call(this);
      this.collection.fetch();
    },

    listUsers: function() {
      var users = $('<section></section>');
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        users.append(view.render().el);
      });

      var pagination = $('<aside></aside>');
      pagination.html(_.template(paginateTemplate, this.collection.pageInfo()));
      users.append(pagination);

      $(this.el).html(users);
    },

    previous: function() {
      this.collection.previousPage();
      return false;
    },

    next: function() {
      this.collection.nextPage();
      return false;
    }


  });

  return usersListView;
});
