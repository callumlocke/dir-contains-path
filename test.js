const { dirContainsPath } = require('.')

describe('POSIX', () => {
  describe('with absolute descendant', () => {
    test.each([
      ['/foo', '/foo/bar/baz', true],
      ['/foo', '/other/bar/baz', false],
      ['/foo', '/foo/../bar/baz', false],
      ['/foo', '/foo/../foo/bar/baz', true],
      ['/foo', '/foo', false],
      ['/', '/', false]
    ])('dirContainsPath(%s, %s): %s', (a, b, expected) => {
      expect(dirContainsPath(a, b)).toBe(expected)
    })
  })

  describe('with relative descendant', () => {
    test.each([
      ['/foo', 'bar/baz', true],
      ['/foo', './bar/baz', true],
      ['/foo', '../foo/bar/baz', true],
      ['/foo', '../../x/foo/bar/baz', false]
    ])('dirContainsPath(%s, %s): %s', (a, b, expected) => {
      expect(dirContainsPath(a, b)).toBe(expected)
    })
  })

  describe('errors', () => {
    test.each([
      // Paths must both be strings
      [1, '/foo'],
      ['/foo', 1],

      // Paths must both be non-empty
      ['/foo', ''],
      ['', '/foo'],

      // First path must be absolute
      ['foo', '/foo'],
      ['foo', 'foo']
    ])('dirContainsPath(%s, %s): throws error', (a, b) => {
      expect(() => {
        dirContainsPath(a, b)
      }).toThrow()
    })
  })
})

describe('Windows', () => {
  const win32Path = require('path').win32

  describe('with absolute descendant', () => {
    test.each([
      ['C:\\foo', 'C:\\foo\\bar\\baz', true],
      ['C:\\foo', 'C:\\other\\bar\\baz', false],
      ['C:\\foo', 'C:\\foo\\..\\bar\\baz', false],
      ['C:\\foo', 'C:\\foo\\..\\foo\\bar\\baz', true],
      ['C:\\foo', 'C:\\foo', false],
      ['C:\\', 'C:\\', false]
    ])('dirContainsPath(%s, %s): %s', (a, b, expected) => {
      expect(dirContainsPath(a, b, win32Path)).toBe(expected)
    })
  })

  describe('with relative descendant', () => {
    test.each([
      ['C:\\foo', 'bar\\baz', true],
      ['C:\\foo', '.\\bar\\baz', true],
      ['C:\\foo', '..\\foo\\bar\\baz', true],
      ['C:\\foo', '..\\..\\x\\foo\\bar\\baz', false]
    ])('dirContainsPath(%s, %s): %s', (a, b, expected) => {
      expect(dirContainsPath(a, b, win32Path)).toBe(expected)
    })
  })

  describe('errors', () => {
    test.each([
      // Paths must both be strings
      [1, 'C:\\foo'],
      ['C:\\foo', 1],

      // Paths must both be non-empty
      ['C:\\foo', ''],
      ['', 'C:\\foo'],

      // First path must be absolute
      ['foo', 'C:\\foo'],
      ['foo', 'foo']
    ])('dirContainsPath(%s, %s): throws error', (a, b) => {
      expect(() => {
        dirContainsPath(a, b, win32Path)
      }).toThrow()
    })
  })
})
