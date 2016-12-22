/* global React, ReactDOM, IdHelper */

'use strict';

var TableProperties = {
    className: 'table striped hovered cell-auto-size border bordered'
};

var SubSectionProperties = {
    className: 'cell bg-white margin10 padding10'
};

var MainSectionProperties3 = {
    className: 'row cells3 cell-auto-size'
};

var MainSectionProperties2 = {
    className: 'row cells2 cell-auto-size'
};

var MainSectionProperties1 = {
    className: 'row cell-auto-size'
};

var DivProperties = {
    style: {
        width: '100%'
    }
};

var SectionsProperties = {
    className: "grid padding20"
};

var DashboardTable = React.createClass({
    render: function () {
        var _self = this;

        var ths = [];
        for (var i = 0; i < _self.props.thead.length; i++) {
            ths.push(React.createElement("th", null, _self.props.thead[i]));
        }
        var thead = React.createElement("thead", null,
                React.createElement("tr", null, ths)
                );
        var trs = [];
        for (var i = 0; i < _self.props.tbody.length; i++) {
            var tds = [];
            var row = _self.props.tbody[i];
            for (var j = 0; j < row.length; j++) {
                tds.push(React.createElement("td", null, row[j]));
            }
            trs.push(React.createElement("tr", null, tds));
        }
        var tbody = React.createElement("tbody", null, trs);
        return React.createElement("table", TableProperties, [thead, tbody]);
    }
});

var DashboardCanvas = React.createClass({
    render: function () {
        var _self = this;
        _self.myId = IdHelper.generate();
        var canvasProps = {
            id: _self.myId,
            width: '400',
            height: '250'
        };
        DashBoardView.callbacks.push({
            id: _self.myId,
            data: _self.props,
            callback: function () {
                var ctx = document.getElementById(this.id);
                var chart = new Chart(ctx, this.data);
            }
        });
        return React.createElement("canvas", canvasProps, null);
    }
});

var DashboardDiv = React.createClass({
    render: function () {
        var _self = this;
        return React.createElement('div', DivProperties, _self.props.data);
    }
});

var SubSection = React.createClass({
    render: function () {
        var _self = this;

        var head = React.createElement('h4', {}, _self.props.head);
        var content = '';
        if (_self.props.type === 'chart') {
            content = React.createElement(DashboardCanvas, _self.props.data, null);
        } else if (_self.props.type === 'table') {
            content = React.createElement(DashboardTable, _self.props.data, null);
        } else {
            var data = {
                data: _self.props.data
            };
            content = React.createElement(DashboardDiv, data, null);
        }
        return React.createElement('div', SubSectionProperties, [head, content]);
    }
});

var Section = React.createClass({
    render: function () {
        var _self = this;
        var head = React.createElement('h4', {}, _self.props.head);
        var mainProperties = MainSectionProperties1;
        if (_self.props.sub.value) {
            if (_self.props.sub.count === 3) {
                mainProperties = MainSectionProperties3;
            } else if (_self.props.props.sub.count === 2) {
                mainProperties = MainSectionProperties2;
            }
            var subSections = [];
            for (var i = 0; i < _self.props.content.length; i++) {
                subSections.push(React.createElement(SubSection, _self.props.content[i], null));
            }
            return React.createElement('div', mainProperties, subSections);
        } else {
            var sectionContent = '';
            if (_self.props.content.type === 'table') {
                sectionContent = React.createElement(DashboardTable, _self.props.content.data, null);
            } else if (_self.props.content.type === 'chart') {
                sectionContent = React.createElement(DashboardCanvas, _self.props.content.data, null);
            } else {
                sectionContent = React.createElement(DashboardDiv, _self.props.content.data.null);
            }
            var subDiv = React.createElement('div', SubSectionProperties, [head, sectionContent]);
            return React.createElement('div', mainProperties, subDiv);
        }
    }
});

var Sections = React.createClass({
    render: function () {
        var _self = this;
        var allSections = [];
        for (var i = 0; i < _self.props.content.length; i++) {
            allSections.push(React.createElement(Section, _self.props.content[i], null));
        }
        return React.createElement('div', SectionsProperties, allSections);
    }
});

var DashboardFactory = React.createFactory(Sections);

var DashBoardView = {
    callbacks: []
};

DashBoardView.runCallbacks = function () {
    if (this.callbacks.length > 0) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].callback();
        }
    }
};

DashBoardView.render = function (dashBoardContent) {
    this.callbacks = [];
    var container = document.getElementById('dashboard-view');
    ReactDOM.render(DashboardFactory(dashBoardContent), container);
    this.runCallbacks();
};