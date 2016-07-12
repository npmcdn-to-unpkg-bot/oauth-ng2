export class Dictionary<T> {
    constructor(protected items?: { [index: string]: T }) {
        if (this.items == null) this.items = {};
    }

    get(key: string): T {
        if (!this.contains(key)) return null;
        return this.items[key];
    }

    add(key: string, value: T): T {
        if (this.contains(key)) throw new Error('Key already exists.');
        return this.insert(key, value);
    };

    first() {
        if (this.items == null) throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        var key = this.keys()[0];
        if (key != null) return this.items[key];
    }

    insert(key: string, value: T): T {
        if (this.items == null) throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        if (value == null) throw new Error('Value expected. Got ' + value);
        this.items[key] = value;
        return value;
    }

    remove(key: string): T {
        if (!this.contains(key)) throw new Error('Key not found.');
        var value = this.items[key];
        delete this.items[key];
        return this.insert(key, value);
    };

    clear() {
        this.items = {};
    }

    contains(key: string): boolean {
        if (key == null) throw new Error('Key cannot be null or undefined');
        if (this.items == null) throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return this.items.hasOwnProperty(key);
    }

    keys(): string[] {
        if (this == null) throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Object.keys(this.items);
    }

    values(): T[] {
        if (this == null) throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Array.map(this.keys(), function (key) {
            return this.items[key];
        });
    }

    lookup(): { [key: string]: T } {
        return this.keys().length ? this.items : null;
    }

    get count(): number {
        return this.values().length;
    };
}