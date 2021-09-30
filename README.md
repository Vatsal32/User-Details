# User Details
This project makes use of JSON Placeholder Fake DB, where data cannot be edited (i.e. update, add, and delete requests don't alter the database). Hence, in order to be able to actually edit the data shown in the database one can use JSON-server.

## How to Use
1. Make sure you have npm and node.js installed on your machine.
2. Clone this repository into your system.
3. Run the command
    ```
    npm install
    ```
4. Install JSON-server using command
    ```
    npm install -g json-server
    ```
5. If you wish to use JSON-server rather than JSON Placeholder, make this change in your .env file
    ```
    REACT_APP_API_URL="http://localhost:3000/"
    ```
6. Now start the JSON-server by
    ```
    json-server --watch ./db.json
    ```
    make sure you run this command in the root directory of the cloned repo.
7. Start the React JS application by running the given command in the root directory of the cloned repo.
    ```
    npm start
    ```

Alternatively, you can also visit the hosted website at https://userdetails12.herokuapp.com/. But this site uses JSON place holder hence editing the records won't be possible.
