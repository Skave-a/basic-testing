import lodash from 'lodash';
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
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    const account3 = getBankAccount(0);

    const balance = await account3.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    const account3 = getBankAccount(0);

    await account3.synchronizeBalance();

    expect(account3.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 0);

    await expect(account2.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
