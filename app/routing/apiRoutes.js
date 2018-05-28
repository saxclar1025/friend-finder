var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var bestCompatibilityScore = 50;
        var bestFriend = null;
        friendsData.forEach(friend=>{
            var compatibilityScore = 0;
            for (var i = 0; i < 10; i++) {
                compatibilityScore += Math.abs(friend.scores[i]-req.body.scores[i]);
            }
            if (compatibilityScore<bestCompatibilityScore) {
                bestFriend = friend;
                bestCompatibilityScore = compatibilityScore;
            }
        });
        friendsData.push(req.body);
        if(!bestFriend) {
            res.json(null);
            return;
        }
        res.json(bestFriend);
    });
};
