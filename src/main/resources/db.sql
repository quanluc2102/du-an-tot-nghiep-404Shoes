create database ShopShoe
use ShopShoe
drop database ShopShoe



CREATE TABLE tai_khoan (
                           id BIGINT PRIMARY KEY IDENTITY(1,1),
                           username NVARCHAR(255) NOT NULL,
                           email NVARCHAR(255) NOT NULL,
                           ngay_tao DATETIME,
                           ngay_cap_nhat DATETIME,
                           password NVARCHAR(255) NOT NULL,
                           anh NVARCHAR(255),
                           trang_thai BIT NOT NULL,
);
-- Create vai_tro table
CREATE TABLE quyen (
                       id BIGINT PRIMARY KEY IDENTITY(1,1),
                       ten NVARCHAR(255) NOT NULL,
                       trang_thai BIT NOT NULL
);
-- Create phan_quyen table
CREATE TABLE phan_quyen (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            tai_khoan_id BIGINT,
                            quyen_id BIGINT,
                            FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),
                            FOREIGN KEY (quyen_id) REFERENCES quyen(id)
);



-- Create kich_thuoc table
CREATE TABLE kich_thuoc (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            gia_tri INT NOT NULL,
                            trang_thai BIT NOT NULL
);

-- Create danh_muc table
CREATE TABLE danh_muc (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ten NVARCHAR(255) NOT NULL,
                          trang_thai BIT NOT NULL
);

-- Create kich_thuocmau_sacchi_tiet table


-- Create mau_sac table
CREATE TABLE mau_sac (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ten NVARCHAR(255) NOT NULL,
                         trang_thai BIT NOT NULL
);


-- Create thanh_toan table
CREATE TABLE thanh_toan (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            ten NVARCHAR(255) NOT NULL,
                            trang_thai INT NOT NULL
);

-- Create thuong_hieu table
CREATE TABLE thuong_hieu (
                             id BIGINT PRIMARY KEY IDENTITY(1,1),
                             ten NVARCHAR(255) NOT NULL,
                             trang_thai BIT NOT NULL
);

CREATE Table xuat_xu(
                        id BIGINT PRIMARY Key IDENTITY(1,1),
                        ten NVARCHAR(255),
                        trang_thai INT
);
-- Create thong_tin_nguoi_dung table
CREATE TABLE thong_tin_nguoi_dung (
                                      id BIGINT PRIMARY KEY IDENTITY(1,1),
                                      dia_chi NVARCHAR(255) NOT NULL,
                                      ngay_sinh DATE NOT NULL,
                                      sdt NVARCHAR(255) NOT NULL,
                                      ten NVARCHAR(255) NOT NULL,
                                      cccd nvarchar(12),

                                      gioi_tinh int  not null,
                                      ngay_cap_nhat DATETIME,
                                      tai_khoan_id BIGINT,
                                      FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id)
);

-- Create san_pham table
CREATE TABLE san_pham (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ngay_tao DATE NOT NULL,
                          gia_nhap float NOT NULL,
                          ten NVARCHAR(255) NOT NULL,
                          gia_ban float NOT NULL,
                          trang_thai INT NOT NULL,
                          ngay_cap_nhat DATETIME,
                          mo_ta NVARCHAR(255) NOT NULL,
                          giam_gia FLOAT NOT NULL,
                          thuong_hieu bigInt not null,
                          xuat_xu bigint not null,
                          danh_muc bigint not null,
                          FOREIGN KEY (thuong_hieu) REFERENCES thuong_hieu(id),
                          FOREIGN KEY (xuat_xu) REFERENCES xuat_xu(id),
                          FOREIGN KEY (danh_muc) REFERENCES danh_muc(id)
);



CREATE TABLE san_pham_chi_tiet (
                                   id BIGINT PRIMARY KEY IDENTITY(1,1),
                                   ngay_tao DATE NOT NULL,
                                   ngay_cap_nhat DATETIME,
                                   trang_thai INT NOT NULL,
                                   so_luong INT Not Null,
                                   kich_thuoc BIGINT,
                                   mau_sac BIGINT,
                                   san_pham_id BIGINT,
                                   anh nvarchar,
                                   FOREIGN KEY (kich_thuoc) REFERENCES kich_thuoc(id),
                                   FOREIGN KEY (mau_sac) REFERENCES mau_sac(id),
                                   FOREIGN KEY (san_pham_id) REFERENCES san_pham(id)
);

CREATE TABLE khuyen_mai (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            ma nvarchar(225) not null,
                            ten VARCHAR(255) NOT NULL,
                            mo_ta VARCHAR(255),
                            bat_dau DATE NOT NULL,
                            ket_thuc DATE NOT NULL,
                            giam_gia FLOAT NOT NULL,
                            kieu_khuyen_mai INT NOT NULL,
                            dieu_kien float not null,
                            so_luong int not null,
                            trang_thai int not null
);
--hoa don
CREATE TABLE hoa_don (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ngay_tao DATE NOT NULL,
                         ghi_chu NVARCHAR(255),
                         ngay_cap_nhat DATETIME,
                         trang_thai INT NOT NULL,
                         tai_khoan_id BIGINT,
                         thanh_toan_id BIGINT,
                         kieu_hoa_don INT NOT NULL,
                         tong_tien FLOAT NOT NULL,
                         phi_ship FLOAT,
                         tien_giam FLOAT,
                         tong_tien_sau_giam FLOAT,
                         ten NVARCHAR(255) NOT NULL,
                         sdt NVARCHAR(11) NOT NULL,
                         email NVARCHAR(255),
                         thanh_pho NVARCHAR(255),
                         quan_huyen NVARCHAR(255),
                         phuong_xa NVARCHAR(255),
                         hoa_don_khuyen_mai bigint,
                         FOREIGN KEY (hoa_don_khuyen_mai) REFERENCES khuyen_mai(id),
                         FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),

                         FOREIGN KEY (thanh_toan_id) REFERENCES thanh_toan(id)
);

CREATE TABLE gio_hang (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ngay_tao DATE NOT NULL,
                          ghi_chu NVARCHAR(255) NOT NULL,
                          ngay_cap_nhat DATETIME,
                          tong_tien FLOAT,
                          trang_thai INT NOT NULL,
                          tai_khoan_id BIGINT,

                          FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),

);
-- Create hoa_donchi_tiet table
CREATE TABLE hoa_don_chi_tiet (
                                  id BIGINT PRIMARY KEY IDENTITY(1,1),
                                  ghi_chu NVARCHAR(255),

                                  so_luong INT NOT NULL,
                                  hoa_don_id BIGINT,
                                  san_pham_chi_tiet_id BIGINT,

                                  FOREIGN KEY (hoa_don_id) REFERENCES hoa_don(id),
                                  FOREIGN KEY (san_pham_chi_tiet_id) REFERENCES san_pham_chi_tiet(id)

);



-- Create san_pham_anh table
CREATE TABLE san_pham_anh (
                              id BIGINT PRIMARY KEY IDENTITY(1,1),
                              san_pham_id BIGINT,
                              anh NVARCHAR(255),
                              FOREIGN KEY (san_pham_id) REFERENCES san_pham(id)
);
-- Create gio_hang table
CREATE TABLE gio_hang_chi_tiet (
                                   id BIGINT PRIMARY KEY IDENTITY(1,1),
                                   gio_hang_id BIGINT,
                                   san_pham_chi_tiet_id BIGINT,
                                   so_luong INT NOT NULL,

                                   FOREIGN KEY (gio_hang_id) REFERENCES gio_hang(id),
                                   FOREIGN KEY (san_pham_chi_tiet_id) REFERENCES san_pham_chi_tiet(id)
);


-- Create hoa_don_khuyen_mai table





CREATE TABLE tich_diem(
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          tai_khoan_id BIGINT,
                          diem FLOAT NOT NULL,
                          FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id)
);

CREATE TABLE lich_su_hoa_don(
                                id BIGINT PRIMARY KEY IDENTITY(1,1),
                                ma_hoa_don BIGINT,
                                san_pham_chi_tiet BIGINT,
                                phuong_thuc_thanh_toan BIGINT,
                                nguoi_nhan BIGINT,
                                khuyen_mai BIGINT,
                                ngay_tao_hoa_don DATE NOT NULL,
                                tong_tien FLOAT NOT NULL,
                                dia_chi_giao NVARCHAR(255) ,
                                ghi_chu NVARCHAR(255),
                                trang_thai_hoa_don INT
                                    FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don(id),
                                FOREIGN KEY (san_pham_chi_tiet) REFERENCES san_pham_chi_tiet(id),
                                FOREIGN KEY (phuong_thuc_thanh_toan) REFERENCES thanh_toan(id),
                                FOREIGN KEY (nguoi_nhan) REFERENCES tai_khoan(id),
                                FOREIGN KEY (khuyen_mai) REFERENCES khuyen_mai(id)
);
use ShopShoe