type RowVersion = {
  type: string;
  data: number[];
};

export type DepartementResponseType = {
  id: number;
  name: string;
  code: string;
  modifyStatus: string;
  createdTime: string;
  createdBy: null | string | number;
  lastModifiedTime: string;
  lastModifiedBy: null | string;
  rowVersion: RowVersion;
};

export type ErrorResponseType = {
  message: string;
};

export type DepartementDataType = {
  id?: number;
  no: number;
  departmentCode: string;
  departmentName: string;
};

export type CategoryResponseType = {
  id: number;
  name: string;
  departmentCode: string;
  modifyStatus: string;
  lastModifiedBy: null | string | number;
};

export type MasterResponsePostType = {
  status: string;
  data: string;
};

export type MasterResponseUpdateType = {
  status: string;
  data: {
    recordsets: [];
    output: {};
    rowsAffected: [];
  };
};

export type CategoryDataType = {
  id?: number;
  no: number;
  departmentCode: string;
  categoryName: string;
};

export type DepartementPayload = {
  id?: number;
  name: string;
  code: string;
};

export type CategoryPayload = {
  id?: number;
  departementCode: string;
  name: string;
};
