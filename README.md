[![Build Status](https://api.travis-ci.org/andruhon/moment-weekday-calc.svg?branch=master)](http://travis-ci.org/andruhon/moment-weekday-calc)

# Moment Weekday Calculator plugin
This plugin will count specific weekdays in the range, calculate how many calendar days in given amount workdays/business days and when is it N working days from now

# Usage
Count all weekdays in the range:  
```JavaScript
moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[0,1,2,3,4,5,6]); //366, here Sunday is 0  
moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5,6,7]); //366, here Sunday is 7  
```
please notice that **weekdays in the array must be integers**, NOT strings like '1', '2'

Count all Monday to Friday workdays of 2015-2016 financial year:  
```JavaScript
moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]); //262  
moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]); //262  
```

Count all Monday to Friday workdays except particular holidays:  
```JavaScript
moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5],['6 Apr 2015','7 Apr 2015'],['10 Apr 2015']); //260  
moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5],['6 Apr 2015','7 Apr 2015'],['10 Apr 2015']); //260  
moment().weekdayCalc({  
  rangeStart: '1 Apr 2015',  
  rangeEnd: '31 Mar 2016',  
  weekdays: [1,2,3,4,5],  
  exclusions: ['6 Apr 2015','7 Apr 2015'],
  inclusions: ['10 Apr 2015']
}) //260
```
```JavaScript
moment().isoWeekdayCalc({  
  rangeStart: '1 Apr 2015',  
  rangeEnd: '31 Mar 2016',  
  weekdays: [1,2,3,4,5],  
  exclusions: ['6 Apr 2015','7 Apr 2015'],
  inclusions: ['10 Apr 2015']
}) //260
```
```JavaScript
moment().weekdayCalc({  
  rangeStart: '1 Apr 2015',  
  rangeEnd: '31 Mar 2016',  
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],  
  exclusions: ['6 Apr 2015','7 Apr 2015'],
  inclusions: ['10 Apr 2015']
}) //260 //It works, however it is recommended to use numerical weekdays
```

Count all Mondays and Tuesdays of 2015 calendar year:  
```JavaScript
moment('2015').weekdayCalc([1,2]); //104  
moment('2015').isoWeekdayCalc([1,2]); //104  
```

Count all Fridays in the range:  
```JavaScript
moment('14 Feb 2014').weekdayCalc('23 Feb 2014',[5]); //2  
moment('14 Feb 2014').isoWeekdayCalc('23 Feb 2014',[5]); //2  
```

It is also **possible to subtract** days with all "add" functions by passing a negative value.  

Calculate when is it 5 business days from now:  
```JavaScript
moment().addWorkdays(5); //Will find a date within 5 business days from now  
```

Calculate when is it 10 business days from 19 Aug 2015, excluding Aug 26:  
```JavaScript
moment('2015-08-19').addWorkdays(10, ['2015-08-26']); //2015-09-03  
```

How many calendar days within 5 business days from 19 Aug:  
```JavaScript
moment('2015-08-19').workdaysToCalendarDays(5); //7  
```

How many calendar days within 10 business days from 19 Aug excluding Aug 26:  
```JavaScript
moment('2015-08-19').workdaysToCalendarDays(10, ['2015-08-26']); //15  
```

Add 5 working days to Feb 2 if Sunday is working day:  
```JavaScript
moment('2015-02-02').addWeekdaysFromSet(5, [0,1,2,3,4,5]); //2015-02-08  
moment('2015-02-02').isoAddWeekdaysFromSet(5, [1,2,3,4,5,7]); //2015-02-08 iso format, sunday is 7  
moment('2015-02-02').isoAddWeekdaysFromSet(-5, [1,2,3,4,5,7]) //2015-01-27  
```

Add 5 working days to May 4 excluding May 9 if Saturday is working day:  
```JavaScript
moment('2015-05-04').isoAddWeekdaysFromSet(5, [1,2,3,4,5,6], ['2015-05-09']); //2015-05-11  
moment('2015-05-04').isoAddWeekdaysFromSet({  
  'workdays': 5,  
  'weekdays': [1,2,3,4,5,6],  
  'exclusions': ['2015-05-09']
}); //2015-05-11  
```

How many calendar days within 11 days from set of We,Th,Fr,Sa,Su from Oct 05:
```JavaScript
moment('2015-10-05').weekdaysFromSetToCalendarDays(11,[0,3,4,5,6]) //16  
moment('2015-10-05').isoWeekdaysFromSetToCalendarDays(11,[3,4,5,6,7]) //16 iso format, sunday is 7  
expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays({  
  'workdays': 11,  
  'weekdays': [3,4,5,6,7]  
}); //16
// Subtract days:  
expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays(-11,[3,4,5,6,7])).to.equal(-15);  
```

How many calendar days within 11 days from set of We,Th,Fr,Sa,Su, excluding Oct 15 from Oct 05:
```JavaScript
moment('2015-10-05').weekdaysFromSetToCalendarDays(11, [0,3,4,5,6], ['2015-10-15']) //17  
moment('2015-10-05').isoWeekdaysFromSetToCalendarDays(11, [3,4,5,6,7], ['2015-10-15']) //17 iso format, sunday is 7  
expect(moment('2015-10-05').isoWeekdaysFromSetToCalendarDays({  
  'workdays': 11,  
  'weekdays': [3,4,5,6,7],  
  'exclusions': ['2015-10-15']  
}); //17  
```

Node.js usage:
```JavaScript
moment = require('moment');     //please note that you should include moment library first
require('moment-weekday-calc');
console.log(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7]));
```

# Installation

## NPM
```npm install moment-weekday-calc```

##Bower
```bower install moment-weekday-calc```

# Syntax
## weekdayCalc
### iso weekdays weekdayCalc
Calculate specified weekdays for dates range excluding particular dates:  
```JavaScript
moment().isoWeekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array, exclusions Array, inclusions Array);
```

Calculate specified weekdays for dates range:  
```JavaScript
moment().isoWeekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array);
```

Calculate specified weekdays for dates range:  
```JavaScript
moment(rangeStart moment|Date|String).weekdayCalc(rangeEnd moment|Date|String, weekdays Array);
```

Calculate specified weekdays for the whole current calendar year:  
```JavaScript
moment().isoWeekdayCalc(weekdays Array);
```

Calculate specified weekdays for dates range excluding particular dates (object config):  
```JavaScript
moment().isoWeekdayCalc({
  rangeStart: moment|Date|String, //optional  
  rangeEnd: moment|Date|String, //required  
  weekdays: weekdays Array, //required  
  exclusions: exclusions Array, //optional
  inclusions: inclusions Array //optional
});
```

**rangeStart** - the range start

**rangeEnd** - the range end

**weekdays** - array of iso weekdays as integers to count [1, 2, 3, 4, 5, 6, 7], 1 is always Monday 7 is always Sunday

**exclusions** - array of dates to exclude, any moment() acceptable date

**inclusions** - array of dates to include, overrides weekdays and exclusions, any moment() acceptable date


### locale aware weekdayCalc
Calculate specified weekdays for dates range excluding particular dates:  
```JavaScript
moment().weekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array, exclusions Array, inclusions Array);
```

Calculate specified weekdays for dates range:  
```JavaScript
moment().weekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array);
```

Calculate specified weekdays for dates range:  
```JavaScript
moment(rangeStart moment|Date|String).weekdayCalc(rangeEnd moment|Date|String, weekdays Array);
```

Calculate specified weekdays for the whole current calendar year:  
```JavaScript
moment().weekdayCalc(weekdays Array);
```

Calculate specified weekdays for dates range excluding particular dates (object config):  
```JavaScript
moment().weekdayCalc({
  rangeStart: moment|Date|String, //optional  
  rangeEnd: moment|Date|String, //required  
  weekdays: weekdays Array, //required  
  exclusions: exclusions Array, //optional
  inclusions: inclusions Array //optional
});
```

**rangeStart** - the range start

**rangeEnd** - the range end

**weekdays** - array of locale aware weekday numbers as integers or locale weekday strings, for example [1, 2, 3]
please notice that range is or 0-6 depending where 0 is Sunday

**exclusions** - array of dates to exclude, any moment() acceptable date

**inclusions** - array of dates to include, overrides weekdays and exclusions, any moment() acceptable date

Please be aware that you may receive unexpected results if you use weekdays not matching your locale,
for example, if your locale weekdays range is 0-6:  
```JavaScript
moment().weekdayCalc('1 Jan 2015','31 Dec 2015',[1,2,3,4,5,6,7]); // will throw new WeekDayCalcException("The weekday is out of 0 to 6 range")
```

Please visit http://momentjs.com/docs/#/get-set/weekday/ for MomentJS reference.

## DaysSetConverter (WorkDays converter)
Get a date of workdaysToAdd from dateStart:  
```JavaScript
moment(dateStart moment|Date|String).addWorkdays(workdaysToAdd int)
```  

Get a date of workdaysToAdd from dateStart excluding dates from exclusions array (except dates from inclusions array):  
```JavaScript
moment(dateStart moment|Date|String).addWorkdays(workdaysToAdd int, exclusions Array, inclusions Array)
```

Convert working/business days into calendar days:  
```JavaScript
moment(dateStart moment|Date|String).workdaysToCalendarDays(workdaysToAdd int)  
moment(dateStart moment|Date|String).workdaysToCalendarDays(workdaysToAdd int, exclusions Array, inclusions Array)
```  

Get a date of workdaysToAdd from dateStart, here workdays are any weekdays from weekdays array:  
```JavaScript
moment(dateStart moment|Date|String).addWeekdaysFromSet(workdaysToAdd int, weekdays Array)  
moment(dateStart moment|Date|String).addWeekdaysFromSet(workdaysToAdd int, weekdays Array, exclusions Array)  
moment(dateStart moment|Date|String).addWeekdaysFromSet({  
  'workdays': int, //required, it is also possible to use 'days' alias  
  'weekdays': weekdays Array, //optional  
  'exclusions': exclusions Array, //optional  
  'inclusions': inclusions Array //optional  
});  
```

The same as above but with weekdays in iso format:
```JavaScript
moment(dateStart moment|Date|String).isoAddWeekdaysFromSet(workdaysToAdd int, weekdays Array)  
moment(dateStart moment|Date|String).isoAddWeekdaysFromSet(workdaysToAdd int, weekdays Array, exclusions Array, inclusions Array)  
moment(dateStart moment|Date|String).isoAddWeekdaysFromSet({  
  'workdays': int, //required, it is also possible to use 'days' alias  
  'weekdays': weekdays Array, //optional  
  'exclusions': exclusions Array, //optional  
  'inclusions': inclusions Array //optional  
})  
```

Convert working/business days into calendar days, here workdays are any weekdays from weekdays array:  
```JavaScript
moment(dateStart moment|Date|String).weekdaysFromSetToCalendarDays(workdaysToAdd int, weekdays Array)  
moment(dateStart moment|Date|String).weekdaysFromSetToCalendarDays(workdaysToAdd int, weekdays Array, exclusions Array, inclusions Array)  
moment(dateStart moment|Date|String).weekdaysFromSetToCalendarDays({  
  'workdays': int, //required, it is also possible to use 'days' alias  
  'weekdays': weekdays Array, //optional  
  'exclusions': exclusions Array, //optional  
  'inclusions': inclusions Array //optional  
})  
```

The same as above but with weekdays in iso format:  
```JavaScript
moment(dateStart moment|Date|String).isoWeekdaysFromSetToCalendarDays(workdaysToAdd int, weekdays Array)  
moment(dateStart moment|Date|String).isoWeekdaysFromSetToCalendarDays(workdaysToAdd int, weekdays Array, exclusions Array, inclusions Array)  
moment(dateStart moment|Date|String).isoWeekdaysFromSetToCalendarDays({  
  'workdays': int, //required, it is also possible to use 'days' alias  
  'weekdays': weekdays Array, //optional  
  'exclusions': exclusions Array, //optional  
  'inclusions': inclusions Array //optional  
})  
```

Get an array of dates:
```JavaScript
moment().dateRangeToDates({
  rangeStart: [2017,10,2],
  rangeEnd: [2018,1,21],
  weekdays: [1,2,3,4,5]
})  
```

**dateStart** - the date from which to start weekdays conversion, it is NOW if omitted  

**weekdays** - array of locale aware weekday numbers range of 0-6 or 1-7 for iso prefixed functions  

**exclusions** - array of dates to exclude, any moment() acceptable date  

**inclusions** - array of dates to include, overrides weekdays and exclusions, any moment() acceptable date  
