var mysql = require('./mysql.js');

function UsersController() {

	this.getUsers = function(req, res, next){
		mysql.query('SELECT * FROM users', function (err, rows, fields) {
			if (err) throw err;
			var users = new Object();
			for (var i = 0; i < rows.length; i++) {
				users[i] = {
					id : rows[i].id,
					firstname : rows[i].firstname,
					lastname : rows[i].lastname
				};
			}
			res.send(200, users);
		});
	};

	this.viewUser = function(req, res, next){
		mysql.query('SELECT * FROM users WHERE id = ?', [req.params.id], function (err, row) {
			if (err) throw err;
			if(row.length > 0){
				var user = new Object();
				user = {
					id : req.params.id,
					firstname : row[0].firstname,
					lastname : row[0].lastname,
					birthdate : row[0].birthdate,
					age : getAge(row[0].birthdate)
				}
				res.send(200, user);
			}else{
				res.send(404, "not found");
			}
		});
	};

	this.registerUser = function(req, res, next){
		var firstname = req.params.firstname,
			lastname = req.params.lastname,
			birthdate = req.params.birthdate,
			insertId = 0;
		if(/^[a-zA-Z ]*$/.test(firstname)&&/^[a-zA-Z ]*$/.test(lastname)&&dateValid(birthdate)){
			mysql.query("INSERT INTO users SET ?", {firstname : firstname, lastname : lastname, birthdate : birthdate}, function(err, result){
					if (err) res.send({error: err});
					insertId = result.insertId;
					res.send(200, "success");
			});
		}else{
    		res.send(406, "not acceptable");
		}
	};

	this.updateUser = function(req, res, next){
		var	id = req.query.id,
			firstname = req.params.firstname,
			lastname = req.params.lastname,
			birthdate = req.params.birthdate;
		if(/^[a-zA-Z ]*$/.test(firstname)&&/^[a-zA-Z ]*$/.test(lastname)&&dateValid(birthdate)){
			mysql.query("SELECT * FROM users WHERE id = ?", [id], function(err, result){
				if(err) res.send({error : err});
				if(result.length > 0){
					mysql.query("UPDATE users SET firstname = ?, lastname = ?, birthdate = ? WHERE id = ? ", [firstname, lastname, birthdate, id] , function(err, result){
						if (err) res.send({error : err});
						res.status(200);
						res.send({status : "success", result : result});
					});
				}else{
					res.status(404);
					res.send({status : "not found"});
				}
			});
		}else{
    		res.send(406, "not acceptable");
		}
	};

	this.deleteUser = function(req, res, next){
		var	id = req.query.id;
		mysql.query("DELETE FROM users WHERE ?", {id : id} , function(err, result){
				if (err) res.send({error : err});
				if(result.affectedRows > 0)	res.send(200, "success");
				else res.send(404, "not found");
		});
	};
};

function getAge(birthdate){
	var birth = new Date(birthdate),
		today = new Date(),
		monthDiff = today.getMonth() - birth.getMonth(),
		dateDiff = today.getDate() - birth.getDate(),
		age = today.getFullYear() - birth.getFullYear();
	if(monthDiff < 0){
		age-=1;
	}else if(monthDiff == 0 && dateDiff > 0){
		age-=1;
	}
	return age;
}

function dateValid(date){
	var daysOfMonth = {
		1 : 31,
	  	2 : 28,
	  	3 : 31,
	  	4 : 30,
	  	5 : 31,
	  	6 : 30,
	  	7 : 31,
	  	8 : 31,
	  	9 : 30,
	  	10 : 31,
	  	11 : 30,
	  	12 : 31
	};
	date = date.split('-');
	if(date.length==3){
		// Check if all are numbers
	  if(!isNaN(date[0])&&!isNaN(date[1])&&!isNaN(date[2])){
	  	date[1] = parseInt(date[1]);
	  	date[2] = parseInt(date[2]);
	    var today = new Date();
	    if(date[0].length==4&&(date[0]>=1920&&date[0]<=today.getFullYear())){ // If year is valid
	    	if(date[0]%4==0){ // If leap year
	    		daysOfMonth[2] = 29;
	    	}
	    	if(date[1]<=12&&(date[2]>0&&date[2]<=daysOfMonth[date[1]])){
	      		return true;
	    	}
	    } 
	  }else{
		  return false;
	  }
	}else{
	  return false;
	}
}
module.exports = new UsersController();