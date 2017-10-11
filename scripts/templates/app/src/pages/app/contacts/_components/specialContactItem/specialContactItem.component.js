import template from './specialContactItem.html';
import controller from './specialContactItem.controller';
import './specialContactItem.scss';

const specialContactItemComponent = {
  bindings: {
    contact: '<',
  },
  template,
  controller,
};

export default specialContactItemComponent;
