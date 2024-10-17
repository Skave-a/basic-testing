import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);

    expect(mockCallback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const intervals = 3;

    doStuffByInterval(mockCallback, 1000);

    jest.advanceTimersByTime(1000 * intervals);

    expect(mockCallback).toHaveBeenCalledTimes(intervals);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    const file = 'file.txt';

    await readFileAsynchronously(file);

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const file = 'file.txt';

    const result = await readFileAsynchronously(file);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.mock('fs');
    jest.mock('fs/promises');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('text');
    expect(await readFileAsynchronously('file.txt')).toBe('text');
  });
});
