'use strict'

const systemPathModule = require('path')

function dirContainsPath(ancestor, descendant, pathModule) {
  // Default to standard path module for current OS
  if (!pathModule) pathModule = systemPathModule

  // Validate arguments
  {
    if (typeof ancestor !== 'string') {
      throw new TypeError(
        'Expected first argument to be a string, received ' + typeof ancestor
      )
    }

    if (typeof descendant !== 'string') {
      throw new TypeError(
        'Expected second argument to be a string, received ' + typeof descendant
      )
    }

    if (ancestor === '') {
      throw new Error('Received empty string for first argument')
    }

    if (descendant === '') {
      throw new Error('Received empty string for second argument')
    }

    if (!pathModule.isAbsolute(ancestor)) {
      throw new Error('First argument must be an absolute path')
    }
  }

  // Normalize ancestor
  let resolvedAncestor = pathModule.normalize(ancestor)

  // Add a trailing path separator for easier comparison
  if (resolvedAncestor !== '/') resolvedAncestor += pathModule.sep

  // Resolve descendant path from the ancestor (has no effect if descendant is already absolute)
  const resolvedDescendant = pathModule.resolve(resolvedAncestor, descendant)

  // Edge case: paths exactly the same
  if (resolvedAncestor === resolvedDescendant) return false

  // Finally, do the check
  return resolvedDescendant.startsWith(resolvedAncestor)
}

module.exports.dirContainsPath = dirContainsPath
