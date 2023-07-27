const puppeteer = require('puppeteer');
const fs = require('fs');
const Product = require('../api/models/product-model');
const { connectDB } = require('../config/db');

const PRODUCTS_URL =
  'https://www.decathlon.es/es/browse/c0-deportes/c1-triatlon/c2-equipamiento/_/N-199d4np';

const scrapeProducts = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  await page.goto(PRODUCTS_URL);

  await page.waitForSelector('.giftcard-banner.svelte-153c6ej');

  const name = await page.$$eval('h2.vtmn-leading-5', (nodes) =>
    nodes.map((node) => node.innerText)
  );
  const price = await page.$$eval('span.vtmn-price_size--medium', (nodes) =>
    nodes.map((node) => node.innerText)
  );

  const image = await page.$$eval('img.svelte-11itto', (nodes) => nodes.map((node) => node.src));

  const promo = await page.$$eval('div.price-discount-informations', (nodes) =>
    nodes.map((node) => node.innerText)
  );

  const allProducts = name.map((value, index) => {
    return {
      name: name[index],
      price: price[index],
      image: image[index + 7]
    };
  });

  allProducts.map(async (product) => {
    const productSchema = new Product(product);
    try {
      await productSchema.save();
      console.log('all products saved in our database');
    } catch (err) {
      console.log('Error creating schema', err);
    }
  });

  await browser.close();
};

connectDB();

scrapeProducts();
