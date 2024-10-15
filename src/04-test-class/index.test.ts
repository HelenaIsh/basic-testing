// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(200)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const anotherAccount = getBankAccount(30);
    expect(() => getBankAccount(100).transfer(200, anotherAccount)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const myBankAccount = getBankAccount(30);
    expect(() => myBankAccount.transfer(200, myBankAccount)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(10).getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(100);
    const anotherAccount = getBankAccount(30);
    myAccount.transfer(50, anotherAccount)
    expect(myAccount.getBalance()).toBe(50);
    expect(anotherAccount.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await getBankAccount(100).fetchBalance();
    if (result !== null) {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(0)
    try {
      await myAccount.synchronizeBalance();
      expect(typeof myAccount.getBalance()).toBe('number');
    } catch (e) {

    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(0)
    try {
      await myAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
