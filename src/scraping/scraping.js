const puppeteer = require('puppeteer');
const fs = require("fs");

const PRODUCTS_URL = "https://www.decathlon.es/es/browse/c0-deportes/c1-triatlon/c2-equipamiento/_/N-199d4np";

const scrapeProducts = async () => {
	
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
		args: ["--start-maximized"],
	});
	
	const page = await browser.newPage();
	await page.goto(PRODUCTS_URL);


    await page.click('.didomi-popup-notice')
    await page.waitForSelector('.giftcard-banner.svelte-153c6ej')

    const name = await page.$$eval('h2.vtmn-leading-5', (nodes) => nodes.map((node) => 
    node.innerText)) 
    const price = await page.$$eval('', (nodes) => nodes.map((node) => 
    node.innerText)) 

    console.log(name)

	// //Como la primera fila son los titulos de la tabla la vamos a eliminar
	// trs.shift();
	// //Y ahora vamos a eliminar los null de nuestra lista
	// const weaponList = trs.filter((tr) => tr !== null);

	// const jsonpRroducts = JSON.stringify(weaponList);
	// fs.writeFile("pRroducts.json", jsonpRroducts, () => {
	// 	console.log("pRroducts JSON created!");
	// });

	// //Cerraremos el navegador
	// await browser.close();
};

scrapeProducts();