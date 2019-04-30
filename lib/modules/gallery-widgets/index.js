module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  contextual: true,
  addFields: [
    {
      name: 'enableLightbox',
      label: 'Enable Lightbox',
      type: 'boolean',
      choices: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      def: 'three',
      choices: [
        { label: 'Two Up', value: 'two' },
        { label: 'Three Up', value: 'three' },
        { label: 'Four Up', value: 'four' }
      ]
    }
  ],
  afterConstruct: function(self) {
    self.pushAsset('stylesheet', 'widget', { when: 'always' });
    self.pushAsset('stylesheet', 'vendor/fancybox', { when: 'always' });
    self.pushAsset('script', 'vendor/fancybox', { when: 'always' });
  }
}