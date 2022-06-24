Back-end plan Tuesday

# Mock database in libs folder - an object containing all the categories we want right now --DONE--

 - Id, Bootcamper, Name, Region, Job Title, Pronouns, Image Link, Contact Info, Links

# Do our database intiation SQL things like create and populate, using the data from our libs to test --DONE--

# Import the environment variables into db/index.js and link up with our data? --DONE--

# Route functions - start with get all for now, and only after, migrate this to the models section --DONE--
    - created a get function to get all profiles X
    - create a get function that gets by region X
    - get function that gtes by bootcamp number X 
        - will need to re-create the table since we forgot to add bootcamp number
    - gets by searched name X

# Look into encryption and information safety to incorporate --In Progress-- still need to perfect

# Finally get a mock client in our app.js --DONE-

# Make formal unit tests --IN Progress

Back-end plan Wednesday 

# Work on making the search functions (req.query.params) not be case sensitive --DONE--

# Continue making some tests



# EXTENSION

- Allow multi-variable GET requests

- Make POST, PUT and DELETE routes

- Make another table to store the email requests

- Make routes for these requests

- Generalise code to account for many filters

- Unit tests on the routes

