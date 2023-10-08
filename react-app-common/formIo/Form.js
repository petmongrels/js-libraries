class Form {
    constructor(formDefinition) {
        this.formDefinition = formDefinition;
    }

    get title() {
        return this.formDefinition["title"];
    }

    get id() {
        return this.formDefinition["_id"];
    }

    get name() {
        return this.formDefinition["name"];
    }
}

export default Form;
