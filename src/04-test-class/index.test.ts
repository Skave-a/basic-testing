import { getBankAccount } from '.';

const initialBalance = 1000;
const withdrawBalance = 100;
const moreIinitialBalance = initialBalance + 1000;
const account = getBankAccount(initialBalance);
const account2 = getBankAccount(0);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(moreIinitialBalance)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(moreIinitialBalance, account2)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(moreIinitialBalance, account)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    account.deposit(withdrawBalance);

    expect(account.getBalance()).toBe(initialBalance + withdrawBalance);
  });

  test('should withdraw money', () => {
    account.withdraw(withdrawBalance);

    expect(account.getBalance()).toBe(
      initialBalance - withdrawBalance + withdrawBalance,
    );
  });

  test('should transfer money', () => {
    account.transfer(withdrawBalance, account2);

    expect(account.getBalance()).toBe(initialBalance - withdrawBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    await account2.synchronizeBalance();

    expect(account2.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    await expect(account2.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
