const puppeteer = require("puppeteer");
const fs = require('fs');
const scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://israeldrugs.health.gov.il/#!/byDrug`, {
        waitUntil: 'networkidle2',
        timeout : 0
    });   
    const searchInputSelector  = '#homeCtrl > div.display-wrapper > ui-view > div > div > div.search-textbox-container > idr-search-textbox > div:nth-child(1) > div > form > input' 
    await page.waitForSelector(searchInputSelector)
    await page.type(searchInputSelector, 'a')
    const searchButtonSelector = '#homeCtrl > div.display-wrapper > ui-view > div > div > div.search-textbox-container > idr-search-textbox > div:nth-child(1) > div > div'
    await page.click(searchButtonSelector)
    fs.writeFileSync('israMeds.json', '[')
    const pagesSelector = '#homeCtrl > div.display-wrapper > ui-view > div > search-list > div > div > div.compareAndSortBarWrap > div > div.checkbox.selectAll > span'
    await page.waitForSelector(pagesSelector)
    const pagesNum = await page.evaluate(() => {
        const pagesSelector = '#homeCtrl > div.display-wrapper > ui-view > div > search-list > div > div > div.compareAndSortBarWrap > div > div.checkbox.selectAll > span'
        return +document.querySelector(pagesSelector).textContent.trim().split('').filter(x => !isNaN(x)).join('').trim() / 10 + 1
    })
    const roundPages = Math.floor(pagesNum)
    for (let i = 0; i < roundPages; i++){
    if (i !== 0 ) fs.appendFileSync('israMeds.json',',')
    await page.waitForNetworkIdle(page,500,0)
    const elements = await page.evaluate(() => {
        const resultSelector = '#homeCtrl > div.display-wrapper > ui-view > div > search-list > div > div > div.search_wrap.ng-scope > div'
        
        return [...document.querySelectorAll(resultSelector)]
       .map(el => {
        const hebTitleSelector = 'div.infoText > div > div > div.firstRowTitle.ng-binding'   
        const engTitleSelector = 'div.infoText > div > div > div > span'
        const activeIngredientSelector = 'div.infoText > div > div > div.secondRowTitle.moreInfo.ng-binding.ng-scope'
        return JSON.stringify({
               drugHebTitle : el.querySelector(hebTitleSelector).textContent,
               drugEngTitle : el.querySelector(engTitleSelector).textContent,
               activeIngredient : el.querySelector(activeIngredientSelector).textContent.trim().split(' ')[2]
           })
       })
    })
    fs.appendFileSync('israMeds.json',elements.toString())
    const nextPageSelector = '#homeCtrl > div.display-wrapper > ui-view > div > search-list > div > div > div.text-center > ul > li:nth-child(8) > a'
    await page.click(nextPageSelector)
}
    await browser.close();
    fs.appendFileSync('israMeds.json', ']')
};

module.exports = scrape;