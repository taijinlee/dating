
define([
  'views/lib/dateSelector',
  'views/lib/heightSelector',
  'views/lib/imageUploader',
  'models/user',
  'text!/templates/profile/edit.html'
], function(dateSelectorView, heightSelectorView, imageUploaderView, userModel, profileEditTemplate) {

  var profileEditView = Backbone.View.extend({
    el: $('#content'),

    events: {
      'click button.update_profile': 'saveProfile',
      'click button.cancel': 'backToUserList'
    },

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;
      $(this.el).attr('class', 'row');

      this.user = new userModel({ id: this.session.user_id });
    },

    render: function() {

      var self = this;
      this.user.fetch({
        success: function() {

          $(self.el).html(_.template(profileEditTemplate, self.user.toJSON()));

          var birthdayDateSelector = new dateSelectorView({ 'name_prefix': 'birthday', 'default_date': self.user.get('birthday') });
          $('.dateSelector').append(birthdayDateSelector.render().el);

          var userHeightSelector = new heightSelectorView({ 'height': self.user.get('height') });
          $('.heightSelector').append(userHeightSelector.render().el);

          var imageUploader = new imageUploaderView({ vent: self.vent, session: self.session });
          $(self.el).append(imageUploader.render().el);

        }
      });
    },

    saveProfile: function() {
      var inputs = {};

      _.each($('form').serializeArray(), function(input) {
        inputs[input.name] = input.value;
      });

      inputs['birthday'] = [inputs['birthday_year'], inputs['birthday_month'], inputs['birthday_day']].join('-');
      delete inputs['birthday_year'];
      delete inputs['birthday_month'];
      delete inputs['birthday_day'];

      inputs['height'] = parseInt(inputs['height_feet'], 10) * 12 + parseInt(inputs['height_inches'], 10);
      delete inputs['height_feet'];
      delete inputs['height_inches'];

      this.user.set(inputs);
      this.user.save();
      Backbone.history.navigate('/users', true);

      return false;
    },

    backToUserList: function() {
      Backbone.history.navigate('/users', true);
      return false;
    }

  });

  return profileEditView;

});
