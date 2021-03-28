export type Service<T> = {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
}