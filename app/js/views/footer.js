define([
  'text!/templates/footer.html'
], function(footerTemplate) {

  var footerView = Backbone.View.extend({

    el: $('footer#footer'),
    tagName: 'footer',

    initialize: function(attributes) {
    },

    render: function() {
      $(this.el).html(_.template(footerTemplate)).attr('id', 'footer');
    }

  });

  return footerView;
});
