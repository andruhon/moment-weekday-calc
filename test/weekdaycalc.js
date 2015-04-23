if ( typeof require !== 'undefined' )
{
  moment = require('moment');
  expect = require("chai").expect
  require('../moment.weekdaycalc');
}

describe('Sanity check', function(){
  it('Check that plugin is attached to the momentjs',function(){
    expect(moment().weekdaycalc).to.a('function');
  });
});
