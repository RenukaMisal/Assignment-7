
var parse=require("./parse.js");
var Student=function(id,email,name,enrolledSubjects){
	this.id=id;
	this.email=email;
	this.name=name;
	this.enrolledSubjects=enrolledSubjects;
}
//3.a method to add new students in repository 
exports.create = function(req,res) {

	parse.parseRequestBody(req, function (err, newStud) {
	var email=newStud.email;
	var id=newStud.id;
	var name=newStud.name;
	var enrolledSubjects=(newStud.enrolledSubjects);

		parse.createStudent(new Student(id,email,name,enrolledSubjects),function(e,createdStudent){
			//res.write(JSON.stringify(students));
			parse.writToFile();
			res.end("Create completed");
		});
	});
};

exports.read=function(req,res){
	//read operation
    if(req.method=="GET"){
		console.log("in get method");
		parse.getStudents(function (err, students) {
            if (err) {
                res.write("Error");
                return;
            }
	        res.write(JSON.stringify(students));
	        res.end("reading completed");
        });
	}
};

exports.update=function(req,res){
	if(!req.query.email){
		res.send("Invalid Query parameter.");
		return;
	}
	var query=req.query.email;
	parse.parseRequestBody(req, function (err, updateStudent) {
        if (err) {
            res.write("Error");
            return;
        }
        parse.updateStudentByEmail(query, updateStudent, function(e, updateStudent) {
        	
        	if (err) {
            res.write(response, err);
            return;
        	}
          	parse.writToFile();
            res.end("hello updated");
		});
    });
};

exports.delete=function(req,res){
	console.log(req.query.email);
	if(!req.query.email){
		res.send("Invalid Query parameter.");
		return;
	}
	var query=req.query.email;
	parse.deleteStudentByEmail(query, function (err, students) {
            
        if (err) {
            res.write(response, err);
            return;
        }
        parse.writToFile();
       	res.end("hello deleted");
	});
}

