import {EventSourceMock} from "./EventSourceMock";
import EventSourceMockIsAlreadyEnabledError from "./errors/EventSourceMockIsAlreadyEnabledError";
import EventSourceMockIsNotEnabledYetError from "./errors/EventSourceMockIsNotEnabledYetError";

let isEnabled: boolean = false;
let originalEventSourceClass: any;

/**
 * Enable the mock.
 */
export function enableEventSourceMock(): void {
    if (isEnabled) {
        throw new EventSourceMockIsAlreadyEnabledError();
    }

    originalEventSourceClass = globalThis.EventSource;
    globalThis.EventSource = (EventSourceMock as any) as typeof globalThis.EventSource;
    isEnabled = true;
}

/**
 * Disable the mock.
 */
export function disableEventSourceMock(): void {
    if (!isEnabled) {
        throw new EventSourceMockIsNotEnabledYetError();
    }

    globalThis.EventSource = originalEventSourceClass;
    isEnabled = false;
}

export {EventSourceMock};

export {
    EventSourceMockIsAlreadyEnabledError,
    EventSourceMockIsNotEnabledYetError,
};