
define([
  'models/filter',
  'text!/templates/filters/range.html',
  'text!/templates/filters/checkbox.html',
  'libs/jquery/jquery-ui'
], function(filterModel, rangeTemplate, checkboxTemplate) {

  var filterView = Backbone.View.extend({

    tagName: 'li',

    events: {
      'click input': 'setCheckboxModel'
    },

    initialize: function(options) {
      this.vent = options.vent;
    },

    render: function() {
      var template;
      if (this.model.get('type') == 'range') {
        // var range = this.model.get('options'); options.upper, options.lower
        template = _.template(rangeTemplate, this.model.toJSON());
        $(this.el).html(template);
        this.attachSliderJS();
      } else if(this.model.get('type') == 'checkbox') {
        // var checkbox_names = this.model.get('options');
        template = _.template(checkboxTemplate, this.model.toJSON());
        $(this.el).html(template);
      }
      return this;
    },

    attachSliderJS: function() {
      var sliderEl = $(this.el).find('#' + this.model.get('name') + '_slider');
      var textEl = $(this.el).find('#' + this.model.get('name') + '_text');
      var options = this.model.get('options');

      var self = this;
      sliderEl.slider({
        range: true,
        min: options.lower,
        max: options.upper,
        values: [ options.lower, options.upper ],
        slide: function(event, ui) {
          if (self.model.get('name') == 'height') {
            textEl.html(Math.floor(ui.values[0]/12) + "'" + (ui.values[0]%12)  + '" - ' + Math.floor(ui.values[1]/12) + "'" + (ui.values[1]%12)  + '"');
          } else {
            textEl.html(ui.values[0] + " - " + ui.values[1]);
          }
        },
        change: function(event, ui) {
          self.model.set({ 'range': { lower: ui.values[0], upper: ui.values[1] }});
          self.vent.trigger('filterChanged');
        }
      });

      if (this.model.get('name') == 'height') {
        textEl.html(Math.floor(sliderEl.slider("values", 0)/12) + "'" + (sliderEl.slider("values", 0)%12)  + '" - ' + Math.floor(sliderEl.slider("values", 1)/12) + "'" + (sliderEl.slider("values", 1)%12)  + '"');
      } else {
        textEl.html(sliderEl.slider("values", 0) + ' - ' + sliderEl.slider("values", 1));
      }
    },

    setCheckboxModel: function(clickedEvent) {
      var clickedInput = $(clickedEvent.target);
      var checked = this.model.get('checked');
      checked[clickedInput.attr('value')] = clickedInput.attr('checked') == undefined ? 0 : 1;

      this.model.set({ 'checked': checked });
      this.vent.trigger('filterChanged');
    }

  });

  return filterView;

});
