import express from "express";
import {getProfiles, getProfilesByRegion, getProfilesByName, getProfilesByBootcamp, getFilteredProfiles} from "../models/profiles.js"
const router = express.Router();

router.get("/", async function(req, res) {
    try {
        const result = await getFilteredProfiles(req.query);
        return res.json({ success: true, payload: result })
    }
    catch(err) {
        return res.json({ success: false, payload: {} })
    }
})

router.get("/", async function (req, res) {
    let result = {};
    if (req.query.region !== undefined) {
        result = await getProfilesByRegion(req.query.region);
    } else if(req.query.name){
        result = await getProfilesByName(req.query.name);
    } else if(req.query.Bootcampnumber){
        const setToNum = req.query.Bootcampnumber*1;
        result = await getProfilesByBootcamp(setToNum);
    } else {
        result = await getProfiles();
    }
    return res.json({ success: true, payload: result })
});


export default router;


