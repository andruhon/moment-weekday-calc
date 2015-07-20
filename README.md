# Moment Weekday Calculator plugin
This plugin will count specific weekdays in the range.

# Usage
Count all weekdays in the range:  
```moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[0,1,2,3,4,5,6]); //366, here Sunday is 0```  
```moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5,6,7]); //366, here Sunday is 7```  
please notice that **weekdays in the array must be integers**, NOT strings like '1', '2'

Count all Monday to Friday workdays of 2015-2016 financial year:  
```moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]); //262```  
```moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]); //262```

Count all Monday to Friday workdays except particular holidays:  
```moment().weekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5],['6 Apr 2015','7 Apr 2015']); //260```  
```moment().isoWeekdayCalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5],['6 Apr 2015','7 Apr 2015']); //260```
```JavaScript
moment().weekdayCalc({  
  rangeStart: '1 Apr 2015',  
  rangeEnd: '31 Mar 2016',  
  weekdays: [1,2,3,4,5],  
  exclusions: ['6 Apr 2015','7 Apr 2015']  
}) //260
```
```JavaScript
moment().isoWeekdayCalc({  
  rangeStart: '1 Apr 2015',  
  rangeEnd: '31 Mar 2016',  
  weekdays: [1,2,3,4,5],  
  exclusions: ['6 Apr 2015','7 Apr 2015']  
}) //260
```


Count all Mondays and Tuesdays of 2015 calendar year:  
```moment('2015').weekdayCalc([1,2]); //104```  
```moment('2015').isoWeekdayCalc([1,2]); //104 ```

Count all Fridays in the range:  
```moment('14 Feb 2014').weekdayCalc('23 Feb 2014',[5]); //2 ```  
```moment('14 Feb 2014').isoWeekdayCalc('23 Feb 2014',[5]); //2 ```  


Node "Standalone" usage (it is not actually standalone, just uses moment as inner dependency):  
```WeekDayCalc = require('moment-weekday-calc);```  
```var useIsoWeekdays = true;```  
```var exclusions = ['6 Apr 2015','7 Apr 2015'];```  
```var calc = new WeekDayCalc('1 Jan 2015', '31 Dec 2015', [1,2,3,4,5,6,7], useIsoWeekdays);```  
```var result = calc.calculate(); //363```  

#Installation

##NPM
```npm install moment-weekday-calc```

##Bower
```bower install moment-weekday-calc```

# Syntax
## iso weekdays weekdayCalc
Calculate specified weekdays for dates range excluding particular dates:  
```moment().isoWeekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array, exclusions Array);```

Calculate specified weekdays for dates range:  
```moment().isoWeekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for dates range:  
```moment(rangeStart moment|Date|String).weekdayCalc(rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for the whole current calendar year:  
```moment().isoWeekdayCalc(weekdays Array);```

Calculate specified weekdays for dates range excluding particular dates (object config):  
```moment().isoWeekdayCalc({
  rangeStart: moment|Date|String, //optional  
  rangeEnd: moment|Date|String, //required  
  weekdays: weekdays Array, //required  
  exclusions: exclusions Array //optional  
});```

**rangeStart** - the range start

**rangeEnd** - the range end

**weekdays** - array of iso weekdays as integers to count [1, 2, 3, 4, 5, 6, 7], 1 is always Monday 7 is always Sunday

**exclusions** - array of dates to exclude, any moment() acceptable date


## locale aware weekdayCalc
Calculate specified weekdays for dates range excluding particular dates:  
```moment().weekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array, exclusions Array);```

Calculate specified weekdays for dates range:  
```moment().weekdayCalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for dates range:  
```moment(rangeStart moment|Date|String).weekdayCalc(rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for the whole current calendar year:  
```moment().weekdayCalc(weekdays Array);```

Calculate specified weekdays for dates range excluding particular dates (object config):  
```moment().weekdayCalc({
  rangeStart: moment|Date|String, //optional  
  rangeEnd: moment|Date|String, //required  
  weekdays: weekdays Array, //required  
  exclusions: exclusions Array //optional  
});```

**rangeStart** - the range start

**rangeEnd** - the range end

**weekdays** - array of locale aware weekday numbers as integers, for example [1, 2, 3]
please notice that range may be 1-7 or 0-6 depending on locale,
Sunday may be 0 or 7, depending on locale, monday is usualy 1

**exclusions** - array of dates to exclude, any moment() acceptable date

Please be aware that you may receive unexpected results if you use weekdays not matching your locale,
for example, if your locale weekdays range is 0-6:  
```moment().weekdayCalc('1 Jan 2015','31 Dec 2015',[1,2,3,4,5,6,7]);```// will throw new WeekDayCalcException("The weekday is out of 0 to 6 range")

Please visit http://momentjs.com/docs/#/get-set/weekday/ for MomentJS reference.
