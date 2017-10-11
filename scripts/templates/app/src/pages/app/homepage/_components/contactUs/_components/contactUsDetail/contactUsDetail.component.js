import template from './contactUsDetail.html';
import controller from './contactUsDetail.controller';
import './contactUsDetail.scss';

const contactUsDetailComponent = {
  bindings: {
    savIsClosed: '<',
  },
  template,
  controller,
};

export default contactUsDetailComponent;
