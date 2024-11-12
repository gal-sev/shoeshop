const express = require("express");
const path = require('path');  // Node.js module to handle file paths

const app = express();

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    );

    app.get('/', (req, res) => {
        const filePath = path.join(__dirname, 'public', 'index.html');
        res.sendFile(filePath);
    });

  } catch (error) {
    console.log(error);
  }
};

start();