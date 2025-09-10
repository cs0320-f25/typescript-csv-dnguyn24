import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ROLE_CSV_PATH = path.join(__dirname, "../data/role.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles commas inside double quotes", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[1]).toHaveLength(3);
});


test("parseCSV trims whitespace", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[0][0]).toBe("Tim");
  expect(results[0][1]).toBe("Nelson");
});



test("parseCSV handles missing values", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[2]).toHaveLength(4);
  expect(results[2]).toEqual(["Tim", "", "CSCI 0320", "student"]);
});


test("parseCSV handles leading and trailing commas", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[3]).toHaveLength(6);
  expect(results[3]).toEqual(["", "Tim", "Nelson", "CSCI 0320", "student", ""]);
});

test("parseCSV handles line breaks inside double quotes", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[4]).toHaveLength(4);
  expect(results[4]).toEqual(["Tim", "Nelson", "CSCI 0320\n, MATH 0100, UNIV 1110", "student"]);
});

test("parseCSV handles different separators", async () => {
  const results = await parseCSV(ROLE_CSV_PATH)
  expect(results[6]).toEqual(["Tim", "Nelson", "CSCI0320", "student"]);
});







