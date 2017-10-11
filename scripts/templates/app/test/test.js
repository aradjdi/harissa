// requires all tests in `project/src/**/index.spec.js`
const tests = require.context('../src/', true, /index\.spec.js$/);

tests.keys().forEach(tests);

// requires all components in `project/src/**/index.js`
const components = require.context('../src/', true, /index\.js$/);

components.keys().forEach(components);