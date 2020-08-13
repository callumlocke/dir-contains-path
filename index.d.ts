/// <reference types="node"/>

import { PlatformPath } from 'path'

/**
Check if one path is an ancestor of another

@param ancestor - Path representing a directory.
@param descendant - Path representing a file or directory.
@param pathModule - Node path module to use - Default: `require('path')`
@returns Whether `descendant` really is a descendant of `ancestor`.
*/
export function dirContainsPath(
  ancestor: string,
  descendant: string,
  pathModule?: PlatformPath
): boolean
