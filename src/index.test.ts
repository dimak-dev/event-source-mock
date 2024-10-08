import helloWorld from "./index";

describe('index.ts', () => {
    let consoleLogMock: jest.Spied<typeof console['log']>;

    beforeAll(() => {
        consoleLogMock = jest.spyOn(console, 'log')
            .mockImplementation();
    });

    afterAll(() => {
        consoleLogMock.mockRestore();
    });

    afterEach(() => {
        consoleLogMock.mockReset();
    });

    test('should be 42', () => {
        expect(helloWorld())
            .toEqual(42);
    });

    test('calling console.log', () => {
        helloWorld();

        expect(consoleLogMock)
            .toHaveBeenCalledTimes(1);
        expect(consoleLogMock)
            .toHaveBeenCalledWith('hello world');
    });
});