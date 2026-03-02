/**
 * CẤU HÌNH API
 * Hướng dẫn:
 * 1. Thay đổi 'baseUrl' thành địa chỉ API thật của bạn (ví dụ: http://localhost:8080/api).
 * 2. Cập nhật các endpoints tương ứng với cấu hình backend.
 */
export const API_CONFIG = {
    baseUrl: 'https://api.example.com/v1', // URL cơ sở của API
    endpoints: {
        products: '/products',
        productDetail: '/products/', // + id
        login: '/auth/login',
        register: '/auth/register',
        profile: '/user/profile'
    }
};
