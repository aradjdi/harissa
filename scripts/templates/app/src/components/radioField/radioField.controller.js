/** @ngInject */
export default function radioFieldController() {
    /**
     * Checked the default value if none checked the first value */
    this.select = (option) => {
        if (this.value && this.value === option) return true;
        return this.options[0].value === option;
    };

    /**
     * Notify parent on change radio field */
    this.notifyChange = value => this.onChange({value});
}
