define([
  'models/filter'

], function(filterModel) {

  var filtersCollection = Backbone.Collection.extend({

    model: filterModel

  });

  return filtersCollection;

});
