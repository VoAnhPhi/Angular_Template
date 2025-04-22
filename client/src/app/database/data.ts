export interface ILoai {
    id: number;
    ten_loai: string;
    slug?: string;
    thu_tu: number;
    an_hien: number;
    product_count?: number;
}
export type ILoaiCreate = Omit<ILoai, 'id'>;

export interface ISanPham {
    id: number;
    ten_sp: string;
    slug: string;
    gia: number;
    gia_km: number;
    ngay: string;
    hinh: string;
    id_loai: number;
    luot_xem: number;
    mo_ta: string;
    hot: string;
    an_hien: number;
    tinh_chat: string;
    category?: string | null;
    attributes: IAttributes;
}

export interface ProductResponse {
    products: ISanPham[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface IAttributes {
    id: number;
    id_sp: number;
    ram: string;
    cpu: string;
    dia_cung: string;
    mau_sac: string;
    can_nang: string;
}

export type IAttributesCreate = Omit<IAttributes, 'id' | 'id_sp'>;
export type ISanPhamCreate = Omit<ISanPham, 'id' | 'attributes'> & { attributes: IAttributesCreate };

export interface IUser {
    id: number;
    ho_ten: string;
    vai_tro: number;
    email: string;
    dien_thoai: string;
    dia_chi: string;
    created_at: string;
}

export interface IUserResponse {
    user: IUser[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface ICartItem {
    id: number;
    ten_sp: string;
    so_luong: number;
    gia_mua: number;
    hinh: string;
}

export interface INews {
    id: number;
    tieu_de: string;
    slug: string;
    mo_ta: string;
    hinh: string;
    noi_dung: string;
    ngay: string;
    id_loai: number;
    luot_xem: number;
    an_hien: number;
    category: string;
}

export interface INewsResponse {
    news: INews[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export type INewsCreate = Omit<INews, 'id' | 'category'>;


export interface ILoaiTin {
    id: number;
    ten_loai: string;
    slug?: string;
    thu_tu: number;
    an_hien: number;
    count?: number;
}

export type ILoaiTinCreate = Omit<ILoaiTin, 'id' | 'count'>;

export interface ILoaiTinResponse {
    news_category: ILoaiTin[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}