// const app = require("./app.js");
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
//------------------------------------------------------------------------
require("dotenv").config();
const app = require("./app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
