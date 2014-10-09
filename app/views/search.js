define(function (require) {

  var Ember = require('ember');

  return Ember.TextField.extend({
    attributeBindings: ['placeholder'],
    placeholder: 'search',

    setInitialValue: function() {
      var value = this.get('queryFilter');
      if (value) {
        this.set('value', value);
      }
    }.on('init'),

    triggerSearch: function() {
      this.send('search', this.get('value'));
    },

    valueDidChange: function() {
      Ember.run.debounce(this, this.triggerSearch, 200);
    }.observes('value')

  });

});
