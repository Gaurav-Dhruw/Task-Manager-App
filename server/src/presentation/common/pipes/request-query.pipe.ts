import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class RequestQueryPipe implements PipeTransform {
  transform(dto: any, metaData: ArgumentMetadata) {
    if (metaData.type !== 'query') return dto;

    const query: IRequestQuery = {};

    query.search = dto?.search;
    query.where = this.transformWhere(dto);
    query.pagination = this.transformPagination(dto);
    query.sort = this.transformSort(dto);

    return query;
  }

  transformWhere(dto: any) {
    const queryKeys = ['sort', 'order', 'page', 'limit', 'search'];
    const where: object = {};

    for (const key in dto) {
      if (!queryKeys.find((queryKey) => queryKey === key)) {
        where[key] = dto[key];
      }
    }

    return Object.keys(where).length ? where : undefined;
  }

  transformPagination(dto: any) {
    let paginationObj: any = {};

    if ('page' in dto && 'limit' in dto) {
      paginationObj.page = dto.page;
      paginationObj.limit = dto.limit;
    }

    return 'page' in paginationObj && 'limit' in paginationObj
      ? paginationObj
      : undefined;
  }

  transformSort(dto: any) {
    const sortObj: object = {};

    if ('sort' in dto && 'order' in dto) {
      const sortParams: string[] = (dto.sort as string).split(',');
      const orderParams: string[] = (dto.order as string).split(',');
      const n = sortParams.length;

      if (n === orderParams.length) {
        for (let i = 0; i < n; i++) {
          sortObj[sortParams[i]] = orderParams[i];
        }
      } else {
        for (let i = 0; i < n; i++) {
          sortObj[sortParams[i]] = orderParams[0];
        }
      }
    }
    return Object.keys(sortObj).length ? sortObj : undefined;
  }
}
