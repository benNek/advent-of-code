export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
) {
  const memoMap = new Map<string, Result>();
  return function (...args: Args): Result {
    // args can be objects or arrays
    const key = JSON.stringify(args);
    if (memoMap.has(key)) return memoMap.get(key)!;

    const result = fn(...args);
    memoMap.set(key, result);
    return result;
  };
}
