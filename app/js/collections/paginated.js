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
      this.page = parseInt(resp.page, 10);
      this.perPage = parseInt(resp.perPage, 10);
      this.total = parseInt(resp.total, 10);
      this.pages = Math.ceil(this.total / this.perPage);

      return resp.models;
    },

    url: function() {
      var url_builder = [this.baseUrl, this.page, this.perPage];
      if (this.query_string != undefined) {
        url_builder.push(this.query_string);
      }
      return url_builder.join('/');
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
    },

    resetPages: function() {
      this.page = 1;
    }

  });

  return PaginatedCollection;

});
