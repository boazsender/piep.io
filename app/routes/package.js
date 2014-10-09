define(function (require) {

  var Ember = require('ember');

  return Ember.Route.extend({

    model: function (params) {
      // this is a hack to get around the fact that we're using fixtured data
      return this.store.all('package').find(function (pkg) {
        return pkg.get('name') === params.name;
      });
    },

    serialize: function (model) {
      return {
        name: model.get('name')
      };
    }

  });

});
