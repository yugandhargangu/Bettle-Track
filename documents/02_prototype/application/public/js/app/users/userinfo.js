/* global React, ReactDOM, IdHelper */

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