import { MockSet } from '@drivers-keep-shared/interfaces/sets.interface';

export function createMockSetsArray(offset: number): MockSet[] {
  const helperClass: MockSet = new MockSet();
  return Array(10 * offset).fill(helperClass.returnMockSet());
}
