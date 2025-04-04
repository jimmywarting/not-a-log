/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
import { Console } from 'node:console'
import { Transform } from 'node:stream'

const ts = new Transform({ transform: (chunk, _, cb) => cb(null, chunk) })
const logger = new Console({ stdout: ts, stderr: ts, colorMode: false })
const handler = {
  get (_, prop) {
    return Object.hasOwn(logger, prop)
      ? new Proxy(logger[prop], handler)
      : undefined;
  },
  apply (target, _, args) {
    target.apply(logger, args)
    return (ts.read() || '').toString()
  }
}

/** @type {typeof console} */
const dump = new Proxy(logger, handler)
export default dump
