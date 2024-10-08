/**
 * EventSourceMock is already enabled.
 */
export default class EventSourceMockIsAlreadyEnabledError extends Error {
    constructor() {
        const message = 'EventSourceMock is already enabled';

        super(message);
    }
}