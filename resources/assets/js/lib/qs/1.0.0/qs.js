(function() {
    var qs = {};
    /**
     * [query 获取查询参数]
     * @param  {[type]} key        [查询参数]
     * @param  {[type]} defaultVal [默认值]
     * @return {[type]}            [description]
     */
    qs.query = function(key, defaultVal) {
        var params = {};
        var search = window.location.search.substring(1);
        //查询参数数组
        var searchParamsArray = search.split('&');
        for (var i = searchParamsArray.length - 1; i >= 0; i--) {
            var searchParam = searchParamsArray[i].split('=');
            if (searchParam.length === 2) {
                if (isNaN(Number(searchParam[1]))) {
                    params[searchParam[0]] = decodeURIComponent(searchParam[1]);
                } else {
                    params[searchParam[0]] = Number(searchParam[1]);
                }
            }
        }
        //如果传递了key参数，则返回对应的值
        if (key) {
            return params[key] || defaultVal || '';
        } else {
            //否则返回挣个查询参数对象
            return params;
        }
    };
    qs.stringify = function(obj) {
        var strArr = [];
        for (var key in obj) {
            strArr.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return strArr.join('&');
    };
    if (typeof(module) !== 'undefined') {
        module.exports = qs;
    } else {
        if (typeof define === 'function' && define.amd) {
            define([], function() {
                'use strict';
                return qs;
            });
        } else {
            window.qs = qs;
        }
    }
})();