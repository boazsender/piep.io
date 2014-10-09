define(function (require) {

  var Ember = require('ember');

  return Ember.Route.extend({

    model: function () {
      return this.store.all('package');
    }

  });

});
