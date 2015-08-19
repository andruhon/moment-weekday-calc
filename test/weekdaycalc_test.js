if ( typeof require !== 'undefined' )
{
  moment = require('moment');
  expect = require("chai").expect;
  WeekDayCalc = require('../src/moment-weekday-calc');
}

describe('Sanity check', function(){
  it('plugin is attached to the momentjs',function(){
    expect(moment().weekdayCalc).to.a('function');
    expect(moment().isoWeekdayCalc).to.a('function');
    expect(moment().addWorkdays).to.a('function');
    expect(moment().addWeekdaysFromSet).to.a('function');
    expect(moment().workdaysToCalendarDays).to.a('function');
    expect(moment().weekdaysFromSetToCalendarDays).to.a('function');
    expect(moment().isoAddWeekdaysFromSet).to.a('function');
    expect(moment().isoWeekdaysFromSetToCalendarDays).to.a('function');
  });
});

//Please note that month are zero-based in these dates
describe('isoWeekday WeekdayCalc tests', function(){
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

describe('Locale aware WeekdayCalc tests', function(){
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

describe('Weekdays WeekdayCalc validation', function(){
  it('Duplicate',function(){
    var except = function(){
      return moment([2015,0,1]).weekdayCalc([2015,11,31],[5,5,5]);
    };
    expect(except).to.throw(/duplicate/);
  });
  it('Out of range',function(){
    var except = function(){
      return new WeekDayCalc([2015,0,1],[2015,11,31],[-1],null,true);
    };
    expect(except).to.throw(/weekday is out of/);
  });
  it('Start after end',function(){
    var except = function(){
      return new WeekDayCalc([2015,0,1],[2014,11,31],[1,2,3,4,5],null,true);
    };
    expect(except).to.throw(/rangeStart is after rangeEnd/);
  });
});

describe('standalone WeekdayCalc test', function(){
  it('3 args',function(){
    var calc = new WeekDayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],null,true);
    expect(calc.calculate()).to.equal(261);
  });
});

describe('DaysSetConverter tests', function(){
  it('add workdays',function(){
    expect(moment('2015-08-19').addWorkdays(5).format('YYYY-MM-DD')).to.equal('2015-08-26');
    expect(moment('2015-08-19').addWorkdays(10, ['2015-08-26']).format('YYYY-MM-DD')).to.equal('2015-09-03');
  });
  it('workdays to calendar days',function(){
    expect(moment('2015-08-19').workdaysToCalendarDays(5)).to.equal(7);
    expect(moment('2015-08-19').workdaysToCalendarDays(10, ['2015-08-26'])).to.equal(15);
  });
  it('add days from set',function(){
    expect(moment('2015-08-19').addWeekdaysFromSet(5, [1,2,3,4,5,6]).format('YYYY-MM-DD')).to.equal('2015-08-25');
    expect(moment('2015-02-02').addWeekdaysFromSet(5, [0,1,2,3,4,5]).format('YYYY-MM-DD')).to.equal('2015-02-08');
    expect(moment('2015-02-02').isoAddWeekdaysFromSet(5, [1,2,3,4,5,7]).format('YYYY-MM-DD')).to.equal('2015-02-08');
    expect(moment('2015-05-04').isoAddWeekdaysFromSet(5, [1,2,3,4,5,6], ['2015-05-09']).format('YYYY-MM-DD')).to.equal('2015-05-11');
    expect(moment('2015-02-16').isoAddWeekdaysFromSet({
      'workdays': 19,
      'exclusions': ['2015-02-23','2015-03-08']
    }).format('YYYY-MM-DD')).to.equal('2015-03-16');
    expect(moment('2015-02-16').isoAddWeekdaysFromSet({
      'workdays': 19,
      'exclusions': ['2015-02-23','2015-03-08'],
      'weekdays': [2,4,5,7]
    }).format('YYYY-MM-DD')).to.equal('2015-03-22');
    expect(moment('2015-02-16').isoAddWeekdaysFromSet({
      'days': 19,
      'exclusions': ['2015-02-23','2015-03-08'],
      'weekdays': [2,4,5,7]
    }).format('YYYY-MM-DD')).to.equal('2015-03-22');
  });
  it('days from set to calendar days',function(){
    expect(moment('2015-08-19').weekdaysFromSetToCalendarDays(5,[1,2,3,4,5])).to.equal(7);
    expect(moment('2015-10-05').weekdaysFromSetToCalendarDays(1,[1])).to.equal(7);
    expect(moment('2015-10-05').weekdaysFromSetToCalendarDays(1,[1],['2015-10-12'])).to.equal(14);
    expect(moment('2015-10-05').weekdaysFromSetToCalendarDays(11,[0,3,4,5,6])).to.equal(16);
    expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays(11,[3,4,5,6,7])).to.equal(16);
    expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays({
      'workdays': 11,
      'weekdays': [3,4,5,6,7],
      'exclusions': ['2015-10-15']
    })).to.equal(17);
  });
});

describe('DaysSetConverter validation', function() {
  it('Duplicate', function () {
    var except = function () {
      return moment([2015, 0, 1]).addWeekdaysFromSet(5, [5, 5, 5]);
    };
    expect(except).to.throw(/duplicate/);
  });
  it('Out of range',function(){
    var except = function(){
      return moment([2015, 0, 1]).addWeekdaysFromSet(5, [-1, 12]);
    };
    expect(except).to.throw(/weekday is out of/);
  });
  it('days and workdays together',function(){
    var except = function(){
      return moment('2015-02-16').isoAddWeekdaysFromSet({
        'days': 19,
        'workdays': 22,
        'exclusions': ['2015-02-23','2015-03-08'],
        'weekdays': [2,4,5,7]
      });
    };
    expect(except).to.throw(/days and weekdays args should not be used together/);
  });
});

