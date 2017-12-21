import template from './callItem.html';
import controller from './callItem.controller';
import './callItem.scss';

const callItemComponent = {
    bindings: {
        call: '<',
    },
    template,
    controller,
};

export default callItemComponent;
