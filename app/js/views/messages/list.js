define([
  'views/messages/message',
  'collections/messages',
  'text!/templates/paginated.html'
], function(messageView, messagesCollection, paginateTemplate) {

  var messagesListView = Backbone.View.extend({

    el: $('#content'),

    events: {
      'click a.prev': 'previous',
      'click a.next': 'next',
    },

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

      this.collection = new messagesCollection();
      this.collection.bind('fetched', this.render, this);
      this.collection.fetch();
    },

    render: function() {
      alert('hi');
      $(this.el).empty();
      this.collection.each(function(message) {
        var view = new messageView({ model: message });
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

  return messagesListView;

});