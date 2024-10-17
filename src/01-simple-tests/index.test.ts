// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const a = 3;
const b = 2;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });

    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });

    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });

    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });

    expect(result).toBe(1.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });

    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: 'action' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: '3',
      b: 2,
      action: Action.Add,
    };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });
});
