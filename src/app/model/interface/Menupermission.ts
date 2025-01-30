export interface MenuPermission {
    menuCode: string;
    userRole: string;
    name: string;
    haveView: boolean;
    haveAdd: boolean;
    haveEdit: boolean;
    haveDelete: boolean;
    id: string;
}