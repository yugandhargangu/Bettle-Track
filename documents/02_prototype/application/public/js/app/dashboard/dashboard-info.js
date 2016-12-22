/* global React, ReactDOM */

'use strict';

var WindowProps = {
    main: {
        className: "window-content"
    },
    tools: {
        main: {
            className: 'padding5',
            style: {
                width: '100%;'
            }
        },
        button: {
            className: 'button tool-button'
        }
    }
};

var DashboardTool = React.createClass({
    render: function () {
        var _self = this;
        var childs = [];
        childs.push(React.createElement('div', {className: 'split-button tool-button'},
                React.createElement('button', {className: 'button', onClick: _self.props.ctrl.addSection1}, '+ Add Section'),
                React.createElement('button', {className: 'split dropdown-toggle'}, null),
                React.createElement('ul', {className: 'split-content d-menu', 'data-role': 'dropdown'},
                        React.createElement('li', {},
                                React.createElement('a', {href: '', onClick: _self.props.ctrl.addSection2}, 'With 2 sub sections')
                                ),
                        React.createElement('li', {},
                                React.createElement('a', {href: '', onClick: _self.props.ctrl.addSection3}, 'With 3 sub sections')
                                )
                        )
                ));
        WindowProps.tools.button.onClick = _self.props.ctrl.addChart;
        childs.push(React.createElement('button', WindowProps.tools.button, '+ Add Chart'));
        WindowProps.tools.button.onClick = _self.props.ctrl.addTable;
        childs.push(React.createElement('button', WindowProps.tools.button, '+ Add Table'));
        WindowProps.tools.button.onClick = _self.props.ctrl.addText;
        childs.push(React.createElement('button', WindowProps.tools.button, '+ Add Text'));
        return React.createElement('div', WindowProps.tools.main, childs);
    }
});

var WindowContent = React.createClass({
    render: function () {
        var _self = this;
        var dashboardTool = React.createElement(DashboardTool, {ctrl: _self.props.ctrl}, null);
        var hr = React.createElement('hr', {}, null);
        return React.createElement('div', WindowProps.main, [dashboardTool, hr]);
    }
});

var WindowFactory = React.createFactory(WindowContent);

var DashboardInfo = {};
DashboardInfo.render = function (info) {
    var container = document.getElementById('dashboard-content');
    ReactDOM.render(WindowFactory(info), container);
};
