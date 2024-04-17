const express = require('express');
const router = express.Router();
const { createNewUser, getUser, getAllUsers, createRewards, editUser, getAllP5History, deleteP5History, getAllRewardsHistory  } = require('../RoutesManagement/user-management');

//Get All Users
router.get("/getAllUsers", async(req, res) => {
    let result = {};
    try { 
        let object = await getAllUsers(req.params.id);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Get Particular User
router.get("/getUser/:id", async(req, res) => {
    let result = {};
    try { 
        let object = await getUser(req.params.id);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Edit User
router.put("/editUser/:id", async(req, res) => {
    let result = {};
    try { 
        let object = await editUser(req.params.id, req.body);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Create New User
router.post("/newUser", async(req, res) => {
    let result = {};
    try { 
        let object = await createNewUser(req.body);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Create Rewards
router.post("/createRewards", async(req, res) => {
    let result = {};
    try { 
        let object = await createRewards(req.body);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Get P5 History
router.get("/getP5History/:id", async(req, res) => {
    let result = {};
    try { 
        let object = await getAllP5History(req.params.id);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Delete P5 
router.delete("/deleteP5History/:id", async(req, res) => {
    let result = {};
    try { 
        let object = await deleteP5History(req.params.id);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Get Rewards History
router.get("/getRewardsHistory/:id", async(req, res) => {
    let result = {};
    try { 
        let object = await getAllRewardsHistory(req.params.id);
        result.data = object.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})


module.exports = router;