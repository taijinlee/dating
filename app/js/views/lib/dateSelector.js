define([

], function() {

  var dateSelector = Backbone.View.extend({

    tagName: 'span',
    className: 'dateSelector',

    initialize: function(options) {
      this.name_prefix = options.name_prefix;
      this.default_date = options.default_date.split('-');
    },

    render: function() {
      $(this.el).append(this.createSelect('month', this.default_date[1]));
      $(this.el).append(this.createSelect('day', this.default_date[2]));
      $(this.el).append(this.createSelect('year', this.default_date[0]));

      return this;
    },

    createSelect: function(type, selected_value) {
      var name = this.name_prefix + '_' + type;
      var option_display = type.charAt(0).toUpperCase() + type.slice(1) + ':';

      var select = $('<select name="' + name + '"></select>').attr('class', 'tiny');
      select.append($('<option value="">' + option_display + '</option>').attr('value', ''));

      var lower_bound = 1, upper_bound = 12;
      if (type == 'day') {
        upper_bound = 31;
      } else if (type == 'year') {
        upper_bound = new Date().getFullYear();
        lower_bound = upper_bound - 100;
      }

      if (type != 'year') {
        for (var i = lower_bound; i <= upper_bound; i++) {
          var option = $('<option>' + i +'</option>').attr('value', ((i < 10) ? '0' : '') + i);
          if (selected_value == i) {
            option.attr('selected', 'selected');
          }
          select.append(option);
        }
      } else {
        for (var i = upper_bound; i >= lower_bound; i--) {
          var option = $('<option>' + i +'</option>').attr('value', ((i < 10) ? '0' : '') + i);
          if (selected_value == i) {
            option.attr('selected', 'selected');
          }
          select.append(option);
        }
      }


      return select;
    }



  });

  return dateSelector;
});

