
define([
  'models/user',
  'text!/templates/users/user.html'
], function(userModel, userTemplate) {

  var userView = Backbone.View.extend({

    tagName: 'article',
    className: 'user',

    render: function() {
      $(this.el).html(_.template(userTemplate, this.model.toJSON()));
      return this;
    }

  });

  return userView;

});
