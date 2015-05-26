if ( typeof require !== 'undefined' )
{
  moment = require('moment');
  expect = require("chai").expect;
  require('../moment.weekdaycalc');
}

describe('Sanity check', function(){
  it('plugin is attached to the momentjs',function(){
    expect(moment().weekdaycalc).to.a('function');
  });
});

describe('Syntax check', function(){
  it('3 args',function(){
    expect(moment().weekdaycalc([2015,0,1],[2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('2 args',function(){
    expect(moment([2015,0,1]).weekdaycalc([2015,11,31],[1,2,3,4,5])).to.equal(261);
  });
  it('1 arg',function(){
    expect(moment([2015,0,1]).weekdaycalc([1,2,3,4,5])).to.equal(261);
  });
});
