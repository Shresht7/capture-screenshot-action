//  Library
import puppeteer from 'puppeteer-core'

//  Helpers
import { getChromePath, getFilePath, delay } from './helpers'

//  Types
import type { ScreenshotOptions } from 'puppeteer-core'

type captureOptions = {
    width?: number,
    height?: number,
    captureFullPage?: boolean,
    type?: ScreenshotOptions['type'],
    timeout?: number
}

/** Capture screenshot of the given URL */
export async function captureScreenshot(url: string, name: string, options?: captureOptions) {

    //  Get options
    const width = options?.width || 1920
    const height = options?.height || 1080
    const fullPage = options?.captureFullPage || false
    const type = options?.type || 'png'
    const timeout = options?.timeout || 1000

    //  Launch browser with the provided settings
    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        defaultViewport: { height, width }
    })

    //  Navigate to the given URL
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    //  Wait for some time before proceeding. Gives the page some breathing room to load properly
    await delay(timeout)

    //  Take screenshot of the webpage and save it as a PNG
    await page.screenshot({
        fullPage,
        type,
        path: `${process.env.GITHUB_WORKSPACE}/${getFilePath(name, type)}`,
    })

    //  Close the browser
    await browser.close()

}