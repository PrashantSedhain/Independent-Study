const express = require("express");
var _ = require("lodash");
const router = express.Router();
const Group = require("../models/group");
const checkAuth = require("../middleware/check-auth");
const { route } = require("./user");


router.post('/create', (req, res, next) => {
    

})