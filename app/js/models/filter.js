
define([

], function() {
  var filterModel = Backbone.Model.extend({

    initialize: function(attr) {
      if (attr.type == 'checkbox') {
        attr.checked = {};
        for (var i = 0; i < attr.options.length; i++) {
          attr.checked[attr.options[i]] = 1;
        }
      } else if (attr.type == 'range') {
        attr.range = attr.options;
      }
      this.set(attr);
    },

    transformData: function() {
      var name = this.get('name');
      if (this.get('type') == 'checkbox') {
        var checked = this.get('checked');
        return { name: name, checked: checked };
      } else {
        var range = _.clone(this.get('range'));

        if (this.get('name') == 'age') {
          name = 'birthday';
          var date = new Date();
          range.upper = (parseInt(date.getFullYear(), 10) - range.upper) + '-' + date.getMonth() + '-' + date.getDate();
          range.lower = (parseInt(date.getFullYear(), 10) - range.lower) + '-' + date.getMonth() + '-' + date.getDate();
        }

        return { name: name, range: range };
      }

    },

    getQueryPart: function() {
      var query_part;
      var data = this.transformData();
      if (this.get('type') == 'checkbox') {
        query_part = [];
        var checked = data.checked;
        for (var key in checked) {
          if (checked[key] > 0) {
            query_part.push(key)
          }
        }
        query_part = data.name + '=' + query_part.join(',');
      } else if (this.get('type') == 'range') {
        query_part = data.name + '=[' + data.range.upper + ',' + data.range.lower + ']';
      }
      return query_part;
    }

  });

  return filterModel;

});
