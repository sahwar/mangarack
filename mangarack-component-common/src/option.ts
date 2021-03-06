import * as mio from './default';

/**
 * Creates an option value.
 * @param value= The value.
 * @return The option value.
 */
export function option<T>(value?: T): mio.IOption<T> {
  if (typeof value === 'boolean') {
    return {hasValue: true, value: value};
  } else if (typeof value === 'number') {
    let hasValue = isFinite(value as any);
    return {hasValue: hasValue, value: hasValue ? value : null};
  } else if (typeof value === 'undefined') {
    return {hasValue: false, value: null};
  } else {
    let hasValue = value != null;
    return {hasValue: hasValue, value: hasValue ? value : null};
  }
}
