import app from "./app.js";
import dbConnection from "./schema/dbConnection.js";

dbConnection();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening in port: http://localhost:${PORT}`);
});
