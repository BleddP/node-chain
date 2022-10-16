const crypto = require('crypto')

const Transaction = require('./transaction')
const Chain = require('./chain')

class Wallet {
    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {type: 'spki', format: 'pem'},
            privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
        })
        this.publicKey = keypair.publicKey
        this.privateKey = keypair.privateKey
    }

    sendMoney(amount, payeeAddress) {
        const transaction = new Transaction(amount, this.publicKey, payeeAddress)

        const sign = crypto.createSign('SHA256')
        sign.update(transaction.toString()).end()

        const signature = sign.sign(this.privateKey)
        Chain.instance.addBlock(transaction, this.publicKey, signature)
    }
}

module.exports = Wallet