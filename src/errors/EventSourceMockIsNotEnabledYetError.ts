/**
 * EventSourceMock is not enabled yet.
 */
export default class EventSourceMockIsNotEnabledYetError extends Error {
    constructor() {
        const message = 'EventSourceMock is not enabled yet';

        super(message);
    }
}