if ( typeof require !== 'undefined' )
{
  moment = require('moment');
}

function WeekDayCalc (rangeStart,rangeEnd,weekdays) {
  this.rangeStart = moment(rangeStart);
  this.rangeEnd = moment(rangeEnd);
  this.weekdays = weekdays;
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
      /* a little optimisation for longer time intervals - will it work faster? Don't know. */
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
      if (weekdays.indexOf(day.weekday())>=0) {
        weekDaysCount++;
      }
      day.add(1,'day');
    }
    return weekDaysCount;
};

function WeekDayCalcException (message) {
  this.message = message;
  this.name = 'WeekDayCalcException';
}

;(function(moment) {
  moment.fn.weekdaycalc = function(){
    var rangeStart, rangeEnd, weekdays;
    switch (arguments.length) {
      case 3:
        rangeStart = moment(arguments[0]).startOf('day');
        rangeEnd = moment(arguments[1]).endOf('day');
        weekdays = arguments[2];
        break;
      case 2:
        rangeStart = this;
        rangeEnd = arguments[0];
        weekdays = arguments[1];
        break;
      case 1:
        rangeStart = this.clone().startOf('year');
        rangeEnd = this.clone().endOf('year');
        weekdays = arguments[0];
        break;
      default:
        WeekDayCalcException('unexpected arguments length '+arguments.length+'. Expecting 1 to 3 args');
    }
    if(rangeStart.isAfter(rangeEnd)) {
      var trueEnd  = rangeStart.clone();
      rangeStart = rangeEnd.clone();
      rangeEnd = trueEnd;
    }
    var calc = new WeekDayCalc(rangeStart,rangeEnd,weekdays);
    return calc.calculate();
  };
})(moment);
