
define([
  'views/lib/heightSelector',
  'views/lib/weightInput',
  'views/lib/maritalSelector',
  'text!/templates/profile/userStats.html'
], function(heightSelectorView, weightInputView, maritalStatusSelectorView, userStatsTemplate) {

  var userStatsView = Backbone.View.extend({

    tagName: 'form',
    className: 'profileBasics five columns nice',

    events: {
      'click a.edit': 'editRender',
      'click a.cancel': 'cancel',
      'click a.save': 'save'
    },

    initialize: function() {
    },

    render: function(user) {
      this.user = user;
      $(this.el).html(_.template(userStatsTemplate, user.toJSON()));
      return this;
    },

    editRender: function(userJSON) {
      var weightText = new weightInputView({ 'weight': this.user.get('weight') });
      $('dd.weight').replaceWith(weightText.render().el);

      var userHeightSelector = new heightSelectorView({ 'height': this.user.get('height') });
      $('dd.height').replaceWith(userHeightSelector.render().el);

      var martialStatusSelector = new maritalStatusSelectorView({ 'marital_status': this.user.get('marital_status') });
      $('dd.marital_status').replaceWith(martialStatusSelector.render().el);

      $(this.el).append(this.make('a', { 'class': 'save nice small radius blue button'}, 'Save'));
      $(this.el).append(this.make('a', { 'class': 'cancel nice small radius white button'}, 'Cancel'));
      $('form.profileBasics header aside a.edit').attr('hidden', 'true');
      return false;
    },

    cancel: function() {
      this.render(this.user);
      return false;
    },

    save: function() {
      var inputs = {};

      _.each($('form').serializeArray(), function(input) {
        inputs[input.name] = input.value;
      });

      inputs['height'] = parseInt(inputs['height_feet'], 10) * 12 + parseInt(inputs['height_inches'], 10);
      delete inputs['height_feet'];
      delete inputs['height_inches'];

      this.user.set(inputs);
      this.user.save();
      this.cancel();
      return false;
    }

  });


  return userStatsView;

});
