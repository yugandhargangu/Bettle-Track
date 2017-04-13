/* global React, ViewMoreBtnHelper, IdHelper, ReactDOM */

'use strict';

var ProjectCardDiv = React.createClass({
    render: function () {
        var _self = this;
        var cardItems = [];
        $.each(_self.props.projects, function (index, values) {
            // left div
            var img = React.createElement('img', {className: "card-item-img", alt: "img", src: values.img_src}, null);
            var leftCell = React.createElement('div', {className: "cell size4 padding5"}, [img]);

            // right div
            var infoChilds = [];
            infoChilds.push(React.createElement('span', {}, [
                React.createElement('span', {}, _self.props.labels.project_code, null),
                React.createElement('b', {}, values.code, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.name, null),
                React.createElement('b', {}, values.name, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.modules, null),
                React.createElement('b', {}, values.modules, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.members, null),
                React.createElement('b', {}, values.members, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.start_date, null),
                React.createElement('b', {}, values.start_date, null)
            ]));
            infoChilds.push(React.createElement('p', {}, [
                React.createElement('span', {}, _self.props.labels.end_date, null),
                React.createElement('b', {}, values.end_date, null)
            ]));
            var rightCell = React.createElement('div', {className: "cell size12 padding5"}, infoChilds);
            // full div
            var row = React.createElement('div', {className: "row"}, [leftCell, rightCell]);

            // buttons
            var topChilds = [row];
            topChilds.push(React.createElement('button', {className: "button primary", onClick: function () {
                    _self.props.ctrl.showProjectDetails(values.id);
                }}, [React.createElement('span', {className: "mif-info"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.view_details)
            ]));
            topChilds.push(React.createElement('button', {className: "button primary", onClick: function () {
                    _self.props.ctrl.showTestCases(values.id);
                }}, [React.createElement('span', {className: "mif-filter"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.test_plan)
            ]));
            topChilds.push(React.createElement('button', {className: "button primary", onClick: function () {
                    _self.props.ctrl.showTestSets(values.id);
                }}, [React.createElement('span', {className: "mif-lab"}, null),
                React.createElement('span', {}, ' ' + _self.props.labels.test_lab)
            ]));

            // each div
            var cardItem = React.createElement('div', {className: "card-item bg-lighterGray"}, [React.createElement('div', {className: "flex-grid"}, topChilds)]);
            cardItems.push(cardItem);
        });
        return React.createElement('div', null, cardItems);
    }
});

var ProjectCardFactory = React.createFactory(ProjectCardDiv);

var ProjectCardlayout = {};
ProjectCardlayout.render = function (info, ctrl) {
    ViewMoreBtnHelper.destroy();
    var newId = IdHelper.generate();
    var nextDiv = $('<div id="' + newId + '"></div>');
    nextDiv.appendTo($('#projects-list'));
    info.ctrl = ctrl;
    var container = document.getElementById(newId);
    ReactDOM.render(ProjectCardFactory(info), container);
    ViewMoreBtnHelper.create('projects-list', ctrl);
};