var _ = require('@sailshq/lodash');

module.exports = {
  improve: 'apostrophe-areas',
  construct: function (self, options) {
    var superWidgetControlGroups = self.widgetControlGroups;
    console.log(superWidgetControlGroups);

    self.widgetControlGroups = function (req, widget, options) {
      var groups = superWidgetControlGroups(req, widget, options);
      console.log('improve baby');
      console.log(widget);
      
      // if (!widget) {
      //   return groups;
      // }
      // var choices = [{
      //     label: 'Universal',
      //     value: ''
      //   },
      //   {
      //     label: 'No Persona',
      //     value: 'none'
      //   }
      // ].concat(_.map(personas.personas, function (persona) {
      //   return {
      //     label: persona.label || persona.name,
      //     value: persona.name
      //   };
      // }));
      // groups.push({
      //   classes: 'apos-widget-persona',
      //   // custom javascript will restructure this to do some multiple select tricks
      //   controls: [{
      //     name: 'personas',
      //     type: 'select',
      //     choices: choices
      //   }]
      // });
      return groups;
    };
  }
};