
define([
  'collections/users',
  'views/users/user',
  'text!/templates/paginated.html'
], function(userCollection, userView, paginateTemplate) {

  var usersView = Backbone.View.extend({

    tagName: 'section',

    events: {
      'click a.prev': 'previous',
      'click a.next': 'next',
    },

    initialize: function(options) {
      this.vent = options.vent;

      $(this.el).attr('class', 'nine columns');

      this.collection = new userCollection;
      this.collection.bind('fetched', this.render, this);
      this.vent.bind('refreshUserList', this.fetchUsers, this);

      this.vent.trigger('filterChanged');
    },

    fetchUsers: function(query_string) {
      this.collection.query_string = query_string;
      this.collection.resetPages();
      this.collection.fetch();
    },

    render: function() {
      $(this.el).empty();
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        $(this.el).append(view.render().el);
      }, this);

      var pagination = $('<aside></aside>');
      pagination.html(_.template(paginateTemplate, this.collection.pageInfo()));
      $(this.el).append(pagination);
      return this;
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

  return usersView;
});
