# Not a log

A tiny (20-line) console interface that returns everything as a string

- Have you ever ask yourself if you could get the string value from `console.table` rather then dumping it out to the terminal?
- have you wished that you could use console as a Template literals/engine?
- Have you thought about using [columnify](https://www.npmjs.com/package/columnify) or [table](https://www.npmjs.com/package/table) but didn't want to have a huge/large dependency to generate ascii tables?
- Do you want any of the other tools available on the `console`, like `console.time`, `console.group` or `console.count` to also return stuff as a string?

Turns out that you can (Just in NodeJS) by constructing a new [Console](https://nodejs.org/dist/latest-v16.x/docs/api/console.html#console_new_console_options) that redirects stdout/stderr to a node stream that you can then read from.
This package will do just that. This wraps all the console methods in a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), read everything that was dumped to the stream and return what it just spit out as a string.

So to live up to it's name it does not log anything to the terminal, it simply returns everything as a string 😁

### Examples

###### Using console as a template literal instead of using es6 tmpl syntax

```js
import logger from 'not-a-log'

const str = logger.log(
  'Logged message "%s" at level %d with object %o at time %s',
  lastMsg, lastLevel, lastObj, lastTime
)
console.assert(str === 'Logged message "hi" at level 30 with object { a: 1 } at time 1531590545089')
```

###### Get a list of people and output the result to a http request

```js
import http from 'node:http'
import logger from 'not-a-log'

// an array of objects
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

http.createServer((req, res) => {
  const john = new Person('John', 'Smith')
  const jane = new Person('Jane', 'Doe')
  const emily = new Person('Emily', 'Jones')
  const str = logger.table([john, jane, emily])
  res.end(str)
  /* what gets written
  ┌─────────┬───────────┬──────────┐
  │ (index) │ firstName │ lastName │
  ├─────────┼───────────┼──────────┤
  │    0    │  'John'   │ 'Smith'  │
  │    1    │  'Jane'   │  'Doe'   │
  │    2    │  'Emily'  │ 'Jones'  │
  └─────────┴───────────┴──────────┘
  */
}).listen(3000)
```

###### Getting the time in MS from console.time

```js
import logger from 'not-a-log'
import fetch from 'node-fetch'

logger.time('req')

const res = await fetch('https://httpbin.org/get')
console.log('Time it took to make the Request' logger.timeLog('req'))

const arrayBuffer = await res.arrayBuffer()
const time = logger.timeEnd('req').split(': ')[1]

console.log(`Total time for both Req+Res to httpbin was ${time}`)
```

###### Other stuff
```js
import logger from 'not-a-log'

const stackTrace = logger.trace('Houston, we got a problem')

const count = logger.count('Made a request')

let str = logger.group('Something')
str += logger.log('Nested deeply')
str += logger.info('below, under `Something`')
logger.groupEnd('Something')

// You get the idea now, every method in console
// now returns what you dumped out as a string.
```
