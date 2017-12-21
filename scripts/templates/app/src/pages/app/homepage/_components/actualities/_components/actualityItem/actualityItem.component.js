import template from './actualityItem.html';
import controller from './actualityItem.controller';
import './actualityItem.scss';

const actualityItemComponent = {
    bindings: {
        actuality: '<',
    },
    template,
    controller,
};

export default actualityItemComponent;
