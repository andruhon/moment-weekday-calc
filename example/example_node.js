//node ./example_node.js
moment = require('moment');
require('moment-weekday-calc');

console.log(moment().isoWeekdayCalc([2015,0,1],[2015,11,31],[1,2,3,4,5,6,7]));
