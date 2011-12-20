
define([
  'text!/templates/profile/userStats.html'
], function(userStatsTemplate) {

  var userStatsView = Backbone.View.extend({

    tagName: 'section',

    render: function(userJSON) {
      $(this.el).html(_.template(userStatsTemplate, userJSON));
      return this;
    }


  });

  return userStatsView;

});
