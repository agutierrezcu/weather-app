const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

// serve our static stuff like index.css
const root = path.resolve(process.cwd(), 'build');
app.use(express.static(root));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server');
});
