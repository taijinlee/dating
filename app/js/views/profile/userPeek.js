
define([
  'text!/templates/profile/userPeek.html'
], function(userPeekTemplate) {

  var userPeekView = Backbone.View.extend({

    tagName: 'section',

    render: function(userJSON) {
      $(this.el).html(_.template(userPeekTemplate, userJSON));
      return this;
    }

  });

  return userPeekView;


});
