define([

], function() {

  var heightSelector = Backbone.View.extend({

    tagName: 'span',

    initialize: function(options) {
      $(this.el).attr('class', 'heightSelector');
      this.height = options.height;
    },

    render: function() {
      $(this.el).append(this.createSelect('feet', 'height', 4, 7, Math.floor(this.height / 12)));
      $(this.el).append(this.createSelect('inches', 'height', 0, 11, (this.height > 0 ? this.height % 12 : 'none')));
      return this;
    },

    createSelect: function(type, name_prefix, lower_bound, upper_bound, selected_value) {
      var name = name_prefix + '_' + type;
      var option_display = type.charAt(0).toUpperCase() + type.slice(1) + ':';

      var select = $('<select name="' + name + '"></select>').attr('class', 'tiny');
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
