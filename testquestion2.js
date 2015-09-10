QUnit.test( "test when an empty array is passed expect flat array to be empty", function( assert ) {
  flatArr=[];
  originalArr=[];
  makeFlatArr(originalArr);
  assert.deepEqual(flatArr,[], "Passed!" );
});

QUnit.test( "test when a nested array is passed expect a flat array", function( assert ) {
  flatArr=[];
  originalArr=[[1,2],[3],4];
  makeFlatArr(originalArr);
  assert.deepEqual(flatArr,[1,2,3,4], "Passed!" );
});

QUnit.test( "test when a nested array with string is passed expect a flat array", function( assert ) {
  flatArr=[];
  originalArr=[['a','b'],['c'],'d'];
  makeFlatArr(originalArr);
  assert.deepEqual(flatArr,['a','b','c','d'], "Passed!" );
});

QUnit.test( "test when a nested array mix of string and number is passed expect a flat array", function( assert ) {
  flatArr=[];
  originalArr=[['a',2],[1],'d'];
  makeFlatArr(originalArr);
  assert.deepEqual(flatArr,['a',2,1,'d'], "Passed!" );
});