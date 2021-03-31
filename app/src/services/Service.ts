export type Service<T> = {
    // simple crud methods must be implemented with generics
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    createOne(element: Omit<T, 'id'>): Promise<T>
    updateOne(id: number, element: Omit<T, 'id'>): Promise<T>;
    deleteOne(id: number): Promise<boolean>;
}