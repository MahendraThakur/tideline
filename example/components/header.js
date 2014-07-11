/** @jsx React.DOM */
var bows = window.bows;
var React = window.React;
var cx = React.addons.classSet;

var back = require('../blip_icons_back.svg');
var next = require('../blip_icons_next.svg');

var tideline = {
  log: bows('Header')
};

var TidelineHeader = React.createClass({
  propTypes: {
    chartType: React.PropTypes.string.isRequired,
    inTransition: React.PropTypes.bool.isRequired,
    atMostRecent: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    onClickBack: React.PropTypes.func,
    onClickMostRecent: React.PropTypes.func.isRequired,
    onClickNext: React.PropTypes.func,
    onClickOneDay: React.PropTypes.func.isRequired,
    onClickTwoWeeks: React.PropTypes.func.isRequired
  },
  render: function() {
    var dayLinkClass = cx({
      'tidelineNavLabel': true,
      'active': this.props.chartType === 'daily'
    });

    var weekLinkClass = cx({
      'tidelineNavLabel': true,
      'active': this.props.chartType === 'weekly'
    });

    var mostRecentLinkClass = cx({
      'tidelineNavLabel': true,
      'tidelineNavRightLabel': true,
      'active': this.props.atMostRecent
    });

    var backClass = cx({
      'active': !this.props.inTransition,
      'inactive': this.props.inTransition,
      'hidden': this.props.chartType === 'settings'
    });

    var nextClass = cx({
      'active': !this.props.atMostRecent && !this.props.inTransition,
      'inactive': this.props.atMostRecent || this.props.inTransition,
      'hidden': this.props.chartType === 'settings'
    });

    /* jshint ignore:start */
    return (
      <div className="tidelineNav grid">
        <div className="grid-item one-quarter">
          <div className="grid-item three-eighths">
            <a className={dayLinkClass} onClick={this.props.onClickOneDay}>One Day</a>
          </div>
          <div className="grid-item one-half">
            <a className={weekLinkClass} onClick={this.props.onClickTwoWeeks}>Two Weeks</a>
          </div>
        </div>
        <div className="grid-item one-half" id="tidelineLabel">
          <img src={back} className={backClass} onClick={this.props.onClickBack} />
          <div className="tidelineNavLabelWrapper">
            <span className="tidelineNavLabel">{this.props.title}</span>
          </div>
          <img src={next} className={nextClass} onClick={this.props.onClickNext} />
        </div>
        <div className="grid-item one-quarter">
          <a className={mostRecentLinkClass} onClick={this.props.onClickMostRecent}>Most Recent</a>
        </div>
      </div>
      );
    /* jshint ignore:end */
  }
});

module.exports = TidelineHeader;