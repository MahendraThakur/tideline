/* 
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 * 
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

var d3 = require('../lib/').d3;
var _ = require('../lib/')._;

var log = require('../lib/').bows('Message');

module.exports = function(pool, opts) {

  opts = opts || {};

  var defaults = {
    imagesBaseUrl: pool.imagesBaseUrl()
  };

  _.defaults(opts, defaults);

  function cbg(selection) {
    opts.xScale = pool.xScale().copy();
    selection.each(function(currentData) {
      var messages = d3.select(this)
        .selectAll('image')
        .data(currentData, function(d) {
          if (d.parentMessage === '') {
            return d._id;
          }
        });
      var messageGroups = messages.enter()
        .append('g')
        .attr('class', 'd3-message-group');
      messageGroups.append('rect')
        .attr({
          'x': function(d) {
            return opts.xScale(Date.parse(d.normalTime)) - opts.size / 2 - 4;
          },
          'y': pool.height() / 2 - opts.size / 2 - 4,
          'width': opts.size + 8,
          'height': opts.size + 8,
          'class': 'd3-rect-message hidden'
        });
      messageGroups.append('image')
        .attr({
          'xlink:href': opts.imagesBaseUrl + '/message/post_it.svg',
          'x': function(d) {
            return opts.xScale(Date.parse(d.normalTime)) - opts.size / 2;
          },
          'y': pool.height() / 2 - opts.size / 2,
          'width': opts.size,
          'height': opts.size,
          'id': function(d) {
            return 'message_' + d._id;
          }
        })
        .classed({'d3-image': true, 'd3-message': true});
      messageGroups.on('click', function(d) {
        d3.event.stopPropagation(); // silence the click-and-drag listener
        opts.emitter.emit('messageThread', d._id);
        log('Message clicked!');
        d3.select(this).selectAll('.d3-rect-message').classed('hidden', false);
      });
      messages.exit().remove();
    });
  }

  return cbg;
};