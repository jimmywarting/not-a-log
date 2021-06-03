/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
import { Console } from 'console'
import { Transform } from 'stream'

const ts = new Transform({ transform: (chunk, _, cb) => cb(null, chunk) })
const logger = new Console({ stdout: ts, stderr: ts, colorMode: false })
const handler = {
  get (_, prop) {
    return new Proxy(logger[prop], handler)
  },
  apply (target, _, args) {
    target.apply(logger, args)
    return (ts.read() || '').toString()
  }
}

/** @type {typeof console} */
const dump = new Proxy(logger, handler)
export default dump
