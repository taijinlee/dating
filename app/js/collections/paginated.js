// includes bindings for fetching/fetched

define([

], function() {

  var PaginatedCollection = Backbone.Collection.extend({
    initialize: function() {
      _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
      typeof(options) != 'undefined' || (options = {});
      this.page = 1;
      typeof(this.perPage) != 'undefined' || (this.perPage = 10);
    },

    fetch: function(options) {
      typeof(options) != 'undefined' || (options = {});
      this.trigger("fetching");
      var self = this;
      var success = options.success;
      options.success = function(resp) {
        self.trigger("fetched");
        if(success) { success(self, resp); }
      };
      return Backbone.Collection.prototype.fetch.call(this, options);
    },

    parse: function(resp) {
      this.page = parseInt(resp.page);
      this.perPage = parseInt(resp.perPage);
      this.total = parseInt(resp.total);
      this.pages = Math.ceil(this.total / this.perPage);

      return resp.models;
    },

    url: function() {
      return [this.baseUrl, this.page, this.perPage].join('/');
    },

    pageInfo: function() {
      var pageMax = Math.min(this.total, this.page * this.perPage);
      var pageMin = (this.page - 1) * this.perPage + 1;

      var info = {
        total: this.total,
        page: this.page,
        perPage: this.perPage,
        pages: this.pages,
        prev: (this.page > 1) ? this.page - 1 : false,
        next: (this.page < this.pages) ? this.page + 1: false,
        range: [pageMin, pageMax]
      };

      return info;
    },

    nextPage: function() {
      if (!this.pageInfo().next) {
        return false;
      }
      this.page += 1;
      return this.fetch();
    },

    previousPage: function() {
      if (!this.pageInfo().prev) {
        return false;
      }
      this.page -= 1;
      return this.fetch();
    }

  });

  return PaginatedCollection;

});
