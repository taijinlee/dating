
define([
  'text!/templates/profile/userPeek.html'
], function(userPeekTemplate) {

  var userPeekView = Backbone.View.extend({

    tagName: 'section',

    initialize: function() {
      $(this.el).attr('class', 'userPeek');
    },

    render: function(userJSON) {
      $(this.el).html(_.template(userPeekTemplate, userJSON));
      return this;
    }

  });

  return userPeekView;


});
