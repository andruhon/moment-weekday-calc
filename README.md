**Still in process but it's already usible, see tests for usage examples**

# Moment Weekday Calculator plugin
This plugin will count specific weekdays in the range.

# Syntax
Calculate specified weekdays for dates range: 
```moment().weekdaycalc(rangeStart moment|Date|String, rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for dates range: 
```moment(rangeStart moment|Date|String).weekdaycalc(rangeEnd moment|Date|String, weekdays Array);```

Calculate specified weekdays for the whole current calendar year: 
```moment().weekdaycalc(weekdays Array);```

**rangeStart** - the range start

**rangeEnd** - the range end

**weekdays** - array of locale aware weekday numbers, for example [1, 2, 3]
please notice that range may be 1-7 or 0-6 depending on locale,
Sunday may be 0 or 7, depending on locale, monday is usualy 1

Please be aware that you may receive unexpected results if you use weekdays not matching your locale,
for example, if your locale weekdays range is 0-6
```moment().weekdaycalc('1 Jan 2015','31 Dec 2015',[1,2,3,4,5,6,7]);```//returns 364
It happens because 7 here is a 'next monday', not sunday, and the last 'next' monday is out of the range, so one day of the year is not properly counted. Please visit http://momentjs.com/docs/#/get-set/weekday/ for reference.

# Usage
//Count all Monday to Friday days of 2015-2016 financial year:
```moment().weekdaycalc('1 Apr 2015','31 Mar 2016',[1,2,3,4,5]); ```

//Count all Mondays and Tuesdays of 2015 calendar year
```moment('2015').weekdaycalc([1,2]); ```

//Count all Fridays in the range
```moment('14 Feb 2014').weekdaycalc('23 Feb 2014',[5]); ```
