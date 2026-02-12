import { describe, expect, it } from 'vitest';

import { greetTemplate } from '../src/index';

describe('greetTemplate', () => {
  it('returns a deterministic greeting', () => {
    expect(greetTemplate('Tempo')).toBe('Hello, Tempo. Your template is ready.');
  });
});
