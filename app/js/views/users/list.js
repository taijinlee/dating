
define([
  'collections/users',
  'views/users/user',
  'models/user',
  'text!/templates/users/user.html'
], function(userCollection, userView, userModel, userTemplate) {
  var usersListView = Backbone.View.extend({
    el: $('#content'),

    template: _.template(userTemplate),

    initialize: function() {
      this.collection = new userCollection;
      this.collection.bind('add', this.addUser, this);

      var user = new userModel({id: 4});
      user.fetch();
        alert('hi');
      console.log(user);
      this.collection.add(user);
      console.log(this.collection);
      //this.collection.fetch();
      /*
      this.collection.add({ name: "test" });
      this.collection.add({ name: "blah" , handle: 'something else'});
      this.collection.add({ name: "blah" , handle: 'something else else'});
      */
    },

    addUser: function(userModel) {
      var view = new userView({ model: userModel});
      this.el.append(view.render().el);
    }

  });

  return new usersListView;
});
