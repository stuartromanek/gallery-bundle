// var _ = require('@sailshq/lodash');

module.exports = {
  improve: 'apostrophe-areas',
  construct: function (self, options) {
    var superWidgetControlGroups = self.widgetControlGroups;
    self.widgetControlGroups = function (req, widget, options) {
      var groups = superWidgetControlGroups(req, widget, options);
      if (!widget) {
        return groups;
      }

      if (widget.type === 'gallery') {
        groups[0].controls.push({
          icon: 'external-link',
          action: 'enable-lightbox',
          tooltip: 'Enable Lightbox'
        })
        groups[0].controls.push({
          name: 'layout',
          type: 'select',
          tooltip: 'Gallery Layout',
          choices: [
            { label: 'Two Up', value: 'two' },
            { label: 'Three Up', value: 'three' },
            { label: 'Four Up', value: 'four' },
          ]
        })
      }

      return groups;
    };
  }
};