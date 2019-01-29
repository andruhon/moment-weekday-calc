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

describe('Mutations check', function(){
    it('weekdaysFromSetToCalendarDays does not mutate weekdays and exclusions',function(){
        var excl = ['2015-10-01', '2015-10-02'];
        var wdays = [3,4,5,6,7];
        moment('2015-10-05').isoWeekdaysFromSetToCalendarDays({
          'workdays': -11,
          'weekdays': wdays,
          'exclusions': excl
        });
        expect(excl).to.not.be.a('undefined');
        expect(excl.length).to.be.equal(2);
        expect(excl).to.include.members(['2015-10-01','2015-10-02']);
        expect(wdays).to.not.be.a('undefined');
        expect(wdays.length).to.be.equal(5);
        expect(wdays).to.include.members([3,4,5,6,7]);
    });

    it('weekDayCalc does not mutate weekdays and exclusions', function(){
        var excl = ['2015-10-01', '2015-10-02'];
        var wdays = [3,4,5,6,7];
        moment().isoWeekdayCalc({
          rangeStart: [2015,9,25],
          rangeEnd: [2015,10,20],
          weekdays: wdays,
          exclusions: excl
        })
        expect(excl).to.not.be.a('undefined');
        expect(excl.length).to.be.equal(2);
        expect(excl).to.include.members(['2015-10-01','2015-10-02']);
    })

});

//Please note that month are zero-based in these dates
describe('isoWeekday WeekdayCalc tests', function(){
  it('works with 4 args',function(){
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],[[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]])).to.equal(258);
  });
  it('works with 3 args',function(){
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
    expect(moment().isoWeekdayCalc([2015,2,14],[2015,2,23],[5])).to.equal(1);
    expect(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7])).to.equal(365);
  });
  it('works with 2 args',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('works with 1 arg',function(){
    expect(moment([2015,0,1]).isoWeekdayCalc([1,2,3,4,5])).to.equal(261);
  });
  it('works with 1 object arg',function(){
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
  it('works with 4 args',function(){
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5],[[2015,6,6],[2015,6,7],[2015,6,1],[2015,11,26]])).to.equal(258);
  });
  it('works with 3 args',function(){
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
    expect(moment().weekdayCalc([2015,2,14],[2015,2,23],[5])).to.equal(1);
    expect(moment().weekdayCalc([2015,0,1],[2015,11,31],[0,1,2,3,4,5,6])).to.equal(365);
    expect(moment().weekdayCalc([2001,0,1],[2015,11,31],[0,1,2,3,4,5,6])).to.equal(5478);
  });
  it('works with 2 args',function(){
    expect(moment([2015,0,1]).weekdayCalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('works with 1 arg',function(){
    expect(moment([2015,0,1]).weekdayCalc([1,2,3,4,5])).to.equal(261);
  });
  it('works with 1 object arg',function(){
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
      return new WeekDayCalc([2015,0,1],[2015,11,31],[-1],null,null,true);
    };
    expect(except).to.throw(/weekday is out of/);
  });
  it('Start after end',function(){
    var except = function(){
      return new WeekDayCalc([2015,0,1],[2014,11,31],[1,2,3,4,5],null,null,true);
    };
    expect(except).to.throw(/rangeStart is after rangeEnd/);
  });
});

describe('standalone WeekdayCalc test', function(){
  it('works with 3 args',function(){
    var calc = new WeekDayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5]);
    expect(calc.calculate()).to.equal(261);
  });
});

describe('DaysSetConverter tests', function(){
  it('add workdays',function(){
    /* add */
    expect(moment('2015-08-19').addWorkdays(5).format('YYYY-MM-DD')).to.equal('2015-08-26');
    expect(moment('2015-08-19').addWorkdays(10, ['2015-08-26']).format('YYYY-MM-DD')).to.equal('2015-09-03');
    /* subtract */
    expect(moment('2015-09-21').addWorkdays(-5).format('YYYY-MM-DD')).to.equal('2015-09-14');
    expect(moment('2015-09-21').addWorkdays(-10, ['2015-09-14']).format('YYYY-MM-DD')).to.equal('2015-09-04');
  });
  it('workdays to calendar days',function(){
    /* add */
    expect(moment('2015-08-19').workdaysToCalendarDays(5)).to.equal(7);
    expect(moment('2015-08-19').workdaysToCalendarDays(10, ['2015-08-26'])).to.equal(15);
    /* subtract */
    expect(moment('2015-11-20').workdaysToCalendarDays(-5)).to.equal(-7);
    expect(moment('2015-08-19').workdaysToCalendarDays(-10, ['2015-08-18'])).to.equal(-15);
  });
  it('add days from set',function(){
    /* add */
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
    /* subtract */
    expect(moment('2015-08-19').addWeekdaysFromSet(-5, [1,2,3,4,5,6]).format('YYYY-MM-DD')).to.equal('2015-08-13');
    expect(moment('2015-05-04').isoAddWeekdaysFromSet(-5, [1,2,3,4,5,6], ['2015-05-01']).format('YYYY-MM-DD')).to.equal('2015-04-27');
    expect(moment('2015-02-02').isoAddWeekdaysFromSet(-5, [1,2,3,4,5,7]).format('YYYY-MM-DD')).to.equal('2015-01-27');
    expect(moment('2015-02-16').isoAddWeekdaysFromSet({
      'days': -19,
      'exclusions': ['2015-02-15','2015-02-10'],
      'weekdays': [2,4,5,7]
    }).format('YYYY-MM-DD')).to.equal('2015-01-11');
  });
  it('days from set to calendar days',function(){
    /* add */
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
    /* subtract */
    expect(moment('2015-08-19').weekdaysFromSetToCalendarDays(-5,[1,2,3,4,5])).to.equal(-7);
    expect(moment('2015-10-05').weekdaysFromSetToCalendarDays(-1,[1],['2015-09-28'])).to.equal(-14);
    expect(moment('2015-10-05').weekdaysFromSetToCalendarDays(-11,[0,3,4,5,6])).to.equal(-15);
    expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays(-11,[3,4,5,6,7])).to.equal(-15);
    expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays({
      'workdays': -11,
      'weekdays': [3,4,5,6,7],
      'exclusions': ['2015-10-01']
    })).to.equal(-16);
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

describe('Get an array of dates', function(){
  it('try dates list',function(){
    var datesCount = moment().weekdayCalc({
      rangeStart: [2017,10,2],
      rangeEnd: [2018,1,21],
      weekdays: [1,2,3,4,5]
    });
    var dates = moment().dateRangeToDates({
      rangeStart: [2017,10,2],
      rangeEnd: [2018,1,21],
      weekdays: [1,2,3,4,5]
    });
    expect(dates.length).to.equal(datesCount);
    expect(dates.map(function(d){return d.format("YYYY-MM-DD")})).to.deep.equal([
      "2017-11-02", "2017-11-03", "2017-11-06", "2017-11-07", "2017-11-08", "2017-11-09", "2017-11-10", "2017-11-13", "2017-11-14", "2017-11-15", "2017-11-16", "2017-11-17", "2017-11-20", "2017-11-21", "2017-11-22", "2017-11-23", "2017-11-24", "2017-11-27", "2017-11-28", "2017-11-29", "2017-11-30", "2017-12-01", "2017-12-04", "2017-12-05", "2017-12-06", "2017-12-07", "2017-12-08", "2017-12-11", "2017-12-12", "2017-12-13", "2017-12-14", "2017-12-15", "2017-12-18", "2017-12-19", "2017-12-20", "2017-12-21", "2017-12-22", "2017-12-25", "2017-12-26", "2017-12-27", "2017-12-28", "2017-12-29", "2018-01-01", "2018-01-02", "2018-01-03", "2018-01-04", "2018-01-05", "2018-01-08", "2018-01-09", "2018-01-10", "2018-01-11", "2018-01-12", "2018-01-15", "2018-01-16", "2018-01-17", "2018-01-18", "2018-01-19", "2018-01-22", "2018-01-23", "2018-01-24", "2018-01-25", "2018-01-26", "2018-01-29", "2018-01-30", "2018-01-31", "2018-02-01", "2018-02-02", "2018-02-05", "2018-02-06", "2018-02-07", "2018-02-08", "2018-02-09", "2018-02-12", "2018-02-13", "2018-02-14", "2018-02-15", "2018-02-16", "2018-02-19", "2018-02-20", "2018-02-21"
    ]);
  });
});
