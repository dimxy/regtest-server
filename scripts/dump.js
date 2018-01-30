let leveldown = require('leveldown')
let Indexd = require('indexd')
let rpc = require('../rpc')
let SCRIPTTYPE = require('indexd/indexes/script').TYPE

let db = leveldown(process.env.INDEXDB)
let indexd = new Indexd(db, rpc)

function debug () {
  if (arguments[0] instanceof Error) console.error.apply(null, arguments)
  else console.log.apply(null, arguments)
}

let MIN64 = '0000000000000000000000000000000000000000000000000000000000000000'
let MAX64 = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

db.open({}, (err) => {
  if (err) return debug(err)
  db = require('../dbwrapper')(db)

  let i = 0
  db.iterator(SCRIPTTYPE, {
    gte: { scId: MIN64, height: 0, txId: MIN64, vout: 0 },
    lte: { scId: MAX64, height: 0xffffffff, txId: MAX64, vout: 0xffffffff }
  }, (key, value) => {
    debug('KV', i, key, value)

    indexd.txoByTxo(key, (err, txo) => {
      if (err) return
      debug('TXO', txo)
    })

    ++i
  }, (err) => {
    if (err) debug(err)
    debug('FIN')
  })
})