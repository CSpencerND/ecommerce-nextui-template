/**
 * @description Used to get multiple items while checking for uniqueness based on the given argument.
 * fakers builtin `helpers.multiple` does not check for uniqueness, so this was needed.
 */
export function getMultiple<T>(callback: () => T, comparator: keyof T, count: number): T[] {
    let maxAttempts = 50;
    const data: T[] = [];

    while (data.length < count && maxAttempts > 0) {
        const newData = callback();

        if (!data.some((item) => item[comparator] === newData[comparator])) {
            data.push(newData);
        }

        maxAttempts--;
    }

    if (maxAttempts === 0) {
        console.error(
            "Unable to generate the desired number of unique items within the specified attempts.",
        );
    }

    return data;
}
