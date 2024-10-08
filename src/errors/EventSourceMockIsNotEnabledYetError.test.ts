import EventSourceMockIsNotEnabledYetError from "./EventSourceMockIsNotEnabledYetError";

describe('EventSourceMockIsNotEnabledYetError', () => {
    test('message', () => {
        const error = new EventSourceMockIsNotEnabledYetError();

        expect(error)
            .toHaveProperty('message', 'EventSourceMock is not enabled yet');
    });
});