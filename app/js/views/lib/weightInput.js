define([

], function() {

  var weightInput = Backbone.View.extend({

    tagName: 'span',

    initialize: function(options) {
      this.weight = options.weight;

      $(this.el).html(' lbs');
      $(this.el).prepend(this.make('input', { 'type': 'text', 'class': 'weightInput small', 'value': (this.weight > 0) ? this.weight : '', 'name': 'weight' }));
    },

    render: function() {
      return this;
    }


  });

  return weightInput;

});
