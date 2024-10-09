const eventSourceMock = require('../src').default;

describe('Server-Side events, example 1', () => {
    beforeAll(() => {
        eventSourceMock.mockInit();
    });

    afterAll(() => {
        eventSourceMock.mockRestore();
    });

    test('should handle server-sent events correctly', () => {
        const url = 'https://example.com/events';
        const eventSource = new EventSource(url);

        const onOpenHandler = jest.fn();
        const onMessageHandler = jest.fn();

        // Subscribe on events
        eventSource.addEventListener('open', onOpenHandler);
        eventSource.addEventListener('message', onMessageHandler);

        // Simulate an open connection
        eventSource.dispatchEvent(new Event('open'));

        // Simulate receiving a message
        const eventData = {data: JSON.stringify({foo: 'bar'})};
        const messageEvent = new MessageEvent('message', eventData);
        eventSource.dispatchEvent(messageEvent);

        // Assertions
        expect(onOpenHandler).toHaveBeenCalledTimes(1);
        expect(onMessageHandler).toHaveBeenCalledTimes(1);
        expect(onMessageHandler).toHaveBeenCalledWith(expect.objectContaining({
            data: '{"foo":"bar"}'
        }));
    });
});