export function example2() {
    const eventSource = new EventSource('https://example.com/events');

    eventSource.onopen = (event: Event) => console.log('onopen', event);
    eventSource.onerror = (event: Event) => console.log('onerror', event);
    eventSource.onmessage = (event: MessageEvent) => console.log('onmessage', event);

    eventSource.addEventListener('message', (event: MessageEvent) => {
        if (event.data === 'ready to close') eventSource.close();
    });
}