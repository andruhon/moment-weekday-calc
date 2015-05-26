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

**weekdays** - array of locale aware weekday numbers for example [1, 2, 3]
please notice that it may be 1-7 or 0-6 depending on locale



# Usage
