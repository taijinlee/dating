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
            Backbone.history.navigate('/users', true);
            self.vent.trigger('renderNotification', 'Your email has been confirmed', 'success');
          } else {
            // nay
            Backbone.history.navigate('', true);
            self.vent.trigger('renderNotification', 'The link you have provided is no good', 'error');
          }
        }
      });
    }

  });

  return confirmUser;

});
