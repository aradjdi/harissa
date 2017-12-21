import template from './modalMenu.html';
import controller from './modalMenu.controller';
import './modalMenu.scss';

const modalMenuComponent = {
    bindings: {
        onLogout: '&',
        onNavigate: '&',
        onCancel: '&',
    },
    template,
    controller,
};

export default modalMenuComponent;
