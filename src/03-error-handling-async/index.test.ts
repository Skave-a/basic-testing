import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const value = 'value';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(value);

    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => throwError(value);

    expect(result).toThrow(value);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();

    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();

    expect(result).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = () => rejectCustomError();

    await expect(result).rejects.toThrow(MyAwesomeError);
  });
});
