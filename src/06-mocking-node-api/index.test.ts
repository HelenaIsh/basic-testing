// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { readFile } from 'fs/promises';
import fs from 'fs'

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path'); 

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(900);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);  
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
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(1);  
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 300;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalledTimes(3);  
  });
});

describe('readFileAsynchronously', () => {
  const filePath = 'test.txt';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously(filePath)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const mockPathToFile = 'test.txt';
    const mockFileContent = 'Mock file content';

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBe(mockFileContent);
  });
});
