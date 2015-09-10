// language used is javascript
var originalArr=[[1,2],[3],4];
var flatArr=[];
var makeFlatArr=function(arr){
	arr.forEach(function(val){
		if(Array.isArray(val)){
			makeFlatArr(val);
		}else{
			flatArr.push(val);
		}
	})
}