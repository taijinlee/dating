define([

], function() {

  var dateSelector = Backbone.View.extend({

    tagName: 'span',

    initialize: function(name_prefix, selected_values) {
      this.name_prefix = name_prefix;
      this.selected_values = selected_values;
    },

    render: function() {
      $(this.el).append(this.createSelect('month', this.name_prefix, this.selected_values.month));
      $(this.el).append(this.createSelect('day', this.name_prefix, this.selected_values.day));
      $(this.el).append(this.createSelect('year', this.name_prefix, this.selected_values.year));

      return this;
    },

    createSelect: function(type, name_prefix, selected_value) {
      var name = name_prefix + '_' + type;
      var option_display = type.charAt(0).toUpperCase() + type.slice(1) + ':';

      var select = $('<select name="' + name + '"></select>');
      select.append($('<option value="">' + option_display + '</option>').attr('value',''));

      var lower_bound = 1, upper_bound = 12;
      if (type == 'day') {
        upper_bound = 31;
      } else if (type == 'year') {
        upper_bound = new Date().getFullYear();
        lower_bound = upper_bound - 100;
      }

      for (var i = lower_bound; i <= upper_bound; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (selected_value == i) {
          option.attr('selected', 'selected');
        }
        if (type != 'year') {
          select.append(option);
        } else {
          select.prepend(option);
        }
      }

      return select;
    }



  });

  return dateSelector;
});

