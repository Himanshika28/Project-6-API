//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require("mongoose");
const app = express();


app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikibtsdb');

const membersSchema = {
  nameTitle: String,
  role: String
}
const Member = mongoose.model("member", membersSchema);


app.route("/members")

.get(function(req, res){
  Member.find({}, function(err, foundMembers){
if (err){
  console.log(err);
}
  else{
    res.send(foundMembers);
  }
  });
})

.post(function(req, res){
  const m8 = new Member({
    nameTitle: req.body.name,
    role: req.body.about
});
m8.save(function(err){
  if (err){
    res.send("oh nooo!!");
  }
  else{
    res.send("Success!!");
  }
});
}
)

.delete(function(req, res){
  Member.deleteMany({}, function(err){
    if (!err){
      res.send("Successfully deleted");
    }
  });
});






app.route("/members/:memberName")

.get(function(req, res){


  Member.findOne({title: req.params.memberName}, function(err, foundmember){
    if (!err){
      res.send(foundmember);
    }
    else{
      res.send("No match found");
    }
  });
})

.delete(function(req, res){
Member.deleteOne({title: req.params.memberName}, function(err, foundmember){
  if (!err){
    res.send("Successfully deleted the article")
  }
  else{
    res.send(err)
  }
});

});





app.listen(4000, function(){
  console.log("Server started at port 4000");
});
