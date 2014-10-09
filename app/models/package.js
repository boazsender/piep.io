define(function (require) {
  var DS = require('ember-data');

  return DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    tags: DS.attr()
  });

});
