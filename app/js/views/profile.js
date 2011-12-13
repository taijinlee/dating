
define([
  'views/app',
  'models/userProfile',
  'text!/templates/profile.html'
], function(appView, userProfileModel, profileTemplate) {

  var profileView = appView.extend({
    el: $('#content'),

    template: _.template(profileTemplate),

    events: _.extend({
      'click button.update_profile': 'saveProfile'
    }, appView.prototype.events),

    render: function() {
      if (!this.checkLogin()) {
        Backbone.history.navigate('', true);
        return;
      }

      var session = {};
      $.ajax({
        'url': '/actions/session',
        'type': 'get',
        'async': false,
        'success': function(data) {
          session = JSON.parse(data);
        }
      });

      this.userProfile = new userProfileModel({ id: session.user_id });

      var self = this;
      this.userProfile.fetch({ success: function() {
        $(self.el).html(self.template(self.userProfile.toJSON()));
        self.renderDateSelector('birthday');
        self.renderHeightSelector();
      }});

    },

    renderDateSelector: function(name_prefix) {
      var month = $('<select name="' + name_prefix  + '_month"></select>');
      month.append($('<option value="">Month:</option>').attr('value',''));
      for (var i=1; i <= 12; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (this.userProfile.get('birthday_month') == i) {
          option.attr('selected', 'selected');
        }
        month.append(option);
      }

      var day = $('<select name="' + name_prefix + '_day"></select>');
      day.append($('<option value="">Day:</option>').attr('value',''));
      for (var i=1; i<=31; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (this.userProfile.get('birthday_day') == i) {
          option.attr('selected', 'selected');
        }
        day.append(option);
      }

      var currYear = new Date().getFullYear();
      var year = $('<select name="' + name_prefix + '_year"></select>');
      year.append($('<option value="">Year:</option>').attr('value',''));
      for (var i = currYear; i >= currYear - 100; i--) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (this.userProfile.get('birthday_year') == i) {
          option.attr('selected', 'selected');
        }

        year.append(option);
      }

      $('.dateSelector').append(month).append(day).append(year);
    },

    renderHeightSelector: function() {
      var feet = $('<select name="height_feet"></select>');
      feet.append($('<option value="">Feet:</option>').attr('value',''));
      for (var i=4; i <= 7; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (this.userProfile.get('height_feet') == i) {
          option.attr('selected', 'selected');
        }
        feet.append(option);
      }

      var inches = $('<select name="height_inches"></select>');
      inches.append($('<option value="">Inches:</option>').attr('value',''));
      for (var i=0; i <= 11; i++) {
        var option = $('<option>' + i +'</option>').attr('value', i);
        if (this.userProfile.get('height_inches') == i) {
          option.attr('selected', 'selected');
        }
        inches.append(option);
      }

      $('.heightSelector').append(feet).append(inches);
    },

    saveProfile: function() {

      var inputs = {};
      _.each($('#profile').serializeArray(), function(input) {
        inputs[input.name] = input.value;
      });
      alert('hi');
      this.userProfile.set(inputs);
      this.userProfile.save();
      //userProfile = new userProfileModel(inputs);
      // userProfile.save();

      return false;
    }

  });

  return profileView;

});
