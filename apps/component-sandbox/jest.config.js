module.exports = {
  name: 'component-sandbox',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/component-sandbox',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
