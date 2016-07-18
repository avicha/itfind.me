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
        this.token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }
    clone() {
        return new this.constructor(this._getAttributes());
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
        let url = this.urlRoot;
        let qs = [];
        Object.keys(filter).forEach(key => qs.push(key + '=' + filter[key]));
        return fetch(url + '?' + qs.join('&'), {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include',
        }).then(res => res.json());
    }
    fetch() {
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
            return response.then(json => {
                if (!json.code) {
                    extend(this, json.data);
                }
                return json;
            });
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
                'X-CSRF-TOKEN': this.token
            }),
            body: JSON.stringify(attributes),
            credentials: 'include',
        }).then(res => {
            let response = res.json();
            return response.then(json => {
                if (!json.code) {
                    extend(this, attributes);
                    extend(this, json.data);
                }
                return json;
            });
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
                'X-CSRF-TOKEN': this.token
            }),
            body: JSON.stringify(attributes),
            credentials: 'include',
        }).then(res => {
            let response = res.json();
            return response.then(json => {
                if (!json.code) {
                    extend(this, json.data);
                }
                return json;
            });
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
                'X-CSRF-TOKEN': this.token
            },
            credentials: 'include'
        }).then(res => {
            let response = res.json();
            return response.then(json => {
                if (!json.code) {
                    extend(this, json.data);
                }
                return json;
            });
        });
    }
}