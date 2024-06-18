export type Data = Array<Record<string, string>>;

export type ApiResponseData = { message: string; data: Data };

export type ApiSearchResponse = { data?: Data };
