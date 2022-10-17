const crypto = require('crypto')

const Block = require('./block')
const Transaction = require('./transaction')

class Chain {
    static instance = new Chain()

    constructor() {
        this.chain = [new Block(null, null, new Transaction(100, 'genesis', 'Bleddyn'))]
    }

    get lastBlock() {
        const previous = this.chain[this.chain.length - 1]
        return previous
    }

    mine(nonce, difficulty = '0000') {
        let solution = 1
        console.log('...Mining / proof of work....')

        while (true) {
            const hash = crypto.createHash('SHA256')
            hash.update((nonce + solution).toString()).end()

            const hashAttempt = hash.digest('hex')

            if (hashAttempt.substring(0,4) ===  difficulty) {
                console.log(`Block has been mined with nonce: ${solution}`)
                console.log(`Block hash: ${hashAttempt}`)
                return {solution, hashAttempt}
            }

            solution += 1
            console.log(`Attempting Nonce: ${solution}`)
        }
    }

    addBlock(transaction, senderAddress, signature) {
        const verifier = crypto.createVerify('SHA256')
        verifier.update(transaction.toString())

        const isValid = verifier.verify(senderAddress, signature)

        if (isValid) {
            const nonce = Math.round(Math.random() * 9999999)
            const hashed = this.mine(nonce)
            const newBlock = new Block(this.lastBlock.hash, hashed.hashAttempt, transaction, hashed.solution)
            this.chain.push(newBlock)
        }
        
    }
}

module.exports = Chain