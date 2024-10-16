import EventSourceMockWrapper from "./eventSourceMockWrapper";

export default class EventSourceMock implements EventSource {
    readonly CLOSED: 2;
    readonly CONNECTING: 0;
    readonly OPEN: 1;

    onopen: ((this: EventSource, ev: Event) => any) | null;
    onmessage: ((this: EventSource, ev: MessageEvent) => any) | null;
    onerror: ((this: EventSource, ev: Event) => any) | null;

    public readyState: number;
    readonly url: string;
    readonly withCredentials: boolean;

    protected eventListenersMap: Map<string, Set<(...args: any[]) => void>>;

    constructor(url: string | URL, eventSourceInitDict?: EventSourceInit) {
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.CLOSED = 2;

        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;

        this.url = url.toString();
        this.withCredentials = eventSourceInitDict && eventSourceInitDict.withCredentials || false;
        this.readyState = this.CONNECTING;

        this.eventListenersMap = new Map();

        EventSourceMockWrapper.onMockInstantiated(this);
    }

    close(): void {
        this.readyState = this.CLOSED;
    }

    dispatchEvent(event: Event): boolean {
        const listeners = this.eventListenersMap.get(event.type);

        if (listeners) {
            for (const listener of listeners) {
                listener(event);
            }
        }

        switch (event.type) {
            case 'message':
                if (typeof this.onmessage === 'function') {
                    this.onmessage(event as MessageEvent);
                }
                break;
            case 'error':
                if (typeof this.onerror === 'function') {
                    this.onerror(event);
                }
                break;
            case 'open':
                if (typeof this.onopen === 'function') {
                    this.onopen(event);
                }
                break;
        }

        return true;
    }

    addEventListener(type: string, listener: (...args: any[]) => void, options?: boolean | AddEventListenerOptions): void {
        let set = this.eventListenersMap.get(type);

        if (!set) {
            set = new Set();
            this.eventListenersMap.set(type, set);
        }

        set.add(listener);
    }

    removeEventListener(type: string, listener: (...args: any[]) => void, options?: boolean | EventListenerOptions): void {
        this.eventListenersMap.get(type)?.delete(listener);
    }
}