import template from './contactItem.html';
import controller from './contactItem.controller';
import './contactItem.scss';

const contactItemComponent = {
    bindings: {
        contact: '<',
    },
    template,
    controller,
};

export default contactItemComponent;
