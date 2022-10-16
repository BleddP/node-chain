const crypto = require('crypto')

class Block {
    constructor(
        previousBlock,
        currentBlock,
        transaction,
        nonce,
        timestamp = Date.now(),
    ) {
        this.previousBlock = previousBlock
        this.currentBlock = currentBlock
        this.transaction = transaction
        this.nonce = nonce
        this.timestamp = timestamp
    }

    get hash() {
        const block = JSON.stringify(this)
        const hash = crypto.createHash('SHA256')
        hash.update(block)
        return hash.digest('hex')
    }
}

module.exports = Block