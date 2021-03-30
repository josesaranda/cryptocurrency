export type Service<T> = {
    // simple crud method must be implemented with generics
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
}