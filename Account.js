class Account {
    constructor(id, balance = 0) {
        this.id = id;
        this.balance = balance;
    }

/**
 * Deposits a specified amount into the account balance.
 * @param {number} amount - The amount to deposit into the account.
 * @returns {Account} The current account instance.
 */
    deposit(amount) {
        this.balance += amount;
        return this;
    }

/**
 * Withdraws a specified amount from the account balance.
 * @param {number} amount - The amount to withdraw from the account.
 * @returns {Account} The current account instance.
 */
    withdraw(amount) {
        this.balance -= amount;
        return this;
    }

    /**
     * Retrieves the current account balance.
     * @returns {number} The current account balance.
     */
    getBalance() {
        return this.balance;
    }
}

module.exports = Account;