
define([

], function() {
  var filterModel = Backbone.Model.extend({

    initialize: function(attr) {
      if (attr.type == 'checkbox') {
        attr.checked = {};
        for (key in attr.options) {
          attr.checked[key] = 1;
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
          var upper_temp = (parseInt(date.getFullYear(), 10) - range.lower) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          range.lower = (parseInt(date.getFullYear(), 10) - range.upper) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          range.upper = upper_temp;
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
        query_part = data.name + '=[' + data.range.lower + ',' + data.range.upper + ']';
      }
      return query_part;
    }

  });

  return filterModel;

});
