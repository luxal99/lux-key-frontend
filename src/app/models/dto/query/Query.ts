import { DateDto } from "./DateDto";
import { PaginationDto } from "./PaginationDto";
import { SortDto } from "./SortDto";

export interface Query {
  dateQuery: DateDto,
  pagination: PaginationDto,
  sort: SortDto
}
