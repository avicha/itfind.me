import $ from 'jquery';

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
        return fetch(this.urlRoot, {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            body: filter,
            credentials: 'include',
        }).then(res => res.json());
    }
    get() {
        let id = this._getId();
        return fetch(this.urlRoot + '/' + id, {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include',
        }).then(res => {
            let response = res.json();
            if (!response.code) {
                extend(this, response.data);
            }
            return response;
        });
    }
    update(attributes = this._getAttributes()) {
        let id = this._getId();
        return fetch(this.urlRoot + '/' + id, {
            method: 'put',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }),
            body: JSON.stringify(attributes),
            credentials: 'include',
        }).then(res => {
            let response = res.json();
            if (!response.code) {
                extend(this, attributes);
                extend(this, response.data);
            }
            return response;
        });
    }
    create() {
        let attributes = this._getAttributes();
        return fetch(this.urlRoot, {
            method: 'post',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }),
            body: JSON.stringify(attributes),
            credentials: 'include',
        }).then(res => {
            let response = res.json();
            if (!response.code) {
                extend(this, response.data);
            }
            return response;
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
        return fetch(this.urlRoot + '/' + id, {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'include'
        }).then(res => {
            let response = res.json();
            if (!response.code) {
                extend(this, response.data);
            }
            return response;
        });
    }
}