
define([
  'views/users/filter',
  'collections/filters'  
], function(filterView, filtersCollection) {

  var filtersView = Backbone.View.extend({

    tagName: 'ul',
    className: 'four columns',

    initialize: function(options) {
      this.vent = options.vent;

      this.collection = new filtersCollection([
        { name: 'age', type: 'range', options: { lower: 18, upper: 100 }},
        { name: 'height', type: 'range', options: { lower: 48, upper: 95 }},
        { name: 'weight', type: 'range', options: { lower: 0, upper: 300 }},
        // { name: 'smoker', type: 'checkbox', options: {'1': 'Smoker OK' }},
        { name: 'ethnicity', type: 'checkbox', options: {'declined': 'Declined to Answer', 'asian': 'Asian', 'black': 'Black', 'latino': 'Latino', 'middle_eastern': 'Middle Eastern', 'mixed': 'Mixed', 'native_american': 'Native American', 'south_asian': 'South Asian', 'white': 'White', 'other': 'Other'}}
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
        query_string.push(filter.getQueryPart());
      });
      this.vent.trigger('refreshUserList', query_string.join('&'));      
    }

  });

  return filtersView;

});
