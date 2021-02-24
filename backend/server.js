import express from 'express';
import data from './data.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.get('/api/products',  async (req, res) => {
  res.send(data.products);
});

app.get('/api/product/:productId', async(req, res) => {
  const product = data.products.find((x) => x.id === Number(req.params.productId));
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({message: "Product Not Found"});
  }
});

app.get('/api/product/:productName/:size',  async (req, res) => {
  const wkProduct = data.products.find((x) => (x.productName === req.params.productName) && (x.size === req.params.size));
  if (wkProduct) {
    res.send(wkProduct);
  } else {
    res.status(404).send({message: "Product Not Found"});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
