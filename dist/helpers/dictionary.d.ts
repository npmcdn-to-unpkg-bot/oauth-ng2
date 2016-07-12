export declare class Dictionary<T> {
    protected items: {
        [index: string]: T;
    };
    constructor(items?: {
        [index: string]: T;
    });
    get(key: string): T;
    add(key: string, value: T): T;
    first(): T;
    insert(key: string, value: T): T;
    remove(key: string): T;
    clear(): void;
    contains(key: string): boolean;
    keys(): string[];
    values(): T[];
    lookup(): {
        [key: string]: T;
    };
    count: number;
}
