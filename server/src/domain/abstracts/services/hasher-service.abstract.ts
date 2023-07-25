export abstract class IHashService {
  abstract hash(data: string): string;
  abstract verify(data1: string, data2: string): boolean;
}
