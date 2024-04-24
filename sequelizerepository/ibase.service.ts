export interface IBaseService<T> {
  getoptionlist(options?: any): Promise<T[]>;
  get(id: any): Promise<T>;
  getall(options?: any): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id : any, entity: T): Promise<T>;
  delete(id: any) : Promise<any>;
}
