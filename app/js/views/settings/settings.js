define([
  'views/lib/dateSelector',
  'models/user',
  'text!/templates/settings/settings.html'
], function(dateSelectorView, userModel, settingsTemplate) {

  var settingsView = Backbone.View.extend({

    el: $('#content'),

    events: {
      'click a.save': 'save',
      'click a.cancel': 'cancel'
    },

    initialize: function(options) {
      this.vent = options.vent;
      this.session = options.session;

      this.user = new userModel({ id: this.session.user_id });
      this.vent.bind('userSettingsFetched', this.renderUserSettings, this);
    },

    render: function() {
      var self = this;
      this.user.fetch({
        success: function() { 
          self.vent.trigger('userSettingsFetched');          
        }
      });
    },

    renderUserSettings: function() {
      $(this.el).empty();

      $(this.el).append(_.template(settingsTemplate, this.user.toJSON()));

      this.dateSelector = new dateSelectorView({ name_prefix: 'birthday', default_date: this.user.get('birthday') });
      $('#settings_birthdate').html(this.dateSelector.render().el);

    },

    save: function() {
      var inputs = {};

      _.each($('form').serializeArray(), function(input) {
        inputs[input.name] = input.value;
      });

      inputs['birthday'] = [inputs['birthday_year'], inputs['birthday_month'], inputs['birthday_day']].join('-');
      delete inputs['birthday_year'];
      delete inputs['birthday_month'];
      delete inputs['birthday_day'];

      this.user.set(inputs);
      this.user.save();
      Backbone.history.navigate('/users', true);
      return false;
    },

    cancel: function() {
      Backbone.history.navigate('/users', true);
      return false;

    }


  });

  return settingsView;


});