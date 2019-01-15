
module.exports = function(app, apiFriends){
    app.get("/api/friends", function(req, res) {
        res.json(apiFriends.toJSON());
    });
    
    app.post("/api/friends", function(req, res) {
        //handle the incoming newfriend to give the closest one 
        res.json(apiFriends.find( req.body ));
    });
};