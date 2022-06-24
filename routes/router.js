import express from "express";
import {getProfiles, getProfilesByRegion, getProfilesByName, getProfilesByBootcamp} from "../models/profiles.js"
const router = express.Router();

router.get("/", async function (req, res) {
    const result = {};
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


