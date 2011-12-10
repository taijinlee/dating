

define([
  'text!/templates/paginated.html'
], function(paginationTemplate) {

  var PaginatedView = Backbone.View.extend({
    paginateTemplate: _.template(paginationTemplate),

    events: {
      'click a.prev': 'previous',
      'click a.next': 'next'
    },

    initialize: function() {
      _.bindAll(this, 'previous', 'next', 'renderPager');
    },

    renderPager: function() {
      $("#pager").html(this.paginateTemplate(this.collection.pageInfo()));
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

  return PaginatedView;

});