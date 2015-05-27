/**
 * Weekdays calculator
 * @author Andrei Kondratev [andrew@kondratev.pro]
 */
;if ( typeof require !== 'undefined' )
{
  moment = require('moment');
}
(function(moment) {

  function WeekDayCalc (rangeStart,rangeEnd,weekdays,useIsoWeekday) {
    this.rangeStart = moment(rangeStart);
    this.rangeEnd = moment(rangeEnd);
    this.weekdays = weekdays;
    this.useIsoWeekday = (useIsoWeekday==true);
    if(this.rangeStart.isAfter(this.rangeEnd)) {
      throw new WeekDayCalcException('rangeStart is after rangeEnd');
    }
    if (!weekdays) {
      throw new WeekDayCalcException('weekdays must be defined');
    }
  }

  WeekDayCalc.prototype.calculate = function() {
    var weekDaysCount = 0;
    var rangeStartWeekEnd = this.rangeStart.clone().endOf('week');
    var rangeEndWeekStart = this.rangeEnd.clone().startOf('week');

    if (rangeEndWeekStart.diff(rangeStartWeekEnd,'days')<30) {
      weekDaysCount = this.calculateIterative(this.rangeStart,this.rangeEnd,this.weekdays);
    } else {
      /* a little optimisation for longer time intervals - it works faster with intervals longer than one year */
      var wholeWeeksDiff = Math.round(rangeEndWeekStart.diff(rangeStartWeekEnd,'weeks',true));
      weekDaysCount += wholeWeeksDiff*this.weekdays.length;
      weekDaysCount += this.calculateIterative(this.rangeStart,rangeStartWeekEnd,this.weekdays);
      weekDaysCount += this.calculateIterative(rangeEndWeekStart,this.rangeEnd,this.weekdays);
    }

    return weekDaysCount;
  };

  WeekDayCalc.prototype.calculateIterative = function(rangeStart,rangeEnd,weekdays) {
    var weekDaysCount = 0, day = rangeStart.clone();

    while(day.valueOf()<=rangeEnd.valueOf()) {
      var weekdayFunc = this.useIsoWeekday?'isoWeekday':'weekday';
      if (weekdays.indexOf(day[weekdayFunc]())>=0) {
        weekDaysCount++;
      }
      day.add(1,'day');
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

  var extractArgs = function(that, arguments) {
    var rangeStart, rangeEnd, weekdays;
    switch (arguments.length) {
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
        rangeStart = that.clone().startOf('year');
        rangeEnd = that.clone().endOf('year');
        weekdays = arguments[0];
        break;
      default:
        new WeekDayCalcException('unexpected arguments length '+arguments.length+'. Expecting 1 to 3 args');
    }
    if(rangeStart.isAfter(rangeEnd)) {
      var trueEnd  = rangeStart.clone();
      rangeStart = rangeEnd.clone();
      rangeEnd = trueEnd;
    }
    return [rangeStart, rangeEnd, weekdays];
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
