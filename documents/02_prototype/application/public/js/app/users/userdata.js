/* global React, ReactDOM, IdHelper, ViewMoreBtnHelper */

'use strict';

var SelectWithOptions = React.createClass({
    render: function () {
        var _self = this;
        var options = [];
        for (var i = 0; i < _self.props.options.length; i++) {
            var attrs = {
                value: _self.props.options[i].value
            };
            if ($.inArray(attrs.value, _self.props.values) !== -1) {
                attrs.selected = true;
            }
            options.push(React.createElement('option', attrs, _self.props.options[i].label));
        }
        var attrs = {
            id: IdHelper.generate(),
            name: "position",
            "ng-model": "ctrl.userInfo.user_group"
        };
        SelectRender.id = attrs.id;
        if (_self.props.multiple) {
            attrs.multiple = 'multiple';
        }
        return React.createElement('select', attrs, options);
    }
});

var SelectFactory = React.createFactory(SelectWithOptions);

var SelectRender = {
    id: ''
};
SelectRender.render = function (id, selectContent, select2, tags, placeholder) {
    var container = document.getElementById(id);
    ReactDOM.render(SelectFactory(selectContent), container);
    if (select2) {
        $('#' + this.id).select2({
            placeholder: placeholder,
            tags: tags
        });
    }
};

// user data
var UserCardDiv = React.createClass({
    render: function () {
        var _self = this;
        var cardItems = [];
        $.each(_self.props.users, function (index, values) {
            // left div
            var img = React.createElement('img', {className: "card-item-img", alt: "img", src: values.img_src}, null);
            var childs = [];
            childs.push(React.createElement('span', {className: "label-padding"}, _self.props.labels.status));
            if (values.status === 1) {
                childs.push(React.createElement('span', {className: "bg-green fg-white label-padding"}, _self.props.labels.active));
            } else {
                childs.push(React.createElement('span', {className: "bg-orange fg-white label-padding"}, _self.props.labels.blocked));
            }
            var statusP = React.createElement('p', null, childs);
            var leftCell = React.createElement('div', {className: "cell size4 padding5"}, [img, statusP]);

            // right div
            var infoChilds = [];
            infoChilds.push(React.createElement('span', {}, [
                React.createElement('span', {}, _self.props.labels.user_id, null),
                React.createElement('b', {}, values.username, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.fullname, null),
                React.createElement('b', {}, values.fullname, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.email_id, null),
                React.createElement('b', {}, values.email_id, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.role, null),
                React.createElement('b', {}, values.role, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.total_groups, null),
                React.createElement('b', {}, values.total_groups, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.active_groups),
                React.createElement('b', {}, values.active_groups)
            ]));
            var rightCell = React.createElement('div', {className: "cell size12 padding5"}, infoChilds);
            // full div
            var row = React.createElement('div', {className: "row"}, [leftCell, rightCell]);

            // buttons
            var topChilds = [row];
            topChilds.push(React.createElement('button', {className: "button fg-default", onClick: function () {
                    _self.props.ctrl.showUserInfo(values.id);
                }}, [React.createElement('span', {className: "mif-pencil"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.edit)
            ]));
            topChilds.push(React.createElement('button', {className: "button fg-default", onClick: function () {
                    _self.props.ctrl.showuserGroups(values.id);
                }}, [React.createElement('span', {className: "mif-eye"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.view_groups)
            ]));
            if (values.status === 1) {
                topChilds.push(React.createElement('button', {className: "button fg-orange", onClick: function () {
                        _self.props.ctrl.showuserGroups(values.id);
                    }}, [React.createElement('span', {className: "mif-blocked"}, null),
                    React.createElement('span', {}, ' ' + _self.props.labels.block)
                ]));
            } else {
                topChilds.push(React.createElement('button', {className: "button fg-green", onClick: function () {
                        _self.props.ctrl.showuserGroups(values.id);
                    }}, [React.createElement('span', {className: "mif-checkmark"}, null),
                    React.createElement('span', {}, ' ' + _self.props.labels.activate)
                ]));
            }
            topChilds.push(React.createElement('button', {className: "button fg-red", onClick: function () {
                    _self.props.ctrl.deleteUser(values.id);
                }}, [React.createElement('span', {className: "mif-bin"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.delete)
            ]));

            // each div
            var cardItem = React.createElement('div', {className: "card-item bg-lighterGray"}, [React.createElement('div', {className: "flex-grid"}, topChilds)]);
            cardItems.push(cardItem);
        });
        return React.createElement('div', null, cardItems);
    }
});

var UserCardFactory = React.createFactory(UserCardDiv);

var UserCardlayout = {};
UserCardlayout.render = function (info, ctrl) {
    ViewMoreBtnHelper.destroy();
    var newId = IdHelper.generate();
    var nextDiv = $('<div id="' + newId + '"></div>');
    nextDiv.appendTo($('#users-list'));
    info.ctrl = ctrl;
    var container = document.getElementById(newId);
    ReactDOM.render(UserCardFactory(info), container);
    ViewMoreBtnHelper.create('users-list', ctrl);
};

// user group data
var UserGroupCardDiv = React.createClass({
    render: function () {
        var _self = this;
        var cardItems = [];
        $.each(_self.props.user_groups, function (index, values) {
            // left div
            var img = React.createElement('img', {className: "card-item-img", alt: "img", src: values.img_src}, null);
            var childs = [];
            childs.push(React.createElement('span', {className: "label-padding"}, _self.props.labels.status));
            if (values.status === 1) {
                childs.push(React.createElement('span', {className: "bg-green fg-white label-padding"}, _self.props.labels.active));
            } else {
                childs.push(React.createElement('span', {className: "bg-orange fg-white label-padding"}, _self.props.labels.blocked));
            }
            var statusP = React.createElement('p', null, childs);
            var leftCell = React.createElement('div', {className: "cell size4 padding5"}, [img, statusP]);

            // right div
            var infoChilds = [];
            infoChilds.push(React.createElement('span', {}, [
                React.createElement('span', {}, _self.props.labels.group_name, null),
                React.createElement('b', {}, values.name, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.email_id, null),
                React.createElement('b', {}, values.email_id, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.total_users, null),
                React.createElement('b', {}, values.total_users, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.active_users),
                React.createElement('b', {}, values.active_users)
            ]));
            var rightCell = React.createElement('div', {className: "cell size12 padding5"}, infoChilds);
            // full div
            var row = React.createElement('div', {className: "row"}, [leftCell, rightCell]);

            // buttons
            var topChilds = [row];
            topChilds.push(React.createElement('button', {className: "button fg-default", onClick: function () {
                    _self.props.ctrl.showUserGroupInfo(values.id);
                }}, [React.createElement('span', {className: "mif-pencil"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.edit)
            ]));
            topChilds.push(React.createElement('button', {className: "button fg-default", onClick: function () {
                    _self.props.ctrl.showGroupUsers(values.id);
                }}, [React.createElement('span', {className: "mif-eye"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.view_users)
            ]));
            if (values.status === 1) {
                topChilds.push(React.createElement('button', {className: "button fg-orange", onClick: function () {
                        _self.props.ctrl.showUserGroupInfo(values.id);
                    }}, [React.createElement('span', {className: "mif-blocked"}, null),
                    React.createElement('span', {}, ' ' + _self.props.labels.block)
                ]));
            } else {
                topChilds.push(React.createElement('button', {className: "button fg-green", onClick: function () {
                        _self.props.ctrl.showUserGroupInfo(values.id);
                    }}, [React.createElement('span', {className: "mif-checkmark"}, null),
                    React.createElement('span', {}, ' ' + _self.props.labels.activate)
                ]));
            }
            topChilds.push(React.createElement('button', {className: "button fg-red", onClick: function () {
                    _self.props.ctrl.deleteGroup(values.id);
                }}, [React.createElement('span', {className: "mif-bin"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.delete)
            ]));

            // each div
            var cardItem = React.createElement('div', {className: "card-item bg-lighterGray"}, [React.createElement('div', {className: "flex-grid"}, topChilds)]);
            cardItems.push(cardItem);
        });
        return React.createElement('div', null, cardItems);
    }
});

var UserGroupCardFactory = React.createFactory(UserGroupCardDiv);

var UserGroupCardlayout = {};
UserGroupCardlayout.render = function (info, ctrl) {
    ViewMoreBtnHelper.destroy();
    var newId = IdHelper.generate();
    var nextDiv = $('<div id="' + newId + '"></div>');
    nextDiv.appendTo($('#user-groups-list'));
    info.ctrl = ctrl;
    var container = document.getElementById(newId);
    ReactDOM.render(UserGroupCardFactory(info), container);
    ViewMoreBtnHelper.create('user-groups-list', ctrl);
};