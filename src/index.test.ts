import * as index from './index';
import {EventSourceMockWrapper} from "./eventSourceMockWrapper";

describe('Exports from module', () => {
    test('default export is instance of EventSourceMockWrapper', () => {
        expect(index.default)
            .toBeInstanceOf(EventSourceMockWrapper);
    });
});