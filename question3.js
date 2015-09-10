$( document ).ready(function() {
  // Handler for .ready() called.
  
  /**
   * [radius this field is range for searching the users in KM]
   * @type {Number}
   */
  var radius=100;
  /**
   * [latitute this is latitute of the point to search from]
   * @type {Number}
   */
  var latitute=53.3381985;
  /**
   * [longitute this is longitute of the point to search from]
   * @type {Number}
   */
  var longitute=-6.2592576;
  /**
   * [url this is url to get the list of users]
   * @type {String}
   */
  var url='https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt';

  /**
   * [getJSON this function generates a JSON/array of users for the text string recived through file]
   * @param  {[string]} data [text string]
   * @return {[array]}      [array of users]
   */
  function getJSON(data){
  	var tempArr=[];
  	var result=[];
  	var user;
  	tempArr=data.split('}');
	tempArr.forEach(function(val,index,arr){
		if(val){
			val+="}";
			user=JSON.parse(val);
			result.push(user);
		}
	});
	return result;
  };

  /**
   * [distance calculates diatance between two points in KM]
   * @param  {[number]} lat1 [point 1 latitude]
   * @param  {[number]} lon1 [point 2 longitude]
   * @param  {[number]} lat2 [point 2 latitude]
   * @param  {[number]} lon2 [point 2 longitude]
   * @return {[number]}      [distance between two points]
   */
  function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344;
	return dist
 }

 /**
  * [getInRange this function filters users from the list and returns which falls in range]
  * @param  {[array]} users [list of users]
  * @param  {[number]} lat   [center point lat]
  * @param  {[number]} lon   [center point long]
  * @param  {[number]} range [range to search in km]
  * @return {[array]}       [return filtered list]
  */
 function getInRange(users,lat,lon,range){
 	var dis;
 	var inRangeResults=[];
 	users.forEach(function(user){
 		dis=distance(lat,lon,user.latitude,user.longitude);
 		if(dis<=range){
 			inRangeResults.push(user);
 		}
 	});
 	return inRangeResults;
 }


/**
 * [onGetUserSuccess this is success handler for getUsers ajax call]
 * @param  {[string]} data [text string recivd from call]
 */
 function onGetUserSuccess(data){
 	 var users=getJSON(data);
		 var inRangeUsers=getInRange(users,latitute,longitute,radius);
		 inRangeUsers.sort(function(user1,user2){
		 	if(user1.user_id>user2.user_id){
		 		return 1;
		 	}
		 	return -1;
		 })
		 if(inRangeUsers.length){
			  $('#myDiv').append("<ul id='newList'></ul>");
			  inRangeUsers.forEach(function(user){
			  	$("#newList").append("<li>"+user.user_id + ":" + user.name+"</li>");
		 });
	}
 }

/**
 * ajax call to get users
 */
 $.get(url,onGetUserSuccess);

});
