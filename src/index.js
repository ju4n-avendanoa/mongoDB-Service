import app from "./app.js";
import dbConnection from "./schema/dbConnection.js";

// Establish a connection to the database
dbConnection();

const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
