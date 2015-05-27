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

describe('isoWeekday tests', function(){
  it('3 args',function(){
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
    expect(moment().isoWeekdayCalc([2015,2,14],[2015,2,23],[5])).to.equal(1);
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7])).to.equal(365);
    expect(moment().isoWeekdayCalc([2001,0,1],[2015,11,31],[1,2,3,4,5,6,7])).to.equal(5478);
  });
  it('2 args',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('1 arg',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([1,2,3,4,5])).to.equal(261);
  });
});

describe('Locale aware tests', function(){
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
});

describe('standalone test', function(){
  it('3 args',function(){
    var calc = new WeekDayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],true);
    expect(calc.calculate()).to.equal(261);
  });
});
