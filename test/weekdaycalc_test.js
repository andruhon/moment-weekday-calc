if ( typeof require !== 'undefined' )
{
  moment = require('moment');
  expect = require("chai").expect;
  WeekDayCalc = require('../src/moment-weekday-calc');
}

describe('Sanity check', function(){
  it('plugin is attached to the momentjs',function(){
    expect(moment().weekdayCalc).to.a('function');
  });
});

//Please note that month are zero-based in these dates
describe('isoWeekday tests', function(){
  it('4 args',function(){
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],[[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]])).to.equal(258);
  });
  it('3 args',function(){
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
    expect(moment().isoWeekdayCalc([2015,2,14],[2015,2,23],[5])).to.equal(1);
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7])).to.equal(365);
  });
  it('2 args',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('1 arg',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([1,2,3,4,5])).to.equal(261);
  });
  it('1 object arg',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc({
      rangeEnd: [2015,11,31],
      weekdays: [1,2,3,4,5]
    })).to.equal(261);
    expect(moment().isoWeekdayCalc({
      rangeStart: [2015,0,1],
      rangeEnd: [2015,11,31],
      weekdays: [1,2,3,4,5]
    })).to.equal(261);
    expect(moment().isoWeekdayCalc({
      rangeStart: [2015,0,1],
      rangeEnd: [2015,11,31],
      weekdays: [1,2,3,4,5,6,7],
      exclusions: [[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]]
    })).to.equal(361);
  });
});

describe('Locale aware tests', function(){
  it('4 args',function(){
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],[[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]])).to.equal(258);
  });
  it('3 args',function(){
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
    expect(moment().weekdayCalc([2015,2,14],[2015,2,23],[5])).to.equal(1);
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[0,1,2,3,4,5,6])).to.equal(365);
    expect(moment().weekdayCalc([2001,0,1],[2015,11,31],[0,1,2,3,4,5,6])).to.equal(5478);
  });
  it('2 args',function(){
    expect(moment([2015,0,1]).weekdayCalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('1 arg',function(){
    expect(moment([2015,0,1]).weekdayCalc([1,2,3,4,5])).to.equal(261);
  });
  it('1 object arg',function(){
    expect(moment([2015,0,1]).weekdayCalc({
      rangeEnd: [2015,11,31],
      weekdays: [1,2,3,4,5]
    })).to.equal(261);
    expect(moment().weekdayCalc({
      rangeStart: [2015,0,1],
      rangeEnd: [2015,11,31],
      weekdays: [1,2,3,4,5]
    })).to.equal(261);
    expect(moment().weekdayCalc({
      rangeStart: [2015,0,1],
      rangeEnd: [2015,11,31],
      weekdays: [0,1,2,3,4,5,6],
      exclusions: [[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]]
    })).to.equal(361);
  });
});

describe('Weekdays validation', function(){
  it('Duplicate',function(){
    var duplicate = function(){
      return moment([2015,0,1]).weekdayCalc([2015,11,31],[5,5,5]);
    };
    expect(duplicate).to.throw(/duplicate/);
  });
  it('Out of range',function(){
    var duplicate = function(){
      return new WeekDayCalc([2015,0,1],[2015,11,31],[-1],null,true);
    };
    expect(duplicate).to.throw(/weekday is out of/);
  });
  it('Start after end',function(){
    var duplicate = function(){
      return new WeekDayCalc([2015,0,1],[2014,11,31],[1,2,3,4,5],null,true);
    };
    expect(duplicate).to.throw(/rangeStart is after rangeEnd/);
  });
});


describe('standalone test', function(){
  it('3 args',function(){
    var calc = new WeekDayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],null,true);
    expect(calc.calculate()).to.equal(261);
  });
});
