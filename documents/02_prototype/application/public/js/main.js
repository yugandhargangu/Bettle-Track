'use strict';

var AjaxHelper = {};
AjaxHelper.generateResponse = function (data, headers) {
    return {
        status: 0,
        redirect: false,
        redirectUrl: '',
        headers: headers,
        data: angular.fromJson(data)
    };
};

var IdHelper = {
    id: 1,
    name: 'IdName'
};

IdHelper.generate = function () {
    this.id++;
    return this.name + this.id;
};