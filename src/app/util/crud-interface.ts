export interface Crud {
  save(): void;

  getAll(): void;

  delete(id: number): void;

  update(): void;
}
