import EventSourceMockIsAlreadyEnabledError from "./errors/EventSourceMockIsAlreadyEnabledError";
import EventSourceMockIsNotEnabledYetError from "./errors/EventSourceMockIsNotEnabledYetError";
import {EventSourceMockWrapper} from "./eventSourceMockWrapper";

const eventSourceMock = new EventSourceMockWrapper();

export {
    EventSourceMockIsAlreadyEnabledError,
    EventSourceMockIsNotEnabledYetError,
};

export default eventSourceMock;