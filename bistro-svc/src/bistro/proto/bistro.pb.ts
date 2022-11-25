/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bistro";

export interface Bistro {
  id: string;
  name: string;
  image: string;
  description: string;
  ownerId: string;
}

export interface BistroRequestId {
  id: string;
}

export interface GetBistrosRequest {
  page: number;
  limit: number;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetBistrosResponse {
  items: Bistro[];
  meta: Meta | undefined;
}

export interface GetBistroByOwnerRequest {
  ownerId: string;
}

export interface CreateBistroRequest {
  name: string;
  image: string;
  description: string;
  ownerId: string;
}

export interface UpdateBistro {
  id: string;
  name: string;
  image: string;
  description: string;
  ownerId: string;
}

export const BISTRO_PACKAGE_NAME = "bistro";

export interface BistroServiceClient {
  createBistro(request: CreateBistroRequest): Observable<Bistro>;

  updateBistro(request: Bistro): Observable<Bistro>;

  deleteBistro(request: BistroRequestId): Observable<Bistro>;

  getBistro(request: BistroRequestId): Observable<Bistro>;

  getBistros(request: GetBistrosRequest): Observable<GetBistrosResponse>;

  getBistroByOwner(request: GetBistroByOwnerRequest): Observable<Bistro>;
}

export interface BistroServiceController {
  createBistro(request: CreateBistroRequest): Promise<Bistro> | Observable<Bistro> | Bistro;

  updateBistro(request: Bistro): Promise<Bistro> | Observable<Bistro> | Bistro;

  deleteBistro(request: BistroRequestId): Promise<Bistro> | Observable<Bistro> | Bistro;

  getBistro(request: BistroRequestId): Promise<Bistro> | Observable<Bistro> | Bistro;

  getBistros(
    request: GetBistrosRequest,
  ): Promise<GetBistrosResponse> | Observable<GetBistrosResponse> | GetBistrosResponse;

  getBistroByOwner(request: GetBistroByOwnerRequest): Promise<Bistro> | Observable<Bistro> | Bistro;
}

export function BistroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createBistro",
      "updateBistro",
      "deleteBistro",
      "getBistro",
      "getBistros",
      "getBistroByOwner",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BistroService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BistroService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BISTRO_SERVICE_NAME = "BistroService";
