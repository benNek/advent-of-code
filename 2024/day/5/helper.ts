export function isCorrectlyOrdered(leftMap: Map<string, string[]>, rightMap: Map<string, string[]>, values: string[]) {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const leftValue = values[i - 1];
        const rightValue = values[i + 1];

        if (leftValue !== undefined && !leftMap.get(value)?.includes(leftValue)) {
            return false;
        }

        if (rightValue !== undefined && !rightMap.get(value)?.includes(rightValue)) {
            return false;
        }
    }

    return true;
}

export function save(map: Map<string, string[]>, key: string, value: string) {
    if (map.has(key)) {
        const arr = map.get(key)!;
        arr.push(value);
        map.set(key, arr);
    } else {
        map.set(key, [value])
    }
}