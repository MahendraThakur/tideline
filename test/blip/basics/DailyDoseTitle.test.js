/* global chai */
/* global sinon */

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = chai.expect;

var DailyDoseTitle = require('../../../plugins/blip/basics/components/misc/DailyDoseTitle');

describe('DailyDoseTitle', function () {

  it('should be a function', function() {
    expect(DailyDoseTitle).to.be.a('function');
  });

  describe('render', function() {
    it('should render and show 3 warning messages for missing props', function () {
      console.error = sinon.stub();
      var elem = TestUtils.renderIntoDocument(<DailyDoseTitle/>);
      expect(console.error.callCount).to.equal(3);
    });

    it('should render without problem when props provided', function () {
      console.error = sinon.stub();

      var props = {
        data: {
          weight: 30,
          totalDailyDose: 46
        },
        iconClass: 'icon-down',
        sectionName: 'ace'
      };

      var elem = TestUtils.renderIntoDocument(
        <DailyDoseTitle 
          data={props.data}
          iconClass={props.iconClass}
          sectionName={props.sectionName} />
      );
      expect(console.error.callCount).to.equal(0);
      
      // actual rendered text is modified version of input 'note'
      var headerElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDoseTitle');
      expect(headerElem).to.be.ok;
    });

    it('should render total daily dose / kg when weight set', function () {
      var props = {
        data: {
          weight: 100,
          totalDailyDose: 11
        },
        iconClass: 'icon-down',
        sectionName: 'ace'
      };

      var elem = TestUtils.renderIntoDocument(
        <DailyDoseTitle 
          data={props.data}
          iconClass={props.iconClass}
          sectionName={props.sectionName} />
      );
      

      // actual rendered text is modified version of input 'note'
      var headerElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDoseTitle');
      expect(headerElem).to.be.ok;

      // actual rendered text is modified version of input 'note'
      var titleElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDoseTitle-label');
      expect(React.findDOMNode(titleElem).textContent).to.equal('Total daily dose / kg');

      // actual rendered text is modified version of input 'note'
      var inputElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDose-text--large');
      expect(React.findDOMNode(inputElem).textContent).to.equal('0.11');
    });

    it('should render avg total daily dose when no weight set', function () {

      var props = {
        data: {
          totalDailyDose: 11
        },
        iconClass: 'icon-down',
        sectionName: 'ace'
      };

      var elem = TestUtils.renderIntoDocument(
        <DailyDoseTitle 
          data={props.data}
          iconClass={props.iconClass}
          sectionName={props.sectionName} />
      );
      

      // actual rendered text is modified version of input 'note'
      var headerElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDoseTitle');
      expect(headerElem).to.be.ok;

      // actual rendered text is modified version of input 'note'
      var titleElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDoseTitle-label');
      expect(React.findDOMNode(titleElem).textContent).to.equal('Avg total daily dose');

      // actual rendered text is modified version of input 'note'
      var inputElem = TestUtils.findRenderedDOMComponentWithClass(elem, 'DailyDose-text--large');
      expect(React.findDOMNode(inputElem).textContent).to.equal('11.0');
    });
  });
});