import $ from 'jquery';
import request from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import Es6Promise from 'es6-promise';
superagentPromisePlugin.Promise = Es6Promise.Promise;
let extend = (base, other) => {
    for (let prop in other) {
        base[prop] = other[prop];
    }
    return base;
}
export default class BaseModel {
    constructor(attributes = {}) {
        extend(this, attributes);
        this.urlRoot = '';
        this.idAttribute = 'id';
    }
    get(attribute_name) {
        return this[attribute_name];
    }
    set(attribute_name, attribute_value) {
        this[attribute_name] = attribute_value;
        return this;
    }
    _getId() {
        return this[this.idAttribute];
    }
    _getAttributes() {
        let attributes = {};
        let blackProps = ['urlRoot', 'idAttribute'];
        for (let prop in this) {
            if (!blackProps.includes(prop)) {
                attributes[prop] = this[prop];
            }
        }
        return attributes;
    }
    static list(filter = {}) {
        return request.get(this.urlRoot).query(filter).set({
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }).use(superagentPromisePlugin).then(res => res.body);
    }
    get() {
        let id = this._getId();
        return request.get(this.urlRoot + '/' + id).set({
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }).use(superagentPromisePlugin).then(res => {
            extend(this, res.body.data);
            return res.body;
        });
    }
    update(attributes = this._getAttributes()) {
        let id = this._getId();
        return request.put(this.urlRoot + '/' + id).set({
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }).send(JSON.stringify(attributes)).then(res => {
            extend(this, attributes);
            extend(this, res.body.data);
            return res.body;
        });
    }
    create() {
        let attributes = this._getAttributes();
        return request.put(this.urlRoot).set({
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }).send(JSON.stringify(attributes)).then(res => {
            extend(this, res.body.data);
            return res.body;
        });
    }
    save() {
        let id = this._getId();
        if (id) {
            return this.update();
        } else {
            return this.create();
        }
    }
    remove() {
        let id = this._getId();
        return request.del(this.urlRoot + '/' + id).set({
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }).use(superagentPromisePlugin).then(res => {
            extend(this, res.body.data);
            return res.body;
        });
    }
}