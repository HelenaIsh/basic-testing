// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action.Add})).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action.Subtract})).toBe(4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action.Multiply})).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action.Divide})).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action.Exponentiate})).toBe(36);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 6, b:2, action: Action})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: 6, b:{b:2}, action: Action.Add})).toBe(null);
  });
});
