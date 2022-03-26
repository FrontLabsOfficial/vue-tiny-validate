import pick from 'lodash/pick';
import type { Result } from '../src/types';

type CompareValue = Omit<Result, '$reset' | '$test' | '$touch'>;

const pickKeysFromValue = (value: CompareValue) =>
  pick(value, ['$invalid', '$pending', '$dirty', '$errors', '$messages']);

export const initialExpect = (value: CompareValue): void => {
  const compareValue = pickKeysFromValue(value);
  (expect(compareValue) as any).deepEqual(baseState);
};

export const valueExpect = (
  value: CompareValue,
  expectValue: CompareValue,
): void => {
  const compareValue = pickKeysFromValue(value);

  (expect(compareValue) as any).deepEqual(expectValue);
};

export const baseState: CompareValue = {
  $invalid: false,
  $errors: [],
  $messages: [],
  $pending: false,
  $dirty: false,
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
