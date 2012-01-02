
define([
  'collections/users',
  'views/users/user',
  'text!/templates/paginated.html'
], function(userCollection, userView, paginateTemplate) {

  var usersView = Backbone.View.extend({

    tagName: 'section',
    className: 'twelve columns',

    events: {
      'click a.prev': 'previous',
      'click a.next': 'next',
    },

    initialize: function(options) {
      this.vent = options.vent;

      this.collection = new userCollection;
      this.collection.bind('fetched', this.renderUsers, this);
      this.vent.bind('refreshUserList', this.fetchUsers, this);
    },

    fetchUsers: function(query_string) {
      this.collection.query_string = query_string;
      this.collection.resetPages();
      this.collection.fetch();
    },

    render: function() {
      this.vent.trigger('filterChanged');
      return this;
    },

    renderUsers: function() {
      $(this.el).empty();
      this.collection.each(function(user) {
        var view = new userView({ model: user });
        $(this.el).append(view.render().el);
      }, this);

      var pagination = this.make('aside', {}, _.template(paginateTemplate, this.collection.pageInfo()));
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
