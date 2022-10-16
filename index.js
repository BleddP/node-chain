const Wallet = require('./components/wallet')
const Chain = require('./components/chain')

const bleddyn = new Wallet()
const bob = new Wallet()
const alice = new Wallet()
const tiffany = new Wallet()
const howard = new Wallet()

bleddyn.sendMoney(50, bob.publicKey)
bob.sendMoney(100, alice.publicKey)
alice.sendMoney(200, bleddyn.publicKey)
tiffany.sendMoney(142, bleddyn.publicKey)
howard.sendMoney(244, bob.publicKey)

console.log(Chain.instance)