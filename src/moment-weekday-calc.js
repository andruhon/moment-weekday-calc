/**
 * Weekdays calculator
 * @author Andrei Kondratev [andrew@kondratev.pro]
 */
;if ( typeof require !== 'undefined' )
{
  moment = require('moment');
}
(function(moment) {

  function WeekDayCalc (rangeStart,rangeEnd,weekdays,exclusions,useIsoWeekday) {
    this.rangeStart = moment(rangeStart);
    this.rangeEnd = moment(rangeEnd);
    this.exclusions = exclusions;
    this.useIsoWeekday = (useIsoWeekday==true);
    if(this.rangeStart.isAfter(this.rangeEnd)) {
      throw new WeekDayCalcException('rangeStart is after rangeEnd');
    }
    this.weekdays = this.parseWeekdays(weekdays);
  }

  WeekDayCalc.prototype.parseWeekdays = function(weekdays) {
    var validWeekdays = [];
    if (!weekdays) {
      throw new WeekDayCalcException('weekdays must be defined');
    }
    if (weekdays.length > 7) {
      throw new WeekDayCalcException("Weekdays array exceeding week length of 7 days");
    }
    for (var i=0;i<weekdays.length;i++) {
      var weekday = weekdays[i];
      if (this.useIsoWeekday) {
        if (isNaN(weekday)) throw new WeekDayCalcException("isoWeekDayCalc accepts weekdays as numbers only, try using weekdayCalc if you need a locale aware behaviour");
        if (weekday<1 || weekday>7) throw new WeekDayCalcException("The weekday is out of 1 to 7 range");
      } else if(!isNaN(weekday)){
        if (weekday<0 || weekday>6) throw new WeekDayCalcException("The weekday is out of 0 to 6 range");
      } else {
        weekday = moment().day(weekday).weekday();
      }
      if (validWeekdays.indexOf(weekday)>=0) {
        throw new WeekDayCalcException("Weekdays set contains duplicate weekday");
      }
      validWeekdays.push(weekday);
    }
    return validWeekdays;
  };

  WeekDayCalc.prototype.calculate = function() {
    var weekDaysCount = 0;
    var rangeStartWeekEnd = this.rangeStart.clone().endOf('week');
    var rangeEndWeekStart = this.rangeEnd.clone().startOf('week');

    if (rangeEndWeekStart.diff(rangeStartWeekEnd,'days')<30 || this.exclusions) {
      weekDaysCount = this.calculateIterative(this.rangeStart,this.rangeEnd,this.weekdays,this.exclusions);
    } else {
      /* a little optimisation for longer time intervals - it works faster with intervals longer than one year */
      var wholeWeeksDiff = Math.round(rangeEndWeekStart.diff(rangeStartWeekEnd,'weeks',true));
      weekDaysCount += wholeWeeksDiff*this.weekdays.length;
      weekDaysCount += this.calculateIterative(this.rangeStart,rangeStartWeekEnd,this.weekdays);
      weekDaysCount += this.calculateIterative(rangeEndWeekStart,this.rangeEnd,this.weekdays);
    }

    return weekDaysCount;
  };

  WeekDayCalc.prototype.calculateIterative = function(rangeStart,rangeEnd,weekdays,exclusions) {
    var weekDaysCount = 0, day = rangeStart.clone();
    var str_exclusions = [];
    if (exclusions) {
      while(exclusions.length>0) {
        str_exclusions.push(moment(exclusions.shift()).format("YYYY-MM-DD"));
      }
    }

    while(day.valueOf()<=rangeEnd.valueOf()) {
      var weekdayFunc = this.useIsoWeekday?'isoWeekday':'weekday';
      if ( (weekdays.indexOf(day[weekdayFunc]())>=0) && (str_exclusions.length==0 || str_exclusions.indexOf(day.format("YYYY-MM-DD"))<0) ) {
        weekDaysCount++;
      }
      day.add(1, 'day');
    }
    return weekDaysCount;
  };

  Function.prototype.construct = function(aArgs) {
    var fConstructor = this, fNewConstr = function() { fConstructor.apply(this, aArgs); };
    fNewConstr.prototype = fConstructor.prototype;
    return new fNewConstr();
  };

  function WeekDayCalcException (message) {
    this.message = message;
    this.name = 'WeekDayCalcException';
  }
  WeekDayCalcException.prototype = new Error;
  WeekDayCalc.prototype.WeekDayCalcException = WeekDayCalcException;

  var extractArgs = function(that, arguments) {
    var rangeStart, rangeEnd, weekdays, exclusions;
    switch (arguments.length) {
      case 4:
        rangeStart = moment(arguments[0]).startOf('day');
        rangeEnd = moment(arguments[1]).endOf('day');
        weekdays = arguments[2];
        exclusions = arguments[3];
        break;
      case 3:
        rangeStart = moment(arguments[0]).startOf('day');
        rangeEnd = moment(arguments[1]).endOf('day');
        weekdays = arguments[2];
        break;
      case 2:
        rangeStart = that;
        rangeEnd = arguments[0];
        weekdays = arguments[1];
        break;
      case 1:
        var arg = arguments[0];
        if (arg && arg.rangeEnd && arg.weekdays) {
          rangeStart = arg.rangeStart ? moment(arg.rangeStart).startOf('day') : that;
          rangeEnd = moment(arg.rangeEnd).endOf('day');
          weekdays = arg.weekdays;
          exclusions = arg.exclusions;
        } else {
          rangeStart = that.clone().startOf('year');
          rangeEnd = that.clone().endOf('year');
          weekdays = arg;
        }
        break;
      default:
        new WeekDayCalcException('unexpected arguments length '+arguments.length+'. Expecting 1 to 4 args');
    }
    if(rangeStart.isAfter(rangeEnd)) {
      var trueEnd  = rangeStart.clone();
      rangeStart = rangeEnd.clone();
      rangeEnd = trueEnd;
    }
    return [rangeStart, rangeEnd, weekdays, exclusions];
  };

  /**
   * Calculate weekdays with locale aware weekdays
   */
  moment.fn.weekdayCalc = function(){
    var calc =  WeekDayCalc.construct(extractArgs(this,arguments));
    return calc.calculate();
  };

  /**
   * Calculate weekdays with moment#isoWeekdays function, where 1 is always monday and 7 is always Sunday
   */
  moment.fn.isoWeekdayCalc = function(){
    var args = extractArgs(this,arguments);
    args.push(true);
    var calc =  WeekDayCalc.construct(args);
    return calc.calculate();
  };

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = WeekDayCalc :
    typeof define === 'function' && define.amd ? define(WeekDayCalc) :
      this.WeekDayCalc = WeekDayCalc;

})(moment);
