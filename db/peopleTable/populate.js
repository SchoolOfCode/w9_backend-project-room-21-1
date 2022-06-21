import { query } from "../index.js";
import profiles from "../../libs/data.js";

async function populateProfilesTable(){
    for (let i=0; i<profiles.length; i++){
        const res = await query( 
            `INSERT INTO PROFILES(name, region, jobTitle, pronouns, imageLink, contactInfo) VALUES ($1,$2,$3,$4,$5,$6)RETURNING*;`,
            [profiles[i].name, profiles[i].region, profiles[i].jobTitle, profiles[i].pronouns, profiles[i].imageLink, profiles[i].contactInfo]
        );
    console.log(res.rows[0].common_name, "inserted");
    }
    }
populateProfilesTable();