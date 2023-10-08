import _ from "lodash";

const beans = new Map();

class Container {
    static add(type, obj) {
        beans.set(type, obj);
    }

    static get(type) {
        let obj = beans.get(type);
        return _.isNil(obj) ? type : obj;
    }
}

export default Container;
