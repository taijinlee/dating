define([

], function() {

  var ethnicitySelector = Backbone.View.extend({

    tagName: 'select',

    initialize: function(options) {

      $(this.el).attr({'name': 'ethnicity', 'class': 'small' });

      var ethnicityOptions = {
        'declined': 'Decline to answer',
        'asian': 'Asian',
        'black': 'Black',
        'latino': 'Latino',
        'middle_eastern': 'Middle Eastern',
        'mixed': 'Mixed',
        'native_american': 'Native American',
        'south_asian': 'South Asian',
        'white': 'White',
        'other': 'Other'
      };

      for (var name in ethnicityOptions) {
        var attr = { 'value': name }
        if (name == options.ethnicity) {
          attr['selected'] = 'selected';
        }
        $(this.el).append(this.make('option', attr, ethnicityOptions[name]));
      }
    },

    render: function() {
      return this;
    }
    

  });

  return ethnicitySelector;

});
