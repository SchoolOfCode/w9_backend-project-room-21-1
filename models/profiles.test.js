import { test, expect, describe } from "@jest/globals";
import { getProfiles,
   processTextQuery,
   processNumberQuery,
   processFilters,
   getFilteredProfiles }
  from "./profiles.js";

describe("GET function tests", () => {
  test("Check the structure of the payload, when sent a GET request for All profiles", async () => {
    //ARRANGE
    const actual = await getProfiles()
    //ACT
    const expected = []; 
    for(let i=0; i<actual.length; i++){
      expected.push({
        id: expect.any(Number),
        bootcampnumber: expect.any(Number),
        name: expect.any(String),
        region: expect.any(String),
        jobtitle: expect.any(String),
        pronouns: expect.any(String),
        description: expect.any(String),
        imagelink: expect.any(String),
        contactinfo: expect.any(String)
      })}

    //ASSERT
    expect(actual).toEqual(expected);
  });

  test("Check new functions: that processTextQuery prepares a text response to put in a SQL query",
  async () => {
    //ARRANGE
    const actual = processTextQuery("name", "Am Wyli");
    //ACT
    const expected = "name LIKE %am wyli%";
    //ASSERT
    expect(actual).toEqual(expected);
  })

  test("Check new functions: that processNumberQuery prepares a positive integer response to put in a SQL query",
  async () => {
    //ARRANGE
    const actual = processNumberQuery("myno", 5);
    //ACT
    const expected = "myno = 5";
    //ASSERT
    expect(actual).toEqual(expected);
  })

  test("Check new functions: that processFilters gives me what I expect at this point", async () => {
    //ARRANGE
    const myFilteredRequest = {name: "Am Wyli", myno: 5};
    const actual = processFilters(myFilteredRequest);
    //ACT
    const expected = "name LIKE %am wyli% AND myno = 5";
    //ASSERT
    expect(actual).toEqual(expected);
  } )

  test("Check new functions: that getFilteredProfiles on my details gives Sara Nader profile", async () => {
    //ARRANGE
    const myFilteredRequest = {name: "Sara Nader", bootcampnumber: 6};
    const actual = getFilteredProfiles(myFilteredRequest);
    //ACT
    const expected = []; 
    for(let i=0; i<actual.length; i++){
      expected.push({
        id: expect.any(Number),
        bootcampnumber: 6,
        name: "Sara Nader",
        region: expect.any(String),
        jobtitle: expect.any(String),
        pronouns: expect.any(String),
        description: expect.any(String),
        imagelink: expect.any(String),
        contactinfo: expect.any(String)
      })}
    //ASSERT
    expect(actual).toEqual(expected);
  } )





});