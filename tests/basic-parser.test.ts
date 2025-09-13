import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ROLE_CSV_PATH = path.join(__dirname, "../data/role.csv");
const EMPTY_LINES_CSV_PATH = path.join(__dirname, "../data/empty.csv");
const TEST = path.join(__dirname, "../data/test.csv");
const MISSING = path.join(__dirname, "../data/missingField.csv");

// test("parseCSV yields arrays", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH)
  
//   expect(results).toHaveLength(5);
//   expect(results[0]).toEqual(["name", "age"]);
//   expect(results[1]).toEqual(["Alice", "23"]);
//   expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
//   expect(results[3]).toEqual(["Charlie", "25"]);
//   expect(results[4]).toEqual(["Nim", "22"]);
// });

// test("parseCSV yields only arrays", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH)
//   for(const row of results) {
//     expect(Array.isArray(row)).toBe(true);
//   }
// });

// test("parseCSV handles commas inside double quotes", async () => {
//   const results = await parseCSV(ROLE_CSV_PATH)
//   expect(results[1]).toHaveLength(4);
// });


// test("parseCSV trims whitespace", async () => {
//   const results = await parseCSV(ROLE_CSV_PATH)
//   expect(results[0][0]).toBe("Tim");
//   expect(results[0][1]).toBe("Nelson");
// });



// test("parseCSV handles missing values", async () => {
//   const results = await parseCSV(ROLE_CSV_PATH)
//   expect(results[2]).toHaveLength(4);
//   expect(results[2]).toEqual(["Tim", "", "CSCI 0320", "student"]);
// });

// test("parseCSV handles empty lines", async () => {
//   const results = await parseCSV(EMPTY_LINES_CSV_PATH)
//   expect(results).toHaveLength(0);
// });


test("parseCSV fails on text representing number", async () => {
  const schema = z.tuple([z.string(), z.coerce.number()]);
  const results = await parseCSV(PEOPLE_CSV_PATH, schema)
  if (results.success){
    expect(results.data[0]).toEqual(["Alice", 23]);
    expect(results.data[1]).toEqual(["Bob", 30]); // why does this work? :(
    expect(results.data[2]).toEqual(["Charlie", 25]);
    expect(results.data[3]).toEqual(["Nim", 22]);
  }
  else{
    console.log(results);
    fail("invalid number conversion")
  }
  
});

test("parseCSV handles larger schema", async () => {
  const schema = z.tuple([z.string(), z.string(), z.coerce.number(), z.string().transform(val => val.toLowerCase() === 'true')]);
  const results = await parseCSV(TEST, schema)
  if (results.success){
    expect(results.data[0]).toEqual(["Tim", "teacher", 30, false]);
    expect(results.data[1]).toEqual(["Andy", "fire fighter", 56, true]); 
    expect(results.data[2]).toEqual(["Linda", "pilot", 3, true]);
  }
  else{
    console.log(results);
    fail();
  }
});


test("parseCSV handled undefined schema", async () => {
  const results = await parseCSV(TEST, undefined)
  if (results.success){
    expect(results.data[0]).toEqual(["Tim", "teacher", "30", "false"]);
    expect(results.data[1]).toEqual(["Andy", "fire fighter", "56", "true"]); 
    expect(results.data[2]).toEqual(["Linda", "pilot", "3", "true"]);
  }
  else{
    console.log(results);
    fail();
  }


});

test("parseCSV returns error for missing fields", async () => {
  const schema = z.tuple([z.string(), z.string(), z.coerce.number(), z.string().transform(val => val.toLowerCase() === 'true')]);
  const results = await parseCSV(MISSING, schema)
  if(results.success){
    expect(results.data[0]).toEqual(["Tim", "teacher", 30, false]);
    expect(results.data[1]).toEqual(["Andy", "fire fighter", 56, true]);
    expect(results.data[2]).toEqual(["Linda", "pilot", 3, true]);
    expect(results.data[3]).toEqual(["Bob", 29, false]);
  }
  else{
    console.log(results);
  }
});

test("parseCSV handling delimiters in quotes", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  if (results.success){
    expect(results.data[1]).toEqual(["Nim", "Telson", "CSCI 0320, Math 0100, UNIV 1110", "student"]);
    expect(results.data[1]).toHaveLength(4);
  }
  else{
    console.log(results);
  }
});


 





