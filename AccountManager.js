
const Account = require('./Account');

class AccountManager {
    constructor() {
        // Use map to ensure unique account IDs
        this.accounts = new Map();
    }

    /**
     * Resets the account manager's state, removing all accounts.
     */
    reset() {
        this.accounts.clear();
    }

    /**
     * Retrieves an account by its ID.
     * @param {string} id - The ID of the account to retrieve.
     * @returns {Account|undefined} The account with the specified ID, or undefined if not found.
     */
    getAccount(id) {
        return this.accounts.get(id);
    }

    /**
     * Creates a new account with the specified ID and adds it to the account manager.
     * @param {string} id - The ID of the account to create.
     * @returns {Account} The newly created account.
     */
    createAccount(id) {
        const account = new Account(id);
        this.accounts.set(id, account);
        return account;
    }

    /**
     * Retrieves an account by its ID or creates a new one if it doesn't exist.
     * @param {string} id - The ID of the account to retrieve or create.
     * @returns {Account} The existing or newly created account.
     */
    getOrCreateAccount(id) {
        return this.getAccount(id) || this.createAccount(id);
    }
}

module.exports = AccountManager;