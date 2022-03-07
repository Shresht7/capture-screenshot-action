//  Library
import * as core from '@actions/core'

//  ======
//  CONFIG
//  ======

/** URL to take screenshot of */
export const url: string = core.getInput('url', { required: true })

/** Screenshot width */
export const width: number = parseInt(core.getInput('width'))
/** Screenshot height */
export const height: number = parseInt(core.getInput('height'))

/** Screenshot fileName */
export const name: string = core.getInput('name')

/** Boolean flag to determine if the action generates artifacts */
export const createArtifacts: boolean = core.getBooleanInput('createArtifacts')