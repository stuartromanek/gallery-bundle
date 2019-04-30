module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Gallery',
  contextual: true,
  addFields: [
    {
      name: 'enableLightbox',
      label: 'Enable Lightbox',
      type: 'boolean',
      contextual: true,
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
      contextual: true,
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