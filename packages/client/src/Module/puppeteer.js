// /* eslint-disable import/prefer-default-export */
// const puppeteer = require('puppeteer');
// // const fs = require('fs');

// export const captureImage = async () => {
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();
//     const viewSource = await page.goto('https://www.naver.com');

//     // console.log(await page.content());
//     await page.screenshot({ path: 'screenshot.png', fullPage: true });

//     // fs.writeFile('screenshot.png', await viewSource.buffer(), err => {
//     //     if (err) {
//     //         return console.log(err);
//     //     }

//     //     console.log('The file was saved!');
//     // });
//     await browser.close();
// };
