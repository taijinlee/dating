define([

], function() {

  var heightSelector = Backbone.View.extend({

    tagName: 'span',

    initialize: function(selected_values) {
      this.selected_values = selected_values;
    },

    render: function() {
      $(this.el).append(this.createSelect('feet', 'height', 4, 7, this.selected_values.feet));
      $(this.el).append(this.createSelect('inches', 'height', 0, 11, this.selected_values.inches));
      return this;
    },

    createSelect: function(type, name_prefix, lower_bound, upper_bound, selected_value) {
      var name = name_prefix + '_' + type;
      var option_display = type.charAt(0).toUpperCase() + type.slice(1) + ':';

      var select = $('<select name="' + name + '"></select>');
      select.append($('<option>' + option_display + '</option>').attr('value', ''));
      for (var i = lower_bound; i <= upper_bound; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (selected_value == i) {
          option.attr('selected', 'selected');
        }
        select.append(option);
      }
      return select;
    }

  });

  return heightSelector;

});
