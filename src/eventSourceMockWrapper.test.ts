import {
    EventSourceMockIsAlreadyEnabledError,
    EventSourceMockIsNotEnabledYetError,
} from "./index";
import EventSourceMock from "./eventSourceMock";
import EventSourceMockWrapper from "./eventSourceMockWrapper";
import EventSourceMockInstance from "./eventSourceMockInstance";

describe('class EventSourceMockWrapper', () => {
    let eventSourceMockWrapper: EventSourceMockWrapper;

    beforeEach(() => {
        eventSourceMockWrapper = new EventSourceMockWrapper();
    });

    test('There is no EventSource before initialization', () => {
        expect(globalThis.EventSource)
            .toStrictEqual(undefined);
    });

    test('Throws error on disabling without previously initialization', () => {
        const fn = () => eventSourceMockWrapper.mockRestore();

        expect(fn)
            .toThrowError(EventSourceMockIsNotEnabledYetError);
    });

    test('Throws error on multiple disabling', () => {
        eventSourceMockWrapper.mockInit();
        const fn = () => eventSourceMockWrapper.mockRestore();

        expect(fn)
            .not
            .toThrow();

        expect(fn)
            .toThrowError(EventSourceMockIsNotEnabledYetError);
    });

    test('globalThis has again no EventSource after disabling', () => {
        const previous = globalThis.EventSource;

        // if fails on this line - check other tests.
        expect(globalThis.EventSource).toStrictEqual(undefined);

        eventSourceMockWrapper.mockInit();
        eventSourceMockWrapper.mockRestore();

        expect(globalThis.EventSource)
            .toStrictEqual(previous);
    });

    describe('Initialization mock and restoration default implementation', () => {
        beforeEach(() => {
            eventSourceMockWrapper.mockInit();
        });
        afterEach(() => {
            eventSourceMockWrapper.mockReset();
        });
        afterAll(() => {
            eventSourceMockWrapper.mockRestore();
        });

        test('Throws error on multiple initialization', () => {
            const fn = () => eventSourceMockWrapper.mockInit();

            expect(fn)
                .toThrowError(EventSourceMockIsAlreadyEnabledError);
        });

        test('globalThis has EventSource (type is EventSourceMock) after enabling', () => {
            expect(globalThis.EventSource)
                .toStrictEqual(EventSourceMock);
        });

        test('pushing and getting instances and the latest instance', () => {
            const mockInstance1 = new EventSourceMock('');
            const mockInstance2 = new EventSourceMock('');

            expect(eventSourceMockWrapper.instances)
                .toHaveLength(2);
            expect(eventSourceMockWrapper.instances[0])
                .toHaveProperty('mock', mockInstance1);
            expect(eventSourceMockWrapper.instances[1])
                .toHaveProperty('mock', mockInstance2);

            expect(eventSourceMockWrapper.latestInstance?.mock)
                .toEqual(mockInstance2);
        });
    });
});