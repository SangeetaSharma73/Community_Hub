const app = require("./app");
const dbConnect = require("./config/db");

const PORT = process.env.PORT || 5000;

// Start DB and server
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
