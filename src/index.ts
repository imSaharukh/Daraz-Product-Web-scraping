import puppeteer from 'puppeteer';
import * as xlsx from 'xlsx';
// import {GoogleSpreadsheet}  from 'google-spreadsheet';
// import creds from './airy-shuttle-270106-62c530ed0558.json';
// const doc = new GoogleSpreadsheet('1W6D3RH1iDNFLD4lGBhccv5aqqIFnQh98cIwXl3rmLOI');

(async () => {
    // await doc.useServiceAccountAuth(creds);
 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.daraz.com.bd/laptops/?spm=a2a0e.home.cate_1.3.735245913S7P7Z',{timeout: 0});
 const products = await page.evaluate(()=> Array.from(document.querySelectorAll('.c1_t2i > .c2prKC'))
 .map((product) => {return  {name:(product.querySelector('.c16H9d')as HTMLElement)?.innerText , 
 price : (product.querySelector('.c13VH6')as HTMLElement)?.innerText } }))

 console.log(products);
  await browser.close();
const aoa:string[][] = products.map(l => [l.name,l.price]);
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(aoa);
  xlsx.utils.book_append_sheet(wb,ws);
  xlsx.writeFile(wb,"links.xlsx");
})();