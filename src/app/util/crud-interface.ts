export interface Crud {
  save(entity): void;

  getAll(): void;

  delete(id: number): void;

  update(entity): void;
}
