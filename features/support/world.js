var request = require('request');

var World = function (callback) {

	// set up code goes here
	var previous_interval = 0;

	/**
	 *	Call a URL, and fail this test unless SUCCESS is returned.
	 */
	this.GET = function GET(url, json, headers, cucumber_callback, my_callback) {
		// https://github.com/mikeal/request

		if (!headers) headers = {};
		var options = {
			url: url,
			headers: headers
		};

		request(options, function (error, response, body) {
			if (error) {
				console.log('url was: ' + url);
				console.log('reply is: ', body);
				console.log('--- end of reply ---');
				return cucumber_callback(error);
			} else {
				try{
					console.log('url was: ' + url);
					console.log('reply is: ', body);
					console.log('--- end of reply ---');
					return my_callback(response.statusCode, body);
				}catch(e){
					console.log('url was: ' + url);
					console.log('reply is: ', body);
					console.log('--- end of reply ---');
					return cucumber_callback(e);
				}
			}
		});
	};

	/**
	 *	POST to a web service
	 */
	this.POST = function POST(url, json, headers, cucumber_callback, my_callback) {
		// https://github.com/mikeal/request

		if (!headers) headers = {};

		request({
			method: 'POST',
			url: url,
			json: json,
			headers: headers
		}, function (error, response, body) {

			if (error) {
				console.log('\n\nError with POST ' + url);
				console.log('Error:', error);
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('\n\nError with POST ' + url);
				console.log('500 Internal Server Error');
				console.log("Body is ", body);
				cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {
				// Normal return. Should be a JSON object.
				console.log('url was: ' + url);
					console.log('reply is: ', body);
					console.log('--- end of reply ---');
				my_callback(response.statusCode, body);
			}
		});
	};


	/**
	 *	PUT to a web service
	 */
	this.PUT = function PUT(url, json, headers, cucumber_callback, my_callback) {

		// https://github.com/mikeal/request
		//		console.log("POST, url=" + url + ", json=", json);

		if (!headers) headers = {};

		request({
			method: 'PUT',
			url: url,
			json: json,
			headers: headers
		}, function (error, response, body) {

			if (error) {
				console.log('url was: ' + url);
				console.log('reply is: ', body);
				console.log('--- end of reply ---');
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('url was: ' + url);
				console.log('reply is: ', body);
				console.log('--- end of reply ---');
				cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {
				console.log('url was: ' + url);
				console.log('reply is: ', body);
				console.log('--- end of reply ---');
				my_callback(response.statusCode, body);
			}
		});
	};




	/**
	 *	Send DEL to a web service
	 */
	this.DEL = function DEL(url, json, headers, cucumber_callback, my_callback) {

		// https://github.com/mikeal/request
		// console.log("DEL, url=" + url);

		if (!headers) headers = {};
		if (!json) json = {};

		request({
			method: 'DELETE',
			url: url,
			json: json,
			headers: headers
		}, function (error, response, body) {

			// console.log("Back, error="+error, body);

			if (error) {
				console.log('\n\nError with DELETE ' + url);
				console.log('Error:', error);
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('\n\nError with DELETE ' + url);
				console.log('500 Internal Server Error');
				console.log("Body is ", body);
				cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {
				console.log('url was: ' + url);
				console.log('reply is: ', body);
				console.log('--- end of reply ---');
				// Normal return
				my_callback(response.statusCode, body);
			}
		});
	};
};
exports.World = World;

