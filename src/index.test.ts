import {
    disableEventSourceMock,
    enableEventSourceMock,
    EventSourceMock,
    EventSourceMockIsAlreadyEnabledError,
    EventSourceMockIsNotEnabledYetError,
} from "./index";

describe('Enable and disable mock', () => {
    afterEach(() => {
        try {
            disableEventSourceMock();
        } catch (_) {
        }
    });


    test('There is no EventSource before initialization', () => {
        expect(globalThis.EventSource)
            .toStrictEqual(undefined);
    });

    test('Throws error on multiple initialization', () => {
        const fn = () => enableEventSourceMock();

        expect(fn)
            .not
            .toThrow();

        expect(fn)
            .toThrowError(EventSourceMockIsAlreadyEnabledError);

    });

    test('Throws error on disabling without previously initialization', () => {
        const fn = () => disableEventSourceMock();

        expect(fn)
            .toThrowError(EventSourceMockIsNotEnabledYetError);
    });

    test('Throws error on multiple disabling', () => {
        enableEventSourceMock();
        const fn = () => disableEventSourceMock();

        expect(fn)
            .not
            .toThrow();

        expect(fn)
            .toThrowError(EventSourceMockIsNotEnabledYetError);
    });

    test('globalThis has EventSource (type is EventSourceMock) after enabling', () => {
        enableEventSourceMock();

        expect(globalThis.EventSource)
            .toStrictEqual(EventSourceMock);
    });

    test('globalThis has again no EventSource after disabling', () => {
        const previous = globalThis.EventSource;

        // if fails on this line - check other tests.
        expect(globalThis.EventSource).toStrictEqual(undefined);

        enableEventSourceMock();
        disableEventSourceMock();

        expect(globalThis.EventSource)
            .toStrictEqual(previous);
    });


});