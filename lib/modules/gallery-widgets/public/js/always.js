apos.define('gallery-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      var targetNode = $widget.find('[data-gallery]').get(0);

      // Options for the observer (which mutations to observe)
      var config = {
        attributes: true,
        childList: true,
        subtree: true,
        attributeOldValue: true
      };

      // Callback function to execute when mutations are observed
      var callback = function (mutationsList, observer) {
        for (var m of mutationsList) {
          if (m.attributeName === 'data-gallery-lightbox') {
            var data = apos.areas.getWidgetData($widget);
            var originalData = apos.areas.getWidgetData($widget);
            $.jsonCall('/modules/apostrophe-areas/render-widget', {
              dataType: 'html'
            }, {
              data: data,
              originalData: originalData,
              options: {},
              type: 'gallery'
            }, function (html) {
              var $newWidget = $($.parseHTML($.trim(html), null, true));
              apos.modules['apostrophe-areas'].editors[$widget.parents('[data-apos-area]').attr('data-doc-id') + 'gallery'].replaceWidget($widget, $newWidget);
              return callback(null, $newWidget.findSafe('[data-apos-widget]', '[data-apos-area]'));
            });
          }
        }
      };

      // Create an observer instance linked to the callback function
      var observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);


    };
  }
});