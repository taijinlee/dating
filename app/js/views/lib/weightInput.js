define([

], function() {

  var weightInput = Backbone.View.extend({

    tagName: 'span',

    initialize: function(options) {
      this.weight = options.weight;

      $(this.el).html(' lbs').attr('class', 'nice');
      $(this.el).prepend(this.make('input', { 'class': 'weightInput nice small input-text', 'value': (this.weight > 0) ? this.weight : '', 'name': 'weight' }));
    },

    render: function() {
      return this;
    }


  });

  return weightInput;

});
