import { parseCSV } from "./basic-parser";
import{ z } from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/



const DATA_FILE = "./data/people.csv"; // update with your actual file name


async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.

    const schema = z.tuple([z.string(), z.coerce.number()]);
  
  const results = await parseCSV(DATA_FILE, schema)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  if (results.success){
    for(const record of results.data)
    console.log(record)
  for(const record in results.data)
    console.log(record)
  }
  else{
    console.log("error on line ", results.line, " : ", results.error);
  }
  
}

main();