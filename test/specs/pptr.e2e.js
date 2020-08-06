describe('my e2e tests', () => {
    // ...

    it('replaces the WebdriverIO logo with the Puppeteer logo', () => {
        browser.url('https://webdriver.io')

        /**
         * run Puppeteer code with promises to intercept network requests
         * and replace the WebdriverIO logo in the docs with the Puppeteer logo
         */
        const wdioLogo = 'webdriverio.png'
        const pptrLogo = 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png'
        browser.call(async () => {
            const puppeteerBrowser = browser.getPuppeteer()
            const page = (await puppeteerBrowser.pages())[0]
            await page.setRequestInterception(true)
            page.on('request', (interceptedRequest) => (
                interceptedRequest.url().endsWith(wdioLogo)
                    ? interceptedRequest.continue({ url: pptrLogo })
                    : interceptedRequest.continue()
            ))
        })

        // continue with sync WebdriverIO commands
        browser.refresh()
        browser.pause(2000)
    })

})