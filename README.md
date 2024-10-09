# EventSource Mock

This repository provides a mock implementation of the `EventSource` interface in JavaScript,
designed to facilitate unit testing for applications that rely on server-sent events (SSE). 
One common issue faced by developers is the lack of a native `EventSource` implementation in Node.js environments,
where `EventSource` is not defined. This mock addresses that gap, allowing developers to simulate and test 
the behavior of `EventSource` without requiring an actual server connection.


## Features

- **Simulate Server-Sent Events**: Easily trigger events such as `message`, `open`, and `error`.
- **Customizable Event Data**: Define the data payload for each event to test various scenarios.
- **Integration with Testing Frameworks**: Compatible with popular JavaScript testing frameworks like Jest, Mocha, and Jasmine.

## Installation

To install the mock, you can use NPM:

```bash
npm install @dimak.dev/event-source-mock
```

or Yarn:
```bash
yarn add @dimak.dev/event-source-mock
```

or PNPM:
```bash
pnpm add @dimak.dev/event-source-mock
```

## Usage

Below is a basic example of how to use the `EventSourceMock` in your unit tests.

### Setting Up the Mock

To enable `EventSourceMock` in your test:

```javascript
import eventSourceMock from '@dimak.dev/event-source-mock';
// OR
const eventSourceMock = require('@dimak.dev/event-source-mock').default;

describe('Your test', () => {
  beforeAll(() => {
    eventSourceMock.mockInit();
  });
});
```

And now you can test your code with EventSource.

### Teardown the test environment

After test execution it is recommended to restoring default implementation of `EventSource`. To do this:

```javascript
import eventSourceMock from '@dimak.dev/event-source-mock';
// OR
const eventSourceMock = require('@dimak.dev/event-source-mock').default;

describe('Your test', () => {
  afterAll(() => {
    eventSourceMock.mockRestore();
  });
});
```

### Dispatch event

### Example Test Case

Here's an example of how you might use the mock in a Jest test case:

```javascript
describe('Server-Side events', () => {
  beforeAll(() => {
    eventSourceMock.mockInit();
  });

  afterAll(() => {
    eventSourceMock.mockRestore();
  });

  test('should handle server-sent events correctly', () => {
    const url = 'https://example.com/events';
    const eventSource = new EventSource(url);

    const onOpenHandler = jest.fn();
    const onMessageHandler = jest.fn();

    // Subscribe on events
    eventSource.addEventListener('open', onOpenHandler);
    eventSource.addEventListener('message', onMessageHandler);

    // Simulate an open connection
    eventSource.dispatchEvent(new Event('open'));

    // Simulate receiving a message
    const eventData = {data: JSON.stringify({foo: 'bar'})};
    const messageEvent = new MessageEvent('message', eventData);
    eventSource.dispatchEvent(messageEvent);

    // Assertions
    expect(onOpenHandler).toHaveBeenCalledTimes(1);
    expect(onMessageHandler).toHaveBeenCalledTimes(1);
    expect(onMessageHandler).toHaveBeenCalledWith(expect.objectContaining({
      data: '{"foo":"bar"}'
    }));
  });
});
```

For other examples you are welcomed to `./examples` directory.

## API Reference

### `EventSourceMock`

The main class that mimics the behavior of the native `EventSource` and will be accessible after initialization over `EventSource`.

- **Constructor**: `new EventSource(url: string, options?: object)`
    - *url*: The URL to which the connection would be made.
    - *options*: Optional configuration object.

### `eventSourceMock`

The instantiated wrapper for mock. It is possible to operate the behaviour the instances of `EventSourceMock`. 

#### Methods

- **`mockInit(): void`**
  - Initializes the mock.

- **`mockReset(): void`**
  - Resets all internal things for operating with mock.

- **`mockRestore(): void`**
  - Restores native implementation of `EventSource`.

#### Properties

- **`instances: Array<EventSourceMockInstance>`**
  - All instantiated `EventSourceMock`s.

- **`latestInstance: EventSourceMockInstance | undefined`**
  - The latest instantiated `EventSourceMock`.

### EventSourceMockInstance

Wrapped instance of `EventSourceMock` and accessible over `eventSourceMock.instances` or `eventSourceMock.latestInstance`.

#### Methods

- **`open(dispatchEvent?: boolean, customOpenEvent?: Event): void`**
  - Imitates opening the connection.
  - *dispatchEvent*: Dispatch `onopen` event or not. Default: `false`
  - *customOpenEvent*:  Custom event, If not present - event will be created

- **`dispatchEvent(event: Event | MessageEvent)`**
    - Triggers an event of the specified type (`open`, `message`, or `error`) with optional initialization data.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements you would like to see.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

This README provides a comprehensive overview of how to use and integrate your EventSource mock into unit tests. Adjust any sections as needed based on specific features or configurations unique to your implementation.