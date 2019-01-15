var path = require("path");
var fs = require("fs");


function Friends (){
    this.init = function(){
        fs.appendFile(this.savefile, "", "utf8", function(error){
            if(error){
              console.log(error);
            }
            self.load();
        });
    };

    this.toJSON = function(){
        this.init();
        return this.people;
    };

    this.save = function(){
        fs.writeFile(this.savefile, JSON.stringify(this.people, null, 2), "utf8", function(error){
            if(error){
              console.log(error);
            }
        });
    };

    this.load = function(){
        fs.readFile(this.savefile, "utf8", function(error, res){
            if(error){
              console.log(error);
            }
            if(res.length > 0){
                self.people = JSON.parse(res)
            }else{
                self.people = [];
            }
        });
    };

    this.find = function(newfriend){
        this.init();
        var diff = [];
        var best = {
            score:50,
            id:-1
        };
        

        for(var key in this.people){
            var person = this.people[key];
            diff[key] = 0;
            for(var i in person.scores){
                diff[key] += Math.abs( person.scores[i] - newfriend.scores[i] ); 
            }
            if(best.score > diff[key]){
                best.score = diff[key];
                best.id = key;
            }
        }
        var is_new_person = true;
        for(i in this.people){
            var person = this.people[i];
            if(
                        person.name === newfriend.name
                &&     person.photo === newfriend.photo
                && person.scores[0] === newfriend.scores[0]
                && person.scores[1] === newfriend.scores[1]
                && person.scores[2] === newfriend.scores[2]
                && person.scores[3] === newfriend.scores[3]
                && person.scores[4] === newfriend.scores[4]
                && person.scores[5] === newfriend.scores[5]
                && person.scores[6] === newfriend.scores[6]
                && person.scores[7] === newfriend.scores[7]
                && person.scores[8] === newfriend.scores[8]
                && person.scores[9] === newfriend.scores[9]
            ){
                is_new_person = false;
                break;
            }
        }
        if(is_new_person){
            this.people.push(newfriend);
            this.save();
        }
        
        //send the closest friend to the requested friend
        if(best.id !== -1){
            return {
                name :  this.people[best.id].name,
                photo : this.people[best.id].photo
            };
        }else{
            return {
                name :  "",
                photo : ""
            };
        }
    };

    var self = this;
    this.savefile = path.join(__dirname, "data.json");
    this.people = [];
    this.init();
}

module.exports = Friends;