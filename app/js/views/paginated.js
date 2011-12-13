

define([
  'views/app',
  'text!/templates/paginated.html'
], function(appView, paginationTemplate) {

  var PaginatedView = appView.extend({
    paginateTemplate: _.template(paginationTemplate),

    events: _.extend({
      'click a.prev': 'previous',
      'click a.next': 'next',
    }, appView.prototype.events),

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