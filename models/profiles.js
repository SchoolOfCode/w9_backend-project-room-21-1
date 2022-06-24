import { pool } from '../db/index.js'

export async function getProfiles() {
    const response = await pool.query('SELECT * FROM profiles;');
    return response.rows;
}

export async function processTextQuery(textQuery) {
    const lowerCase = textQuery.toLowerCase();
    const processedText = `%${lowerCase}%`;
    return processedText;
}

export async function processNumberQuery(numberQuery) {
    const response = "";
    if (numberQuery > 0) {
        response = numberQuery;
    } else if (numberQuery === 0) {
        response = "";
    }
    return response;
}

export async function getFilteredProfiles(filteredRequest) {
    const responseText = 'SELECT * FROM profiles WHERE ';
    for (let i=0; i<filteredRequest.length; i++) {
        responseText = responseText + filteredRequest[i] + 'AND';
    }
    const response = await pool.query(response.slice(0, -3));
    return response.rows;
}


export async function getProfilesByRegion(region) {
    const lowerCase = region.toLowerCase();
    const searchRegion = `%${lowerCase}%`;
    const response = await pool.query("SELECT * FROM profiles WHERE LOWER(Region) LIKE $1", [searchRegion]);
    return response.rows;
}

export async function getProfilesByName(name) {
    const lowerCase = name.toLowerCase();
    const searchName = `%${lowerCase}%`;
    const response = await pool.query(`SELECT * FROM profiles WHERE LOWER(Name) LIKE $1`, [searchName]);
    return response.rows;
}

export async function getProfilesByBootcamp(bootcampNumber) {
    const response = "";
    if (bootcampNumber > 0) {
        response = await pool.query(`SELECT * FROM profiles WHERE bootcampNumber= $1;`, [bootcampNumber]);
    } else if (bootcampNumber === 0) {
        response = await pool.query(`SELECT * FROM profiles;`);
    }
    return response.rows;
}