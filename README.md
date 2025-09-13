# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
Handling line breaks inside of quotes, fields inside double quotes as one, using other separators besides commas, maybe converting numbers that are strings into type number, handle title row in CSV, missing fields

- #### Step 2: Use an LLM to help expand your perspective.
Handling quoted fields containing commas as one field not multiple, newlines inside fields, variable number of fields, header handling

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    
    Functionality:
    Based on my initial ideas and what the LLM suggested, as a user of the application, I am able to filter quoted fields containing separators as one field not multiple, so I can align with the CSV parser definition. 

    Extensionability:
    Based on my initial ideas and what the LLM suggested, as a user of the application, I am able to separate fields that span across multiple new lines so, I can include fields that contain more information.
    
    Based on my initial ideas and what the LLM suggested, as a user of the application, I am able to include headers for my fields, so I can improve readability and organization of the parsed data.
    Acceptance criteria:
    -Header row would not be counted towards the parsed data
    -Used to label the other fields

    Based on my initial ideas, as a user of the application, I can have greater type coercion such strings of words converted into numbers, so I can increase the standardization of my data and convenience.

    I asked an LLM the original prompt and one that included a question on how to increase extensionability or functionality. They included a lot of the similar ideas, but the main difference was that the second prompt included ideas
    such as streaming/chunked parsing, metadata tracking, config profiles, and logging and debugging. The ideas about including schema validation, header handling, and handling multiple lines resonated with me. Suggestions about different delimiters beyond
    the comma was a little strange to me. 


### Design Choices

### 1340 Supplement

- #### 1. Correctness
A CSV parser is "correct" or is functioning as intended if it parses all the CSV fields into useful objects whether it is something specified in a CSV or defaulting to string[][]. The parser should also be able to handle 
delimiters contained within quotes and treating them as one field instead of multiple. 

- #### 2. Random, On-Demand Generation
If I had access to a function that could generate CSV data, I would include tests cases testing things such as large datasets for the performance of the parser, looking at how errors would be brought up in very large datasests, and CSVs that include
a wide variety of data types.

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: 
The main bugs that were encountered 
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
