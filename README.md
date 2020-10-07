# regtest-server

This is a functioning [express](https://www.npmjs.com/package/express) HTTP API written using [indexd](https://www.npmjs.com/package/indexd).

* Requires a running `bitcoind` node
	* with `-txindex`, and
	* ZMQ (`-zmqpubhashtx=tcp://127.0.0.1:30001 -zmqpubhashblock=tcp://127.0.0.1:30001`)
* Change `-rpcworkqueue` from `16` to `32` for increased throughput (in typical scenarios)

# Changes for Komodo

Added changes allowing to work with komodod
Also requires 'indexd' with updates for komodod 
and bitcoinjs-lib with an added kmd chain params to network.js
