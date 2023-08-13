import { Injectable } from '@nestjs/common';


@Injectable()
export class RepositoryHelper {
  constructor() {}

  buildQuery(inputQueries: any, queryOptions: any) {
    let query: any = {};

    if (inputQueries?.where) {
      let where = {};
      for (const key in inputQueries.where) {
        if (inputQueries.where[key] !== undefined && key in queryOptions.where)
          where = { ...where, ...queryOptions.where[key] };
      }
      query.where = where;
    }

    if (inputQueries?.sort) {
      let order = {};
      for (const key in inputQueries.sort) {
        if (inputQueries.sort[key] !== undefined && key in queryOptions.sort)
          order[key] = queryOptions.sort[key];
      }
      query.order = order;
    }

    if (inputQueries?.pagination) {
      query = { ...query, ...inputQueries.pagination };
    }
    return query;
  }
}
