import EventSourceMockIsAlreadyEnabledError from "./errors/EventSourceMockIsAlreadyEnabledError";
import EventSourceMock from "./eventSourceMock";
import EventSourceMockIsNotEnabledYetError from "./errors/EventSourceMockIsNotEnabledYetError";
import EventSourceMockInstance from "./eventSourceMockInstance";

/**
 * Wrapper for EventSource mock.
 */
export default class EventSourceMockWrapper {
    static readonly instances: Array<EventSourceMockInstance> = [];

    static onMockInstantiated(eventSourceMock: EventSourceMock) {
        EventSourceMockWrapper.instances.push(new EventSourceMockInstance(eventSourceMock));
    }
    
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
     * Reset all internal things for operating with mock.
     */
    mockReset = (): void => {
        EventSourceMockWrapper.instances.splice(0, EventSourceMockWrapper.instances.length);
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

    /**
     * Get all of instantiated instances.
     */
    get instances(): Array<EventSourceMockInstance> {
        return EventSourceMockWrapper.instances;
    }

    /**
     * Get latest instantiated instance.
     */
    get latestInstance(): EventSourceMockInstance | undefined {
        return EventSourceMockWrapper.instances[EventSourceMockWrapper.instances.length - 1];
    }
}