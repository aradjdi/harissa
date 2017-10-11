import template from './radioField.html';
import controller from './radioField.controller';
import './radioField.scss';

const radioFieldComponent = {
  bindings: {
    value: '<',
    name: '<',
    options: '<',
    onChange: '&',
  },
  template,
  controller,
};

export default radioFieldComponent;
