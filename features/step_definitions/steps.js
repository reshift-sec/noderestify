'use strict';

module.exports = function() {
	this.World = require("../support/world.js").World;
	var _url;
	var module = this;
	var world = this.World;
	var url = 'http://localhost:8888';
	var users;
	var id;
	var _statusCode, _status, _reply_body, _method;

	// Global
	this.Given('that the API server is running', function (callback) {
		callback();
	});

	this.Then(/^the reply status code should be (\d+)$/, function (expectedStatusCode, callback) {
		console.log(_method);
		if (_statusCode != expectedStatusCode) {
            var msg = "Expected status code " + expectedStatusCode + " but got " + _statusCode + ".";
            return callback(new Error(msg));
        }
        return callback();
	});

	this.Then(/^the status message should be '(.*)'$/, function (expectedStatus, callback) {
		if (_status != expectedStatus) {
            var msg = "Expected status " + expectedStatus + " but got " + _status + ".";
            return callback(new Error(msg));
        }
        return callback();
    });
	// End Global

// Positive Scenarios
	// Listing
	this.When(/^I access the '(.*)'$/, function (param1, callback) {
		_url = url + param1;
		this.GET(_url, null, null, callback, function(statusCode, json){
			_statusCode = statusCode;
			users = JSON.parse(json);
			callback();
		});
	});

	this.Then(/^it should send an array of users$/, function (callback) {
		if(!users[0]){
			var msg = "users is empty | " + users;
            return callback(new Error(msg));
		}
		return callback();
	});
	// End Listing

	// Register
	this.When(/^I send parameters firstname='(.*)' and lastname='(.*)' and birthdate='(.*)' to '(.*)'$/, function (arg1, arg2, arg3, param1, callback) {
	 	_url = url + param1;
	 	var json = {
	 		firstname : arg1,
	 		lastname : arg2,
	 		birthdate : arg3
	 	};
	 	this.POST(_url, json, null, callback, function (statusCode, json) {
	 		_statusCode = statusCode;
	 		_status = json;
			callback();
		});
	});
	// End Register

	// Update
	this.When(/^I send parameters to update id=(\d+) firstname='(.*)' and lastname='(.*)' and birthdate='(.*)' to '(.*)'$/, function (arg1, arg2, arg3, arg4, param1, callback) {
         var json = {
         	id : arg1,
         	firstname : arg2,
         	lastname : arg3,
         	birthdate : arg4
         };
         _url = url + param1 + "/?id=" + arg1;
         this.PUT(_url, json, null, callback, function(statusCode,json){
         	_statusCode = statusCode;
	 		_reply_body = json;
	 		_status = json.status;
			callback();
		});
    });

	this.Then(/^result.affectedRows should be (\d+)$/, function (expectedAffectedRows, callback){
       if(expectedAffectedRows != _reply_body.result.affectedRows){
       		var msg = "Expected affectedRows " + expectedAffectedRows + " but got " + _reply_body.affectedRows + ".";
            return callback(new Error(msg));
       }
       return callback();
    });
	// End Update

	// View specific profile
	this.When(/^I send parameter id=(\d+) to '(.*)'$/, function (arg1, param1, callback) {
		_url = url + param1 + '/?id=' + arg1;
        this.GET(_url, null, null, callback, function(statusCode, json){
			_statusCode = statusCode;
			users = JSON.parse(json);
			callback();
		});
    });

    this.Then(/^it should return an array of profile information$/, function (callback) {
        if(!users){
			var msg = "user info is empty | " + users;
            return callback(new Error(msg));
		}
		return callback();
    });
	// End View Specific Profile

	// Delete Profile
	this.When(/^I send the parameter id=(\d+) to '(.*)'$/, function (arg1, param1, callback){
		_url = url + param1 + "/?id=" + arg1;
		this.DEL(_url, null, null, callback, function(statusCode, json){
			_statusCode = statusCode;
			_status = json;
			callback();
		});
	});
	// End Delete Profile
// End Positive Scenarios

// Negative Scenarios
	// Non-existent user
	this.When(/^I send the non-existing id=(\d+) and firstname='(.*)' and lastname='(.*)' and birthdate='(.*)' to url='(.*)' with method='(.*)'$/, function (arg1, arg2, arg3, arg4, param1, method, callback){
		var json = {
			id : arg1,
			firstname : arg2,
			lastname : arg3,
			birthdate : arg4
		}
		_url = url + param1 + '/?id=' + arg1;

		if(method=='GET'){
			this.GET(_url, json, null, callback, function(statusCode, json){
				_statusCode = statusCode;
				_status = JSON.parse(json);
				callback();
			});
		}
		if(method=='PUT'){
			this.PUT(_url, json, null, callback, function(statusCode, json){
				_statusCode = statusCode;
				_status = json.status;
				callback();
			});
		}
		if(method=='DEL'){
			this.DEL(_url, null, null, callback, function(statusCode, json){
				_statusCode = statusCode;
				_status = json;
				callback();
			});
		}
    });

    // Invalid inputs
    this.When(/^I send invalid characters for firstname='(.*)' and lastname='(.*)' and birthdate='(.*)' and id=(\d+) to register$/, function (arg1, arg2, arg3, arg4, callback){
    	var json = {
    		id : arg4,
    		firstname : arg1,
    		lastname : arg2,
    		birthdate : arg3
    	}
    	_method = "POST";
    	_url = url + '/register';
    	this.POST(_url, json, null, callback, function(statusCode,json){
    		_statusCode = statusCode;
    		_status = json;
    		callback();
    	});
    });

    this.When(/^I send invalid characters for firstname='(.*)' and lastname='(.*)' and birthdate='(.*)' and id=(\d+) to update$/, function (arg1, arg2, arg3, arg4, callback){
    	var json = {
    		id : arg4,
    		firstname : arg1,
    		lastname : arg2,
    		birthdate : arg3
    	}
    	_method = "PUT";
    	_url = url + '/update/?id=' + arg4;
    	this.PUT(_url, json, null, callback, function(statusCode,json){
    		_statusCode = statusCode;
    		_status = json;
    		callback();
    	});
    });
// End Negative Scenarios
}