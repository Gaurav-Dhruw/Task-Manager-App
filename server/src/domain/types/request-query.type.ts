export interface RequestQuery {
  search?: string;
  where?: object;
  sort?: object;
  pagination?: { page: number; limit: number };
}
