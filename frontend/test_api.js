import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

async function test() {
  try {
    const response = await api.get('/products');
    console.log(response.data.products.slice(0, 4).length);
    console.log(response.data.products[0].title);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
test();
