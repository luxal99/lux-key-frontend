export interface Report {
  id?: number;
  createdDate?: string;
  path?: string;
  reportType: reportType;
}

export type reportType = "IN_STOCK" | "BUILT_IN"
