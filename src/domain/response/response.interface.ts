export interface IResponseFormat {
  meta: IBaseMetaResponseFormat;
  data: Record<string, any>;
}

export interface IBaseMetaResponseFormat {
  is_array?: boolean;
  path?: string;
  duration?: string;
  method?: string;
}
