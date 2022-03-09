//  Library
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as io from '@actions/io'

//  Helpers
import { config } from './library'
import { getFilePath, delay } from './helpers'

//  Types
import type { Page } from 'puppeteer-core'

/** Capture screenshot of the given URL */
export async function captureScreenshot(page: Page) {

    //  Get options
    const url = config.url
    const name = config.name
    const type = config?.type || 'png'
    const fullPage = config?.captureFullPage || false
    const duration = config?.delay || 1000
    const darkMode = config?.darkMode || false

    //  Navigate to the given URL
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    //  Enable dark-mode if needed
    if (darkMode) {
        page.emulateMediaFeatures([
            { name: 'prefers-color-scheme', value: 'dark' }
        ])
    }

    //  Wait for some time before proceeding. Gives the page some breathing room to load properly
    await delay(duration)

    //  Create sub-directory if it doesn't exist
    if (!fs.existsSync(path.dirname(name))) {
        await io.mkdirP(path.dirname(name))
    }

    //  Take screenshot of the webpage and save it as a PNG
    await page.screenshot({
        fullPage,
        type,
        path: `${process.env.GITHUB_WORKSPACE}/${getFilePath(name, type)}`,
    })

}