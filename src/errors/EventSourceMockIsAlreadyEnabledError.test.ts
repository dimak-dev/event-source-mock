import EventSourceMockIsAlreadyEnabledError from "./EventSourceMockIsAlreadyEnabledError";

describe('EventSourceMockIsAlreadyEnabledError', () => {
    test('message', () => {
        const error = new EventSourceMockIsAlreadyEnabledError();

        expect(error)
            .toHaveProperty('message', 'EventSourceMock is already enabled');
    });
});