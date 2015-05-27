//node ./example_standalone_node.js
//moment is actually included as internal weekday-calc dependency
WeekDayCalc = require('moment-weekday-calc');

var useIsoWeekday = true;
var calc = new WeekDayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7],useIsoWeekday);
console.log(calc.calculate());