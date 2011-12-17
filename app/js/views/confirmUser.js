define([

], function() {

  var confirmUser = Backbone.View.extend({

    initialize: function(options) {
      this.vent = options.vent;
      this.token = options.token;
      this.time = options.time;
      this.email = options.email;
    },

    render: function() {
      var self = this;
      $.ajax({
        url: '/actions/confirmUser',
        type: 'post',
        data: {token: this.token, time: this.time, email: this.email },
        success: function(response) {
          if (response == 'true') {            
            // yay
            self.vent.trigger('notification', 'Your email has been confirmed', 'success');
            Backbone.history.navigate('/users', true);
          } else {
            // nay
            self.vent.trigger('notification', 'The link you have provided is no good', 'error');
            Backbone.history.navigate('/', true);
          }
        }
      });
    }

  });

  return confirmUser;

});
