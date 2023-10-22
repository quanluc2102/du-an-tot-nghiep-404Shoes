﻿
create database ShopShoe
go
use ShopShoe
go



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
                                      
);
CREATE TABLE tai_khoan (
                           id BIGINT PRIMARY KEY IDENTITY(1,1),
                           username NVARCHAR(255) NOT NULL,
                           email NVARCHAR(255) NOT NULL,
                           ngay_tao DATETIME,
                           ngay_cap_nhat DATETIME,
                           password NVARCHAR(255) NOT NULL,
                           anh NVARCHAR(255),
                           trang_thai BIT NOT NULL,
						   thong_tin_nguoi_dung_id BIGINT,
                                      FOREIGN KEY (thong_tin_nguoi_dung_id) REFERENCES thong_tin_nguoi_dung(id)
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
                                   anh nvarchar(255),
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



SELECT * FROM THONG_TIN_NGUOI_DUNG





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

    INSERT INTO thong_tin_nguoi_dung (dia_chi, ngay_sinh, sdt, ten,cccd,gioi_tinh, ngay_cap_nhat)
VALUES
    (N'Hưng Yên', '1990-01-01', '0987654321', N'Trần Đăng','009876000765',1, GETDATE() ),
    (N'Thái Bình', '1990-02-02', '0987654321', N'Bùi Hùng','098786788765',1, GETDATE()),
    (N'Hải Phòng', '1990-03-03', '0987654321', N'Minh Quân','008675000223',1, GETDATE()),
    (N'Bắc Kan', '1990-04-04', '0987654321', N'Xuân Thiệu','009034055123',1, GETDATE()),
    (N'Nam ĐỊnh', '1990-05-05', '0987654321', N'Xuân Mai','006756777867',2, GETDATE());



INSERT INTO [dbo].[xuat_xu]
           ([ten],[trang_thai])
     VALUES
           (N'Trung quốc',1),
		   (N'Việt Nam',1),
		   (N'Mỹ',1),
		   (N'Pháp',1),
		   (N'Nhật',1);


INSERT INTO quyen (ten, trang_thai)
VALUES
(N'Nhân Viên', 1),
(N'Quản Lý', 1),
(N'Khách Hàng', 1)

    INSERT INTO tai_khoan (username, email, ngay_tao, ngay_cap_nhat, password, anh, trang_thai, thong_tin_nguoi_dung_id)
VALUES
    ( 'quanluc2102','quanluc123@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh1.jpg',1,1),
    ( 'thieubx33', 'thieu456@gmail.com',  GETDATE(), GETDATE(), '0987654321', 'anh2.jpg',1,2),
    (  'tienhungbt66','hungbt99@gmail.com' , GETDATE(), GETDATE(), '0987654321', 'anh3.jpg',1,3),
    ( 'dangbui98k', 'dang3389@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh4.jpg',1, 4),
    ( 'dang78hy', 'dang78yu@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh5.jpg',1,5);
INSERT INTO phan_quyen (tai_khoan_id, quyen_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 2),
(5, 2);
INSERT INTO danh_muc (ten, trang_thai)
VALUES
(N'Giày Chạy Bộ', 1),
(N'Giày Nhảy Dây', 1),
(N'Giày Bóng Rổ', 1),
(N'Giày Đá Bóng', 1),
(N'Giày Đánh Cầu', 1),
(N'Giày Bóng Chuyền', 1),
(N'Giày Tập Gym', 1);
INSERT INTO mau_sac (ten, trang_thai)
VALUES
(N'Trắng', 1),
(N'Xanh Đen', 1),
( N'Hồng Đen', 1),
( N'Đỏ Trắng', 1),
(N'Xanh Lam', 1),
(N'Đỏ Đen', 1),
( N'Tím Đen', 1),
( N'Vàng Trắng', 1),
(N'Hồng Lam', 1),
(N'Ngọc Bích', 1),
( N'Pha Lê', 1),
( N'Nâu', 1),
(N'Galaxy', 1),
(N'Xám Khói', 1),
( N'Trắng Đen', 1),
( N'Đỏ Tươi', 1),
(N'Lục Lam', 1),
( N'Vàng', 1);
INSERT INTO kich_thuoc (gia_tri, trang_thai)
VALUES
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1)

    INSERT INTO thanh_toan (ten, trang_thai)
VALUES
    (N'Thanh toán online', 1),
    (N'Thanh toán khi nhận hàng', 1),
    (N'Thanh toán VNPay', 1);

INSERT INTO thuong_hieu (ten, trang_thai)
VALUES
('Nike', 1),
('Adidas', 1),
('Puma', 1),
('New Balance', 1),
('Skechers', 1),
('Reebok', 1),
('Asic', 1),
('Converse', 1);




INSERT INTO san_pham (ngay_tao, gia_nhap, ten, gia_ban, trang_thai, ngay_cap_nhat, mo_ta,giam_gia,thuong_hieu,xuat_xu,danh_muc)
VALUES
(GETDATE(), 2000000, N'Giày Thể Thao Nam Adidas Mens Courtphase Trainers', 2100000, 1, GETDATE(), N'Sản phẩm tốt',0,2,2,3),
(GETDATE(), 2100000, N'Giày Thể Thao Adidas Stan Smith Shoes', 178000, 1, GETDATE(), N'Sản phẩm tốt',0,2,2,1),
(GETDATE(), 4500000, N'Giày Thể Thao Nike Air Force 1 High Green White', 150000, 1, GETDATE(), N'Sản phẩm tốt',0,1,3,1)




    INSERT INTO san_pham_chi_tiet (so_luong, ngay_tao, ngay_cap_nhat, trang_thai,kich_thuoc,mau_sac,san_pham_id,anh)
VALUES
    (100, GETDATE(), GETDATE(), 1,2,3,1,'anh5.jpg'),
    (20, GETDATE(), GETDATE(), 1,4,3,1,'anh5.jpg'),
    (40, GETDATE(), GETDATE(), 1,3,6,1,'anh5.jpg'),
    (20, GETDATE(), GETDATE(), 1,3,3,1,'anh5.jpg'),
    (30, GETDATE(), GETDATE(), 1,4,2,1,'anh5.jpg')



INSERT INTO san_pham_anh (san_pham_id, anh)
VALUES
    (1, 'anh1.jpg'),
    (2, 'anh2.jpg'),
    (1, 'anh3.jpg'),
    (3, 'anh4.jpg'),
    (2, 'anh5.jpg');


INSERT INTO hoa_don (ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, tai_khoan_id, thanh_toan_id,kieu_hoa_don,tong_tien,phi_ship,tien_giam,tong_tien_sau_giam,ten,sdt,email,thanh_pho,quan_huyen,phuong_xa)
VALUES
(GETDATE(), N'Khách hàng yêu cầu bọc', GETDATE(), 1, 1, 1,1,0,20000,30000,10000,N'Lương Văn Mai','0362460679','thieutttt01@gmail.com',N'Hà Nội',N'Đông Anh',N'Vân NộI'),
(GETDATE(), N'Hỏa tốc', GETDATE(), 1, 2, 2,1,0,20000,30000,10000,N'Kiều Minh Quang','0362460679','thieutttt02@gmail.com',N'Hà Nội',N'Đông Anh',N'Vân NộI')


    INSERT INTO gio_hang (ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, tai_khoan_id,tong_tien)
VALUES
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 1,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 2,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 3,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 4,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 5,0);


INSERT INTO hoa_don_chi_tiet (ghi_chu, so_luong, hoa_don_id, san_pham_chi_tiet_id)
VALUES
(N'Tốt', 2, 1, 1),
(N'Tốt', 3, 2, 2),
(N'Tốt', 4, 1, 1),
(N'Tốt', 5, 1, 1),
(N'Tốt', 6, 2, 1);




INSERT INTO hoa_don_chi_tiet (ghi_chu, so_luong, hoa_don_id, san_pham_chi_tiet_id)
VALUES
(N'Ghi chú 1', 2, 1, 1),
(N'Ghi chú 2', 3, 2, 2)


    INSERT INTO gio_hang_chi_tiet (gio_hang_id, san_pham_chi_tiet_id, so_luong)
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 4),
    (4, 4, 5),
    (5, 5, 6);

INSERT INTO [dbo].[khuyen_mai]
(ma,[ten],[mo_ta],[bat_dau],[ket_thuc],[giam_gia],[kieu_khuyen_mai],dieu_kien,so_luong,trang_thai)
VALUES
    ('KHUYENMAICHAOMUNG',N'KHUYẾN MÃI CHÀO MỪNG NGƯỜI MỚI',N'GIẢM 50K VỚI THÀNH VIÊN MỚI','2023/10/1','2023/10/5',10 ,1,50000,20,1),
    ('KHUYENMAIPK',N'KHUYẾN MÃI TƯNG BỪNG',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K','2023/10/1','2023/10/5',10000 ,0,10000,20,1),
    ('KHUYENMAITHANG10',N'KHUYẾN MÃI THÁNG 10',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 15K','2023/10/1','2023/10/5',15000 ,1,100000,20,1),
    ('KHUYENMAIDEMDONG',N'ĐÔNG KHUYẾN MÃI',N'GIẢM 80K KHI MUA SẢN PHẨM TRÊN 800K','2023/10/10','2023/11/11',10000 ,1,800000,20,1),
    ('KHUYENMAIBLACKDAY',N'KHUYẾN MÃI NGÀY ĐEN',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K','2023/09/1','2023/10/5',10 ,1,0,20,1);


INSERT INTO [dbo].[lich_su_hoa_don]
([ma_hoa_don],[san_pham_chi_tiet],[phuong_thuc_thanh_toan],[nguoi_nhan],[khuyen_mai],[ngay_tao_hoa_don],[tong_tien],[dia_chi_giao],[ghi_chu],[trang_thai_hoa_don])
VALUES
    (1,1,1,1,1,'2023/10/5',0,'Hà Nội','Không',1),
    (2,2,2,2,2,'2023/10/5',0,'Hà Nội','Không',1)


INSERT INTO [dbo].[tich_diem]
([tai_khoan_id],[diem])
VALUES
    (1,10000),
    (2,1000),
    (3,40000),
    (4,15000),
    (5,5000);

select * from danh_muc
select * from gio_hang
select * from gio_hang_chi_tiet
select * from hoa_don
select * from hoa_don_chi_tiet
select * from khuyen_mai
select * from kich_thuoc
select * from lich_su_hoa_don
select * from mau_sac
select * from phan_quyen
select * from quyen
select * from san_pham
select * from san_pham_anh
select * from tai_khoan
select * from thanh_toan
select * from thong_tin_nguoi_dung
select * from thuong_hieu
select * from tich_diem
select * from xuat_xu

