define([
  'text!/templates/footer.html'
], function(footerTemplate) {

  var footerView = Backbone.View.extend({

    el: $('footer#footer'),

    initialize: function(attributes) {
    },

    render: function() {
      $(this.el).html(_.template(footerTemplate)).attr('class', 'sixteen columns');
    }

  });

  return footerView;
});
