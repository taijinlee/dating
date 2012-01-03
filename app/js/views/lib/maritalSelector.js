define([

], function() {

  var maritalSelector = Backbone.View.extend({

    tagName: 'select',

    initialize: function(options) {

      $(this.el).attr({'name': 'marital_status', 'class': 'small' });

      var maritalOptions = {
        '': 'Marital Status:',
        'single': 'Single',
        'married': 'Married',
        'separated': 'Separated',
        'divorced': 'Divorced'
      };

      for (var name in maritalOptions) {
        var attr = { 'value': name }
        if (name == options.marital_status) {
          attr['selected'] = 'selected';
        }
        $(this.el).append(this.make('option', attr, maritalOptions[name]));
      }
    },

    render: function() {
      return this;
    }
    

  });

  return maritalSelector;

});
