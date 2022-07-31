export   interface ROUTE {
    path: string;
    breadcrumbName: string;
    children?: Array<{
      path: string;
      breadcrumbName: string;
    }>;
  }
  export interface SITEINFO {
    [propName: string]:any
  }
  export interface CALLBACK {
    [key: string]: string
  }