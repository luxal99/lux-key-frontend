export interface SortDto {
  sortType: SortType;
  columnName: string;
}

type SortType = "ASC" | "DESC"
