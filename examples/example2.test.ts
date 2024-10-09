import eventSourceMock from '../src';
import {example2} from "./example2";

describe('Server-Side events, example 2', () => {
    beforeAll(() => {
        eventSourceMock.mockInit();
    });

    afterEach(() => {
        eventSourceMock.mockReset();
    })

    afterAll(() => {
        eventSourceMock.mockRestore();
    });

    test('should correct url passed to constructor', () => {
        example2();

        // get the latest instance
        const instance = eventSourceMock.latestInstance!;

        expect(instance.mock.url)
            .toEqual('https://example.com/events');
    });

    test('should correct readyState (=0) after instantiating', () => {
        example2();

        // get the latest instance
        const instance = eventSourceMock.latestInstance!;

        expect(instance.mock.readyState)
            .toEqual(0);
    });

    test('should correct readyState (=1) after opening', () => {
        example2();

        // get the latest instance
        const instance = eventSourceMock.latestInstance!;

        instance.open();

        expect(instance.mock.readyState)
            .toEqual(1);
    });

    test('should correct dispatch the events', () => {
        const consoleLogMock = jest.spyOn(console, 'log')
            .mockImplementation();

        example2();

        // get the latest instance
        const instance = eventSourceMock.latestInstance!;

        const openEvent = new Event('open');
        const errorEvent = new Event('error');
        const messageEvent = new MessageEvent('message');

        instance.dispatchEvent(openEvent);
        instance.dispatchEvent(errorEvent);
        instance.dispatchEvent(messageEvent);

        expect(consoleLogMock)
            .toHaveBeenCalledTimes(3);

        expect(consoleLogMock)
            .toHaveBeenNthCalledWith(1, 'onopen', openEvent);

        expect(consoleLogMock)
            .toHaveBeenNthCalledWith(1, 'onopen', openEvent);
        expect(consoleLogMock)
            .toHaveBeenNthCalledWith(2, 'onerror', errorEvent);
        expect(consoleLogMock)
            .toHaveBeenNthCalledWith(3, 'onmessage', messageEvent);
    });
});