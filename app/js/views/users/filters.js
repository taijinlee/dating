
define([
  'views/users/filter',
  'collections/filters'  
], function(filterView, filtersCollection) {

  var filtersView = Backbone.View.extend({

    tagName: 'ul',

    initialize: function(options) {
      this.vent = options.vent;

      $(this.el).attr('class', 'three columns');
      this.collection = new filtersCollection([
        { name: 'age', type: 'range', options: { upper: 100, lower: 18 }},
        { name: 'marital_status', type: 'checkbox', options: ['single', 'married', 'separated', 'divorced'] }
      ]);

      this.vent.bind('filterChanged', this.refreshUsers, this);
    },

    render: function() {
      $(this.el).empty();
      this.collection.each(function(filter) {
        var view = new filterView({ model: filter, vent: this.vent });
        $(this.el).append(view.render().el);
      }, this);

      return this;
    },

    refreshUsers: function() {
      // get parameters, then trigger event
      var query_string = [];
      this.collection.each(function(filter) {
        var query_part = filter.getQueryPart();
        query_string.push(filter.getQueryPart());
      });
      this.vent.trigger('refreshUserList', query_string.join('&'));      
    }


  });

  return filtersView;

});
