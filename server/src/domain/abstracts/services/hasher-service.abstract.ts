

export abstract class IHasherService{
    abstract hash(data:string):string;
    abstract verify(data:string):boolean;
}