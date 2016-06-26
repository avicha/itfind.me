import $ from 'jquery';
export default class BaseModel {
    constructor(attributes = {}) {
        $.extend(this, attributes);
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
        return $.ajax({
            url: this.urlRoot,
            type: 'get',
            data: filter,
            dataType: 'json',
        });
    }
    get() {
        let id = this._getId();
        return $.ajax({
            url: this.urlRoot + '/' + id,
            type: 'get',
            dataType: 'json',
            success: res => {
                $.extend(this, res.data);
            }
        });
    }
    update(attributes = this._getAttributes()) {
        let id = this._getId();
        return $.ajax({
            url: this.urlRoot + '/' + id,
            type: 'put',
            data: JSON.stringify(attributes),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: res => {
                $.extend(this, attributes);
                $.extend(this, res.data);
            }
        });
    }
    create() {
        let attributes = this._getAttributes();
        return $.ajax({
            url: this.urlRoot,
            type: 'post',
            data: JSON.stringify(attributes),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: res => {
                $.extend(this, res.data);
            }
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
        return $.ajax({
            url: this.urlRoot + '/' + id,
            type: 'delete',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
        });
    }
}