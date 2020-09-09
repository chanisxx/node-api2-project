const app = require('./server');

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});
