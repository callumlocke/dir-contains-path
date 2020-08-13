# dir-contains-path

Check if one path is an ancestor of another. Includes TypeScript declaration.

[![npm version](https://img.shields.io/npm/v/dir-contains-path.svg)](https://www.npmjs.com/package/dir-contains-path)

## Installation

```sh
> npm install path-contains-path
# or
> yarn add path-contains-path
```

## Usage

```ts
import { dirContainsPath } from 'dir-contains-path'
// OR: const { dirContainsPath } = require('dir-contains-path')

if (dirContainsPath('/foo', '/foo/bar/baz')) {
    console.log('yes it does')
}
```

## Examples

```js
// Basic examples
dirContainsPath('/foo', '/foo/bar/baz')          // ✅
dirContainsPath('/foo', '/foo/bar/baz')          // ✅

dirContainsPath('/foo', '/other/bar/baz')        // ❌
dirContainsPath('/foo', '/foo/../other/bar/baz') // ❌

// Relative descendant paths are resolved from the ancestor
dirContainsPath('/foo', 'anything')              // ✅
dirContainsPath('/foo', './anything')            // ✅
dirContainsPath('/foo', '../foo/anything')       // ✅

dirContainsPath('/foo', '../outside')            // ❌

// Returns false when both paths are effectively the same
dirContainsPath('/foo', '/foo')                  // ❌
dirContainsPath('/foo', '/foo/bar/..')           // ❌
```

## API

```ts
dirContainsPath(ancestor: string, descendant: string, path?: path.PlatformPath): boolean
```

- `ancestor` – path representing a directory
- `descendant` - path representing another file/directory that you want to check is a descendant of `ancestor`
- `path` (optional) - the Node.js `path` module of your choice. Defaults to `require('path')`.
  - In rare situations you might want to override this with e.g. `require('path').posix` or `require('path').win32`.

## Errors

The function will throw an error:

- If either argument is a non-string, or an empty string.
- If the first argument (`ancestor`) is not an absolute path.
  - This is because it's not obvious what the expected behaviour would be in this case, so it's likely to be a bug.

## Alternatives

- [subdir](https://www.npmjs.com/package/subdir)
- [is-subdir](https://www.npmjs.com/package/is-subdir)
- [@webpro/is-subdir](https://www.npmjs.com/package/@webpro/is-subdir)

> **Why make `dir-contains-path` if several existing packages do the same thing?**
>
> Mainly because I can never remember which way round the arguments go. For me, the name `dirContainsPath(a, b)` makes it less ambiguous.

## Development

- Use yarn
- Run tests with `yarn test`
- Use prettier (via editor plugin)
- To publish:
  - Update `package.json` version to e.g. `1.2.3`
  - Add a commit on master with the message: `Release 1.2.3`
  - GitHub action should now publish it automatically.
