let User = require("../DB_Models/user");
let RewardHistory = require("../DB_Models/rewardHistory");

//Get Particular User
let getUser = function(id) {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await User.findOne({_id : id});
            if(res) {
                resolve({success : true, data : res});
            }
            else {
                resolve({success : false, data : "Invalid User"});
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Edit Particular User
let editUser = function(id, user) {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await User.findOne({_id : id});
            let updatedUser;

            if(res) {
                res.name = user.name;
                updatedUser = await res.save();
                resolve({success : true, data : updatedUser});
            }
            else {
                resolve({success : false, data : res});
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Get All Users
let getAllUsers = function() {
    return new Promise(async function(resolve, reject) {
        try {

            const users = await User.find();
            resolve({success : true, data : users});
        } catch (err) {
            console.error(err);
           reject({ message: 'Server Error' });
        }
    })
}

//Creating User in DB
let createNewUser = function(user) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await User.create(user);
            if(result) {
                resolve({success : true, data : result});
            }
            else {
                reject("Issue in creating New User");
            };
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Creating User in DB
let createRewards = function(rewards) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await User.findOne({_id : rewards.givenBy});
            let userBalance = user.P5Balance;
            let points;

            if(userBalance >= rewards.points) {
                let result = await RewardHistory.create(rewards);
                if(result) {
                    await User.updateOne({ _id: rewards.givenBy }, { $set: {P5Balance : (userBalance - rewards.points)}});
                    points = await User.findOne({_id : rewards.givenTo});
                    await User.updateOne({ _id: rewards.givenTo }, { $set: {RewardBalance : (points.RewardBalance + rewards.points)}});
                    resolve({success : true, data : result});
                }
                else {
                    reject("Issue in creating Reward History");
                };
            }
            else {
                resolve({success : false, data : "Not that much balance Present"});
            }            
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//get P5 History
let getAllP5History = function(id) {
    return new Promise(async function(resolve, reject) {
        try {

            let result = await RewardHistory.find({givenBy: id});
            let allP5History = [];
            let receiver;

            for(let history of result) {
                let obj = {};
                obj.id = history.id;
                obj.dateTime = history.timestamp;
                obj.P5given = history.points;

                receiver = await User.findOne({_id : history.givenTo});
                obj.userName = receiver.name;

                allP5History.push(obj);

            }    
            resolve({success: true, data: allP5History});      
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Delete P5 History
let deleteP5History = function(id) {
    return new Promise(async function(resolve, reject) {
        try {

            let result = await RewardHistory.findOne({_id: id});
            let user;
            if(result) {
                await RewardHistory.deleteOne({_id: id});
                user = await User.findOne({ _id: result.givenBy });
                user.P5Balance = user.P5Balance + result.points;
                await user.save();

                user = await User.findOne({ _id: result.givenTo });
                user.RewardBalance = user.RewardBalance - result.points;
                await user.save();         

                resolve({success: true, data: "Transaction done successfully"});      
            }
            else {
                resolve({success: false, data: "Resource Not Found"});   
            }   
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Get Rewards History
let getAllRewardsHistory =function(id) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await RewardHistory.find({givenTo: id});
            let rewardsHistory = [];
            let receiver;

            for(let history of result) {
                let obj = {};
                obj.id = history.id;
                obj.dateTime = history.timestamp;
                obj.rewardsRecieved = history.points;

                receiver = await User.findOne({_id : history.givenBy});
                obj.userName = receiver.name;

                rewardsHistory.push(obj);

            }    
            resolve({success: true, data: rewardsHistory});      
        }
        catch(ex) {
            reject(ex);
        }
    })
}

module.exports = {
    createNewUser,
    getUser,
    getAllUsers,
    createRewards,
    editUser,
    getAllP5History,
    deleteP5History,
    getAllRewardsHistory
}