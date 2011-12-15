
define([
  'views/app',
  'views/lib/dateSelector',
  'views/lib/heightSelector',
  'views/lib/imageUploader',
  'models/userProfile',
  'text!/templates/profile.html'
], function(appView, dateSelectorView, heightSelectorView, imageUploaderView, userProfileModel, profileTemplate) {

  var profileView = appView.extend({
    el: $('#content'),

    template: _.template(profileTemplate),

    events: {
      'click button.update_profile': 'saveProfile',
      'click button.cancel': 'backToUserList'
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

      this.userProfile = new userProfileModel({ id: session.user_id });

      var self = this;
      this.userProfile.fetch({
        success: function() {
          $(self.el).html(self.template(self.userProfile.toJSON()));

          var userBirthday = {
            month: self.userProfile.get('birthday_month'),
            day: self.userProfile.get('birthday_day'),
            year: self.userProfile.get('birthday_year')
          };
          var birthdayDateSelector = new dateSelectorView('birthday', userBirthday);
          $('.dateSelector').append(birthdayDateSelector.render().el);

          var userHeight = {
            feet: self.userProfile.get('height_feet'),
            inches: self.userProfile.get('height_inches')
          }
          var userHeightSelector = new heightSelectorView(userHeight);
          $('.heightSelector').append(userHeightSelector.render().el);

          var imageUploader = new imageUploaderView();
          $('#imageUploader').append(imageUploader.render().el);
        }
      });

    },


    saveProfile: function() {
      var inputs = {};
      _.each($('#profile').serializeArray(), function(input) {
        inputs[input.name] = input.value;
      });
      this.userProfile.set(inputs);
      this.userProfile.save();
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
