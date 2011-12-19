
define([
  'views/app',
  'views/lib/dateSelector',
  'views/lib/heightSelector',
  'views/lib/imageUploader',
  'models/user',
  'text!/templates/profile.html'
], function(appView, dateSelectorView, heightSelectorView, imageUploaderView, userModel, profileTemplate) {

  var profileView = appView.extend({
    el: $('#content'),

    events: {
      'click button.update_profile': 'saveProfile',
      'click button.cancel': 'backToUserList'
    },

    initialize: function(options) {
      appView.prototype.initialize.call(this, options);
      $(this.el).attr('class', 'row');
    },

    render: function() {
      appView.prototype.render.call(this);

      var session = {};
      $.ajax({
        'url': '/actions/session',
        'type': 'get',
        'async': false,
        'success': function(data) {
          session = JSON.parse(data);
        }
      });

      this.user = new userModel({ id: session.user_id });

      var self = this;
      this.user.fetch({
        success: function() {
          $(self.el).html(_.template(profileTemplate, self.user.toJSON()));

          var birthdayDateSelector = new dateSelectorView({ 'name_prefix': 'birthday', 'default_date': self.user.get('birthday') });
          $('.dateSelector').append(birthdayDateSelector.render().el);

          var userHeightSelector = new heightSelectorView({ 'height': self.user.get('height') });
          $('.heightSelector').append(userHeightSelector.render().el);

          var imageUploader = new imageUploaderView();
          $('#imageUploader').append(imageUploader.render().el);
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
      this.navigate('/users', true);

      return false;
    },

    backToUserList: function() {
      this.navigate('/users', true);

      return false;
    }

  });

  return profileView;

});
