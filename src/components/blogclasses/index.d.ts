export interface CLASSINFO{
    [propName: string]:any
}
export interface EL {
    [propName: string]:string
}
export interface ROUTES {
    path: string,
    breadcrumbName: string,
    children?:Array<{
        path: string,
        breadcrumbName: string
    }>
}