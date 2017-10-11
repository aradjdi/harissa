import template from './modalLogout.html';
import controller from './modalLogout.controller';
import './modalLogout.scss';

const modalLogoutComponent = {
  bindings: {
    onConfirm: '&',
    onCancel: '&',
  },
  template,
  controller,
};

export default modalLogoutComponent;
