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
    static list(filter = {}) {
        return $.ajax({
            url: this.urlRoot,
            type: 'get',
            data: filter,
            dataType: 'json',
        });
    }
    create() {
        let attributes = {};
        let blackProps = ['urlRoot', 'idAttribute'];
        for (let prop in this) {
            if (!blackProps.includes(prop)) {
                attributes[prop] = this[prop];
            }
        }
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
    remove() {
        let id = this[this.idAttribute];
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