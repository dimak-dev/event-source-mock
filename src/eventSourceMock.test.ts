import EventSourceMock from "./eventSourceMock";

class EventSourceMockTest extends EventSourceMock {
    /**
     * Tricks for accessing to protected `eventListenersMap`.
     *
     * `eventListenersMap` is not accessible from anywhere, except this test suite.
     */
    getEventListenersMap = () => this.eventListenersMap;
}

describe('EventSource Mock', () => {
    describe('constructor', () => {
        test('URL as string', () => {
            expect(new EventSourceMock('https://example.com/test'))
                .toHaveProperty('url', 'https://example.com/test');
        });

        test('URL as URL', () => {
            expect(new EventSourceMock(new URL('https://example.com/test')))
                .toHaveProperty('url', 'https://example.com/test');
        });

        test('default withCredentials is false', () => {
            expect(new EventSourceMock(new URL('https://example.com/test')))
                .toHaveProperty('withCredentials', false);
        });

        test('withCredentials = true from options', () => {
            expect(new EventSourceMock('', {withCredentials: true}))
                .toHaveProperty('withCredentials', true);
        });

        test('withCredentials = false from options', () => {
            expect(new EventSourceMock('', {withCredentials: false}))
                .toHaveProperty('withCredentials', false);
        });

        test('default readyState is CONNECTING (= 0)', () => {
            expect(new EventSourceMock(''))
                .toHaveProperty('readyState', 0);
        });

        test('initialized listeners map', () => {
            expect(new EventSourceMock(''))
                .toHaveProperty('eventListenersMap');

            const esm = new EventSourceMockTest('');

            expect(esm.getEventListenersMap())
                .toBeInstanceOf(Map);
        });
    });

    test('Change readyState to CLOSED after call .close()', () => {
        const esm = new EventSourceMock('');

        esm.close();

        expect(esm)
            .toHaveProperty('readyState', 2);
    });

    test('It is possible to add event listener over .onmessage, .onerror, .onopen', () => {
        const esm = new EventSourceMock('');
        const expectedOnOpenListener = () => {
        };
        const expectedOnErrorListener = () => {
        };
        const expectedOnMessageListener = () => {
        };

        esm.onmessage = expectedOnMessageListener;
        esm.onerror = expectedOnErrorListener;
        esm.onopen = expectedOnOpenListener;

        expect(esm)
            .toHaveProperty('onmessage', expectedOnMessageListener);
        expect(esm)
            .toHaveProperty('onerror', expectedOnErrorListener);
        expect(esm)
            .toHaveProperty('onopen', expectedOnOpenListener);
    });

    test('There is no error if there is no any event listeners', () => {
        const esm = new EventSourceMock('');

        const fn = () => esm.dispatchEvent(new Event('message'));

        expect(fn)
            .not
            .toThrow();
    });

    describe('Add and remove event listeners', () => {
        let esm: EventSourceMock;
        let actualEventListenersMap: EventSourceMock['eventListenersMap'];

        beforeAll(() => {
            esm = new EventSourceMockTest('');
            actualEventListenersMap = (esm as EventSourceMockTest).getEventListenersMap();
        });

        test('add and remove one onError', () => {
            const expectedOnErrorListener = () => {
            };

            esm.addEventListener('error', expectedOnErrorListener);

            const actualOnErrorListeners = actualEventListenersMap.get('error')!;

            expect(actualOnErrorListeners)
                .toBeInstanceOf(Set);
            expect(actualOnErrorListeners.has(expectedOnErrorListener))
                .toBeTruthy();

            esm.removeEventListener('error', expectedOnErrorListener);
            expect(actualOnErrorListeners.has(expectedOnErrorListener))
                .toBeFalsy();
        });

        test('add one onOpen', () => {
            const expectedOnOpenListener = () => {
            };

            esm.addEventListener('open', expectedOnOpenListener);

            const actualOnOpenListeners = actualEventListenersMap.get('open')!;

            expect(actualOnOpenListeners)
                .toBeInstanceOf(Set);
            expect(actualOnOpenListeners.has(expectedOnOpenListener))
                .toBeTruthy();

            esm.removeEventListener('open', expectedOnOpenListener);
            expect(actualOnOpenListeners.has(expectedOnOpenListener))
                .toBeFalsy();
        });

        test('add three onMessage and remove only one', () => {
            const expectedOnMessageListener = () => {
            };
            const expectedOnMessageListener2 = () => {
            };
            const expectedOnMessageListener3 = () => {
            };

            esm.addEventListener('message', expectedOnMessageListener);
            esm.addEventListener('message', expectedOnMessageListener2);
            esm.addEventListener('message', expectedOnMessageListener3);

            const actualOnMessageListeners = actualEventListenersMap.get('message')!;

            expect(actualOnMessageListeners)
                .toBeInstanceOf(Set);
            expect(actualOnMessageListeners.has(expectedOnMessageListener))
                .toBeTruthy();
            expect(actualOnMessageListeners.has(expectedOnMessageListener2))
                .toBeTruthy();
            expect(actualOnMessageListeners.has(expectedOnMessageListener3))
                .toBeTruthy();

            esm.removeEventListener('message', expectedOnMessageListener3);

            expect(actualOnMessageListeners.has(expectedOnMessageListener3))
                .toBeFalsy();

            expect(actualOnMessageListeners.has(expectedOnMessageListener))
                .toBeTruthy();
            expect(actualOnMessageListeners.has(expectedOnMessageListener2))
                .toBeTruthy();
        });
    });

    describe('Dispatch events', () => {
        let esm: EventSourceMock;

        beforeEach(() => {
            esm = new EventSourceMock('');
        });

        test('Dispatch onOpen event', () => {
            const listener1 = jest.fn();
            const listener2 = jest.fn();
            const expectedOnOpenEvent = new Event('open');

            esm.addEventListener('open', listener1);
            esm.onopen = listener2;

            esm.dispatchEvent(expectedOnOpenEvent);

            expect(listener1)
                .toHaveBeenCalledTimes(1);
            expect(listener1)
                .toHaveBeenCalledWith(expectedOnOpenEvent);
            expect(listener2)
                .toHaveBeenCalledTimes(1);
            expect(listener2)
                .toHaveBeenCalledWith(expectedOnOpenEvent);
        });

        test('Dispatch onError event', () => {
            const listener1 = jest.fn();
            const listener2 = jest.fn();
            const expectedOnErrorEvent = new Event('error');

            esm.addEventListener('error', listener1);
            esm.onerror = listener2;

            esm.dispatchEvent(expectedOnErrorEvent);

            expect(listener1)
                .toHaveBeenCalledTimes(1);
            expect(listener1)
                .toHaveBeenCalledWith(expectedOnErrorEvent);
            expect(listener2)
                .toHaveBeenCalledTimes(1);
            expect(listener2)
                .toHaveBeenCalledWith(expectedOnErrorEvent);
        });

        test('Dispatch onMessage event', () => {
            const listener1 = jest.fn();
            const listener2 = jest.fn();
            const expectedOnMessageEvent = new MessageEvent('message');

            esm.addEventListener('message', listener1);
            esm.onmessage = listener2;

            esm.dispatchEvent(expectedOnMessageEvent);

            expect(listener1)
                .toHaveBeenCalledTimes(1);
            expect(listener1)
                .toHaveBeenCalledWith(expectedOnMessageEvent);
            expect(listener2)
                .toHaveBeenCalledTimes(1);
            expect(listener2)
                .toHaveBeenCalledWith(expectedOnMessageEvent);
        });
    });
});