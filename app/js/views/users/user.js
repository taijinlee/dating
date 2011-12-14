
define([
  'models/user',
  'text!/templates/users/user.html'
], function(userModel, userTemplate) {

  var userView = Backbone.View.extend({

    tagName: 'article',
    className: 'user',

    template: _.template(userTemplate),

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return userView;

});
