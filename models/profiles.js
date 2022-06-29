import { pool } from '../db/index.js'

export async function getProfiles() {
    const response = await pool.query('SELECT * FROM profiles;');
    return response.rows;
}

export function processTextQuery(property, value) {
    const lowerCase = value.toLowerCase();
    const response = `${property} LIKE %${lowerCase}%`;
    return response;
  }
  
export function processNumberQuery(property, value) {
    let response = "";
    if (value > 0) {
        response = `${property} = ${value}`;
    } else if (value === 0) {
        response = "${property} = null";
    }
    return response;
}
  
export function processFilters(filteredRequest) {
    console.log("STARTED");
    let conditions = [];
    const keys = Object.keys(filteredRequest);
    keys.forEach((key, index) => {
      if (typeof filteredRequest[key] === 'string') {
          conditions.push(processTextQuery(key, filteredRequest[key]));
      } else if (typeof filteredRequest[key] === 'number') {
          conditions.push(processNumberQuery(key, filteredRequest[key]));
      }
    });
        
    //return conditions
    return conditions.join(" AND ");
}
export async function getFilteredProfiles(filteredRequest) {
    console.log("Started!");
    let responseText = 'SELECT * FROM profiles WHERE ';
    //responseText = responseText + conditions.join(" AND ");
    responseText = responseText + processFilters(filteredRequest);
    console.log(responseText);
    const response = await pool.query(responseText);
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