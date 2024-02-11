import { generateLinkedList } from './index';

const values = ['1', '2', '3', '4', '5'];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const value = ['1'];

    const expectedLinkedList = {
      value: '1',
      next: {
        value: null,
        next: null,
      },
    };

    const linkedList = generateLinkedList(value);
    expect(linkedList).toEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
