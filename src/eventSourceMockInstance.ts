import type EventSourceMock from "./eventSourceMock";

export default class EventSourceMockInstance {
    private readonly eventSourceMock: EventSourceMock;

    /**
     * Mock.
     */
    get mock(): EventSourceMock {
        return this.eventSourceMock;
    }

    constructor(eventSourceMock: EventSourceMock) {
        this.eventSourceMock = eventSourceMock;
    }

    /**
     * Set readyState = 1 (= OPEN) and fire onopen event (if property `dispatchEvent` === `true`).
     *
     * @param {boolean} [dispatchEvent] Dispatch `onopen` event or not. Default: `false`
     * @param {Event} [customOpenEvent] Custom event, If not present - event will be created.
     */
    open = (dispatchEvent: boolean = false, customOpenEvent: Event = new Event('open')): void => {
        this.eventSourceMock.readyState = 1;
        if (dispatchEvent) {
            this.eventSourceMock.dispatchEvent(customOpenEvent)
        }
    }

    /**
     * Dispatch event.
     *
     * @param {Event | MessageEvent} event Event to dispatch.
     */
    dispatchEvent = (event: Event | MessageEvent): void => {
        this.eventSourceMock.dispatchEvent(event);
    }
}