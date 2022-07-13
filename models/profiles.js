import { pool } from '../db/index.js'

export async function getProfiles() {
    const response = await pool.query('SELECT * FROM profiles;');
    return response.rows;
}

export function capitaliseFirst(words) {
    let splitWords = words.split("%")
    let newWords = "";
    for (let i=0; i<splitWords.length; i++) {
        newWords += splitWords[i][0].toUpperCase() + splitWords[i].slice(1) + " ";
    }
    return newWords.slice(0, -1);
}

export function processTextQuery(property, value) {
    if(value === "any") {
        return "(1=1)";
    } else {
        const lowerFormat = value.toLowerCase()
        const capitalFormat = capitaliseFirst(lowerFormat);
        const response = `(${property} LIKE '%${capitalFormat}%' OR ${property} LIKE '%${lowerFormat}%')`;
        return response;
    }
  }
  
export function processNumberQuery(property, value) {
    let response = "";
    if (value > 0) {
        response = `(${property} = ${value})`;
    } else if (value === '0') {
        response = "(1=1)";
    }
    return response;
}
  
export async function processFilters(filteredRequest) {
    console.log("STARTED");
    let conditions = [];
    const keys = Object.keys(filteredRequest);

    keys.forEach((key, index) => {
        let requestValue = filteredRequest[key]
        // Regex expression to see if the string should actually be a number
      if (requestValue.match(/^[0-9]+$/)) {
        conditions.push(processNumberQuery(key, filteredRequest[key]));
      } else if (typeof requestValue === 'string') {
        conditions.push(processTextQuery(key, filteredRequest[key]));
      }
    });

    return conditions.join(" AND ");
}
export async function getFilteredProfiles(filteredRequest) {
    console.log(filteredRequest);
    let responseText = 'SELECT * FROM profiles WHERE ';
    if (Object.keys(filteredRequest).length === 0) {
        responseText = 'SELECT * FROM profiles';
    } else {
        const customText = await processFilters(filteredRequest);
        responseText = responseText + customText;
    }
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