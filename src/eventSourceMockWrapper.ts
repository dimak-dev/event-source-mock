import EventSourceMockIsAlreadyEnabledError from "./errors/EventSourceMockIsAlreadyEnabledError";
import {EventSourceMock} from "./EventSourceMock";
import EventSourceMockIsNotEnabledYetError from "./errors/EventSourceMockIsNotEnabledYetError";

/**
 * Wrapper for EventSource mock.
 */
export class EventSourceMockWrapper {
    private isEnabled: boolean;
    private originalEventSourceClass: any;

    constructor() {
        this.isEnabled = false;
    }

    /**
     * Initialize the mock.
     *
     * @throws {EventSourceMockIsAlreadyEnabledError} if EventSource mock is already initialized.
     */
    mockInit = () => {
        if (this.isEnabled) {
            throw new EventSourceMockIsAlreadyEnabledError();
        }

        this.originalEventSourceClass = globalThis.EventSource;
        globalThis.EventSource = (EventSourceMock as any) as typeof globalThis.EventSource;
        this.isEnabled = true;
    }

    /**
     * Restore default implementation of EventSource.
     *
     * @throws {EventSourceMockIsNotEnabledYetError} if EventSource mock is not yet initialized.
     */
    mockRestore = () => {
        if (!this.isEnabled) {
            throw new EventSourceMockIsNotEnabledYetError();
        }

        globalThis.EventSource = this.originalEventSourceClass;
        this.isEnabled = false;
    }
}