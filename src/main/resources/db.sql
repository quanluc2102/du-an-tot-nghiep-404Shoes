
drop database ShopShoe
go
create database ShopShoe
go
use ShopShoe
go





-- Create thong_tin_nguoi_dung table
CREATE TABLE thong_tin_nguoi_dung (
                                      id BIGINT PRIMARY KEY IDENTITY(1,1),
                                      ngay_sinh DATE NOT NULL,
                                      sdt NVARCHAR(10) NOT NULL,
                                      ten NVARCHAR(255) NOT NULL,
                                      cccd nvarchar(12),
                                      gioi_tinh int  not null,
                                      ngay_cap_nhat DATETIME,
                                      CONSTRAINT uc_thong_tin_nguoi_dung UNIQUE (sdt, cccd) -- Thêm ràng buộc duy nhất
);



--thêm bảng địa chỉ giao hàng
CREATE TABLE dia_chi (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ten NVARCHAR(255) NOT NULL,
                         so_dien_thoai NVARCHAR(10)NOT NULL,
                         dia_chi_cu_the NVARCHAR(255) NOT NULL,
                         tinh_thanh_pho NVARCHAR(255) NOT NULL,
                         quan_huyen NVARCHAR(255) NOT NULL,
                         xa_phuong_thi_tran nvarchar(255)NOT NULL,
                         ngay_cap_nhat DATETIME,
                         thong_tin_nguoi_dung_id BIGINT,
                         trang_thai BIT NOT NULL,
                         FOREIGN KEY (thong_tin_nguoi_dung_id) REFERENCES thong_tin_nguoi_dung(id)
);


CREATE TABLE tai_khoan (
                           id BIGINT PRIMARY KEY IDENTITY(1,1),
                           ma_tai_khoan nvarchar(255) NOT NULL,
                           email NVARCHAR(255) NOT NULL,--bỏ username
                           ngay_tao DATETIME,
                           ngay_cap_nhat DATETIME,
                           password NVARCHAR(255) NOT NULL,
                           anh NVARCHAR(255),
                           trang_thai BIT NOT NULL,
                           thong_tin_nguoi_dung_id BIGINT,
                           FOREIGN KEY (thong_tin_nguoi_dung_id) REFERENCES thong_tin_nguoi_dung(id),
                           CONSTRAINT uc_tai_khoan UNIQUE (email) -- Thêm ràng buộc duy nhất

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
                        ten NVARCHAR(255)NOT NULL,
                        trang_thai INT NOT NULL
);


-- Create san_pham table
CREATE TABLE san_pham (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ma_san_pham nvarchar(255) NOT NULL,
                          ngay_tao DATE NOT NULL,
                          ten NVARCHAR(255) NOT NULL,
                          trang_thai INT NOT NULL,--bỏ đơn giá
                          ngay_cap_nhat DATETIME,
                          mo_ta NVARCHAR(MAX) NOT NULL,
                          thuong_hieu bigInt not null,
                          xuat_xu bigint not null,
                          danh_muc bigint not null,
                          anh_bia nvarchar(255),
                          FOREIGN KEY (thuong_hieu) REFERENCES thuong_hieu(id),
                          FOREIGN KEY (xuat_xu) REFERENCES xuat_xu(id),
                          FOREIGN KEY (danh_muc) REFERENCES danh_muc(id)
);



CREATE TABLE san_pham_chi_tiet (
                                   id BIGINT PRIMARY KEY IDENTITY(1,1),
                                   ma nvarchar(225),
                                   ngay_tao DATE NOT NULL,
                                   ngay_cap_nhat DATETIME,
                                   trang_thai INT NOT NULL,
                                   so_luong INT Not Null,
                                   don_gia float NOT NULL, --sửa cái này
                                   kich_thuoc BIGINT,
                                   mau_sac BIGINT,
                                   san_pham_id BIGINT,
                                   anh nvarchar(255),
                                   qr nvarchar(255),
    --thêm qr code
                                   FOREIGN KEY (kich_thuoc) REFERENCES kich_thuoc(id),
                                   FOREIGN KEY (mau_sac) REFERENCES mau_sac(id),
                                   FOREIGN KEY (san_pham_id) REFERENCES san_pham(id)
);

CREATE TABLE khuyen_mai (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            ma nvarchar(225) not null,
                            ten NVARCHAR(255) NOT NULL,
                            mo_ta NVARCHAR(255),
                            bat_dau DATETIME NOT NULL,
                            ket_thuc DATETIME NOT NULL,
                            giam_gia FLOAT NOT NULL,
                            kieu_khuyen_mai INT NOT NULL,
                            dieu_kien float not null,
                            so_luong int not null,
                            trang_thai int not null
);
--hoa don
CREATE TABLE hoa_don (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ma_hoa_don NVARCHAR(255) NOT NULL,
                         ngay_tao DATE NOT NULL,
                         ghi_chu NVARCHAR(255),
                         ngay_cap_nhat DATETIME,
                         trang_thai INT NOT NULL,
                         cho_xac_nhan DATETIME NULL,
                         ghi_chu_cho_xac_nhan NVARCHAR(255),
                         cho_giao DATETIME NULL,
                         ghi_chu_cho_giao NVARCHAR(255),
                         dang_giao DATETIME NULL,
                         ghi_chu_dang_giao NVARCHAR(255),
                         hoan_thanh DATETIME NULL,
                         ghi_chu_hoan_thanh NVARCHAR(255),
                         huy DATETIME NULL,
                         ghi_chu_huy NVARCHAR(255),
                         tai_khoan_khach_hang_id BIGINT,
                         tai_khoan_nhan_vien_id BIGINT,
                         khuyen_mai BIGINT,
                         thanh_toan_id BIGINT,
                         kieu_hoa_don INT NOT NULL,
                         tong_tien FLOAT NOT NULL,
                         phi_ship FLOAT,
                         tien_giam FLOAT,
                         tong_tien_sau_giam FLOAT,
                         ten NVARCHAR(255) NULL,
                         sdt NVARCHAR(10),
                         email NVARCHAR(255),
    --sửa 3 trường sau cho đồng nhất
                         dia_chi_cu_the NVARCHAR(255),
                         tinh_thanh_pho NVARCHAR(255),
                         quan_huyen NVARCHAR(255),
                         xa_phuong_thi_tran nvarchar(255),
    -------------------------------------------
                         FOREIGN KEY (tai_khoan_khach_hang_id) REFERENCES tai_khoan(id),
                         FOREIGN KEY (tai_khoan_nhan_vien_id) REFERENCES tai_khoan(id),
                         FOREIGN KEY (khuyen_mai) REFERENCES khuyen_mai(id),
                         FOREIGN KEY (thanh_toan_id) REFERENCES thanh_toan(id)
);
select * from thong_tin_nguoi_dung
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

CREATE TABLE hoa_don_khuyen_mai (
                                    id BIGINT PRIMARY KEY IDENTITY(1,1),
                                    hoa_don_id BIGINT,
                                    khuyen_mai_id BIGINT,
                                    FOREIGN KEY (hoa_don_id) REFERENCES hoa_don(id),
                                    FOREIGN KEY (khuyen_mai_id) REFERENCES khuyen_mai(id)
);


use ShopShoe

    INSERT INTO thong_tin_nguoi_dung ( ngay_sinh, sdt, ten,cccd,gioi_tinh, ngay_cap_nhat)
VALUES
    ( '1990-01-01', '0987654321', N'Trần Đăng','009876000765',1, GETDATE() ),
     ('1990-02-02', '0987654321', N'Bùi Hùng','098786788765',1, GETDATE()),
    ( '1990-03-03', '0987654321', N'Minh Quân','008675000223',1, GETDATE()),
    ( '1990-04-04', '0987654321', N'Xuân Thiệu','009034055123',1, GETDATE()),
    ( '1990-05-05', '0987654321', N'Xuân Mai','006756777867',2, GETDATE());



INSERT INTO [dbo].[xuat_xu]
([ten],[trang_thai])
VALUES
    (N'Trung quốc',1),
    (N'Việt Nam',1),
    (N'Mỹ',1),
    (N'Pháp',1),
    (N'Nhật Bản',1),
    (N'Đức',1);


INSERT INTO quyen (ten, trang_thai)
VALUES
(N'Nhân Viên', 1),
(N'Quản Lý', 1),
(N'Khách Hàng', 1)

    INSERT INTO tai_khoan (ma_tai_khoan, email, ngay_tao, ngay_cap_nhat, password, anh, trang_thai, thong_tin_nguoi_dung_id)
VALUES
    ('NV2' ,'quanluc123@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh1.jpg',1,1),
    ('NV1' , 'thieu456@gmail.com',  GETDATE(), GETDATE(), '0987654321', 'anh2.jpg',1,2),
    ('NV4' , 'hungbt99@gmail.com' , GETDATE(), GETDATE(), '0987654321', 'anh3.jpg',1,3),
    ('NV5' , 'dang3389@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh4.jpg',1, 4),
    ('NV5' , 'dang78yu@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh5.jpg',1,5);



INSERT INTO phan_quyen (tai_khoan_id, quyen_id)
VALUES
(5, 1),
(2, 2),
(3, 3),
(4, 2)


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
(N'Xanh', 1),
(N'Đỏ', 1),
( N'Tím', 1),
( N'Vàng', 1),
(N'Hồng', 1),
(N'Lam', 1),
( N'Đen', 1),
( N'Trắng', 1),
(N'Xám', 1),
(N'Trắng Xanh', 1),
( N'Đỏ Xanh', 1),
( N'Đen Xám', 1),
(N'Xám', 1),
(N'Cam', 1),
( N'Trắng Đen', 1),
( N'Đỏ Tươi', 1),
(N'Lục Lam', 1),
(N'Xanh Navi', 1),
( N'Vàng', 1),
(N'Trắng Xanh', 1),
(N'Trắng Đỏ', 1),
(N'Đen Trắng', 1),
(N'Trắng Xám', 1),
(N'Nâu', 1),
(N'Trắng đỏ', 1),
(N'Trắng Cam', 1),
(N'Vàng Cam', 1),
(N'Đen Xanh', 1),
(N'Xanh Dương', 1)
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


INSERT INTO thuong_hieu (ten, trang_thai)
VALUES
    ('Nike', 1),
    ('Adidas', 1),
    ('Puma', 1),
    ('MWC ', 1),
    ('Skechers', 1),
    ('Reebok', 1),
    ('Asic', 1),
    ('LACOSTE', 1);

INSERT INTO thanh_toan (ten, trang_thai)
VALUES
(N'Thanh toán online', 1),
(N'Thanh toán khi nhận hàng', 1),
(N'Thanh toán VNPay', 1);



INSERT INTO dia_chi(ten, so_dien_thoai, dia_chi_cu_the, tinh_thanh_pho, quan_huyen, xa_phuong_thi_tran,ngay_cap_nhat,thong_tin_nguoi_dung_id,trang_thai)
VALUES
( N'Ma Văn Quang', '0967565467', N'SỐ 22', N'Hà Nội',N'Cầu Giấy',N'Xuân Thủy',GETDATE(),1,1),
( N'Nguyễn Thị Bích', '0887656545', N'SỐ 33', N'Hà Nội', N'Đống Đa',N'Xuân Thủy',GETDATE(),1,1),
( N'Tô GIang', '0887556745', N'SỐ 22',  N'Hà Nội',N'Cầu Giấy',N'Xuân Thủy',GETDATE(),2,1),
( N'Xuân Thu', '0887656545', N'SỐ 33',  N'Đống Đa',N'Đống Đa',N'Xuân Thủy',GETDATE(),2,1)


    INSERT INTO san_pham (ma_san_pham,ngay_tao, ten, trang_thai, ngay_cap_nhat, mo_ta,thuong_hieu,xuat_xu,danh_muc,anh_bia)
VALUES
    ('SP1',GETDATE(), N'GIÀY PUMA SHUFFLE PERFORATED NAM', 1, GETDATE(), N'Giày Puma Shuffle Perforated mẫu giày cổ điển lấy cảm hứng từ những 1980 của Puma. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',3,6,3,'giay-puma-shuffle-perforated-nam-den-02-800x800.jpg'),
    ('SP2',GETDATE(), N'GIÀY NIKE REACTX INFINITY 4 NAM', 1, GETDATE(), N'Giày Nike ReactX Infinity 4 là siêu phẩm giày thể thao cao cấp nhất của Nike trong năm nay, một mẫu giày khiến bạn không thể rời mắt khi nhìn thấy nó ở bất cứ nơi đâu. Thiết kế đẹp, kiểu dáng đẳng cấp và công nghệ đỉnh cao là những gì bạn có thể nói về Nike ReactX Infinity 4.',1,2,1,'giay-nike-reactx-infinity-4-nam-xam-01-800x800.jpg'),
    ('SP3',GETDATE(), N'GIÀY PUMA SLIPSTREAM ARCHIVE REMASTERED NAM', 1, GETDATE(), N'Giày Puma Slipstream Archive Remastered mẫu giày sneaker rất nổi tiếng của Puma, thiết kế cổ điển nhưng đẹp và không bao giờ lo lỗi mốt. Puma Slipstream Archive Remastered là lựa chọn không thể bỏ qua của các fan giày sneaker.',3,6,1,'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg'),
    ('SP4',GETDATE(), N'GIÀY NIKE REACTX INFINITY 4 NAM', 1, GETDATE(), N'Giày Nike ReactX Infinity 4 là siêu phẩm giày thể thao cao cấp nhất của Nike trong năm nay, một mẫu giày khiến bạn không thể rời mắt khi nhìn thấy nó ở bất cứ nơi đâu. Thiết kế đẹp, kiểu dáng đẳng cấp và công nghệ đỉnh cao là những gì bạn có thể nói về Nike ReactX Infinity 4.',1,2,1,'giay-nike-reactx-infinity-4-nam-den-xanh-01-800x800.jpg'),
    ('SP5',GETDATE(), N'GIÀY NIKE AIR ZOOM STRUCTURE 25 NAM', 1, GETDATE(), N'Giày Nike Air Zoom Structure 25 là mẫu giày thể thao mới nhất của Nike trong năm nay với thiết kế cực đẹp và rất nhiều cải tiến so với phiên bản tiền nhiệm Structure 24, đây chắc chắn là một trong những siêu phẩm được chờ đợi nhất của Nike thời điểm hiện tại.',1,2,2,'giay-nike-air-zoom-structure-25-nam-den-trang-01-800x800.jpg'),
    ('SP6',GETDATE(), N'GIÀY NIKE AIR MAX SC NAM', 1, GETDATE(), N'Giày Nike Air Max SC mang nét huyền thoại của Nike, với bộ đệm Air Max trứ danh đây là mẫu giày có thể kết hợp với bất cứ trang phục nào mà bạn vẫn hoàn toàn tự tin trong mọi hoàn cảnh.',1,2,2,'giay-nike-air-max-sc-nam-xanh-navy-01-800x800.jpg'),
    ('SP7',GETDATE(), N'GIÀY NIKE AIR WINFLO 10 NỮ ', 1, GETDATE(), N'Giày Nike Air Winflo 10 có nhiều sự cải tiến vượt trội so với mẫu Winflo 9 trước đó cả về kiểu dáng cũng như những công nghệ hỗ trợ đi kèm.',1,2,2,'giay-nike-air-winflo-10-nu-den-trang-01-800x800.jpg'),
    ('SP8',GETDATE(), N'GIÀY NIKE REACT ESCAPE RUN 2 NỮ', 1, GETDATE(), N'Giày Nike React Escape Run 2 một mẫu giày thể thao có thiết kế thời trang, với bộ đệm vô cùng êm ái tạo cảm giác thật sự dễ chịu khi di chuyển. Một mẫu giày tuyệt vời mà chị em không thể bỏ qua được.',1,2,2,'giay-nike-react-escape-run-2-nu-trang-xanh-01-800x800.jpg'),
    ('SP9',GETDATE(), N'GIÀY NIKE RENEW IN-SEASON TR 11 NỮ', 1, GETDATE(), N'Giày Nike Renew In-Season TR 11 một mẫu giày training có thiết kế đẹp. Công nghệ tiên tiến của Nike giúp đôi giày trở lên rất nhẹ, vừa vặn với bàn chân, mọi chuyển động đều rất thoải mái nhẹ nhàng.',1,2,2,'giay-nike-renew-in-season-tr-11-nu-trang-01-800x800.jpg'),
    ('SP10',GETDATE(), N'GIÀY NIKE AIR ZOOM PEGASUS 40 NAM', 1, GETDATE(), N'Giày Nike Air Zoom Pegasus 40 là siêu phẩm giày thể thao được mong chờ nhất năm 2023 này. Đây là phiên bản thứ 40 của dòng giày huyền thoại Nike Pegasus và thật tuyệt vời, Nike Air Zoom Pegasus 40 đã có mặt',1,2,2,'giay-nike-air-zoom-pegasus-40-nam-xanh-duong-01-800x800.jpg'),
    ('SP11',GETDATE(), N'GIÀY ADIDAS RUNFALCON 3.0 NAM', 1, GETDATE(), N'Giày Adidas RunFalcon 3.0 là mẫu giày thể thao mới nhất của adidas. Với thiết kế trẻ trung, khỏe khoắn, ôm sát bàn chân. Đế giày cloud siêu nhẹ và êm ái giúp bạn di chuyển cả ngày mà không mệt mỏi.',2,2,3,'giay-adidas-runfalcon-3-nam-xam-den-xanh-01-800x800.jpg'),
    ('SP12',GETDATE(), N'GIÀY ADIDAS ADIZERO TAKUMI SEN 9 NAM', 1, GETDATE(), N'Giày Adidas Adizero Takumi Sen 9 là mẫu giày chạy bộ siêu cấp của adidas, hội tụ đầy đủ những tinh hoa công nghệ đỉnh nhất cho một đôi giày chạy, giúp bạn chinh phục những kỷ lục mới của chính mình.',2,2,3,'giay-adidas-adizero-takumi-sen-9-nam-trang-xanh-01-800x800.jpg'),
    ('SP13',GETDATE(), N'GIÀY ADIDAS DURAMO SPEED NAM', 1, GETDATE(), N'Giày adidas Duramo Speed là mẫu giày thể thao vừa ra mắt của adidas có thiết kế đẹp, công nghệ cao phù hợp cho tất cả mọi người. Chắc chắn adidas Duramo Speed sẽ được rất nhiều người yêu thích và sử dụng.',2,2,3,'giay-adidas-duramo-speed-nam-xanh-navy-01-800x800.jpg'),
    ('SP14',GETDATE(), N'GIÀY ADIDAS GALAXY 6 NAM', 1, GETDATE(), N'Giày adidas Galaxy 6  có thiết kế thể thao đẹp mắt, đây là mẫu giày có thể sử dụng trong mọi hoạt động hàng ngày. adidas Galaxy 6 có nhiều cải tiến so với adidas Galaxy 5 giúp đôi giày ngày càng hoàn hảo.',2,2,3,'giay-adidas-runfalcon-3-nam-trang-do-01-800x800.jpg'),
    ('SP15',GETDATE(), N'GIÀY ADIDAS SOLARGLIDE 5 NAM', 1, GETDATE(), N'Giày adidas Solarglide 5 là mẫu giày thể thao đa dụng thường ngày với khả năng hoàn trả năng lượng tuyệt vời. Thiết kế đẹp đầy năng động giúp cho adidas Solarglide 5 chiếm được cảm tình của bất cứ ai khi nhìn thấy nó.',2,2,3,'giay-adidas-solar-glide-5-nam-vang-cam-01-800x800.jpg'),
    ('SP16',GETDATE(), N'GIÀY ADIDAS ADIZERO RC 5 NAM NỮ', 1, GETDATE(), N'Giày adidas Adizero RC 5 là mẫu giày chạy bộ siêu nhẹ, có thiết kế cực đẹp và thời trang phù hợp cho cả nam và nữ. Đặc điểm cực kỳ nổi bật là hơn 50% sản phẩm được làm bằng vật liệu tái chế thân thiện và bảo vệ môi trường.',2,2,3,'giay-adidas-adizero-rc-5-nam-nu-trang-xanh-01-800x800.jpg'),
    ('SP17',GETDATE(), N'GIÀY ADIDAS SUPERNOVA+ NAM', 1, GETDATE(), N'Giày adidas Supernova+ là mẫu giày thể thao có thiết kế rất đẹp, cùng với đó là công nghệ đỉnh cao với những vật liệu cao cấp độc quyền của Adidas. adidas Supernova+ là mẫu giày mà dân thể thao không thể bỏ qua.',2,2,3,'giay-adidas-supernova+-nam-den-trang-01-800x800.jpg'),
    ('SP18',GETDATE(), N'GIÀY ADIDAS X9000L3 NAM', 1, GETDATE(), N'Giày adidas X9000L3 có thiết kế thời trang, khỏe khắn và năng động. Với công nghệ đế Eva kết hợp với Boost trứ danh giúp đôi giày cực kỳ êm và đàn hồi trợ lực rất tốt cho bàn chân. Đặc biệt hơn lớp lót giày làm từ tảo giúp làm sạch môi trường nước bị ô nhiễm.',2,2,3,'giay-adidas-x900l3-nam-den-trang-01-800x800.jpg'),
    ('SP19',GETDATE(), N'GIÀY ADIDAS GALAXY 6 NỮ', 1, GETDATE(), N'Giày adidas Galaxy 6  có thiết kế thể thao đẹp mắt, đây là mẫu giày có thể sử dụng trong mọi hoạt động hàng ngày. adidas Galaxy 6 có nhiều cải tiến so với adidas Galaxy 5 giúp đôi giày ngày càng hoàn hảo.',2,2,3,'giay-adidas-galaxy-6-nu-trang-xanh-01-800x800.jpg'),
    ('SP20',GETDATE(), N'GIÀY ADIDAS RUN 80S NAM ', 1, GETDATE(), N'Giày adidas Run 80S là mẫu giày sneaker có thiết kế cổ điển của thập niên 80 nhưng rất đẹp và không bao giờ lỗi mốt. adidas Run 80S có thể sử dụng trong mọi hoạt động hàng ngày.',2,2,3,'giay-adidas-run-80s-nam-xam-01-800x800.jpg'),
    ('SP21',GETDATE(), N'GIÀY PUMA COURT STAR SL NAM', 1, GETDATE(), N'Giày Puma Court Star SL là mẫu giày có thiết kế đơn giản mà đẹp mặt. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Puma Court Star SL được sử dụng trong mọi hoạt động hàng ngày.',3,6,4,'giay-puma-court-star-sl-nam-trang-den-01-800x800.jpg'),
    ('SP22',GETDATE(), N'GIÀY PUMA ANZARUN 2.0 OPEN ROAD NAM', 1, GETDATE(), N'Giày Puma Anzarun 2.0 Open Road mẫu giày sneaker có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Đây chính là mẫu giày đa năng tuyệt vời cho mọi hoạt động hàng ngày.',3,6,4,'giay-puma-anzarun-2-open-road-nam-trang-cam-01-800x800.jpg'),
    ('SP23',GETDATE(), N'GIÀY PUMA SUEDE BULK NAM', 1, GETDATE(), N'Giày Puma Suede là một trong mẫu giày Classic huyền thoại của Puma. Được làm bằng da lộn cao cấp, sang trọng, đế giày cực kỳ bền đẹp. Đây là một mẫu giày tuyệt vời dành dành cho mọi hoạt động hàng ngày.',3,6,4,'giay-puma-suede-bulk-nam-xanh-navy-01-800x800.jpg'),
    ('SP24',GETDATE(), N'GIÀY PUMA SOFTRIDE CRUISE 2 NAM', 1, GETDATE(), N'Giày Puma Softride Cruise 2 có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Với trọng lượng rất nhẹ và bộ đế cực kỳ êm ái Puma Softride Cruise 2 mang đến cho người đi cảm giác rất linh hoạt và năng động.',3,6,4,'giay-puma-SOFTRIDE-Cruise-2-nam-xanh-navy-01-800x800.jpg'),
    ('SP25',GETDATE(), N'GIÀY PUMA TAPER NAM', 1, GETDATE(), N'Giày Puma Taper có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Với trọng lượng rất nhẹ và bộ đế cực kỳ êm ái Puma Taper mang đến cho người đi cảm giác rất linh hoạt và năng động.',3,6,4,'giay-puma-taper-nam-trang-01-800x800.jpg'),
    ('SP26',GETDATE(), N'GIÀY PUMA CAVEN NAM', 1, GETDATE(), N'Giày Puma Caven mẫu giày cổ điển được phát triển từ những năm 1980 của Puma. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',3,6,4,'giay-puma-caven-nam-trang-do-01-800x800.jpg'),
    ('SP27',GETDATE(), N'GIÀY PUMA SOFTRIDE CRUISE NAM', 1, GETDATE(), N'Giày Puma Softride Cruise là một trong mẫu giày thể thao có có thiết kế đơn giản mà rất tinh tế. Một mẫu giày mà bạn có thế sử dụng trong mọi hoạt động hàng ngày.',3,6,4,'giay-puma-softride-cruise-nam-trang-01-800x800.jpg'),
    ('SP28',GETDATE(), N'GIÀY PUMA TRAMP OG NAM', 1, GETDATE(), N'Giày Puma Tramp OG là một trong mẫu giày Classic huyền thoại của Puma. Được làm bằng da lộn cao cấp, sang trọng, đế giày cực kỳ bền đẹp. Đây là một mẫu giày tuyệt vời dành dành cho mọi hoạt động hàng ngày.',3,6,4,'giay-puma-tramp-og-nam-nau-01-800x800.jpg'),
    ('SP29',GETDATE(), N'GIÀY PUMA SLIPSTREAM CORD NAM', 1, GETDATE(), N'Giày Puma Slipstream Cord mẫu giày sneaker rất nổi tiếng của Puma, thiết kế cổ điển nhưng đẹp và không bao giờ lo lỗi mốt. Puma Slipstream Cord là lựa chọn không thể bỏ qua của các fan giày sneaker.',3,6,4,'Slipstream-Cord-Unisex-Sneakers_80-800x800.jpg'),
    ('SP30',GETDATE(), N'GIÀY PUMA CAVEN MERCEDES NAM', 1, GETDATE(), N'Giày Puma Caven mẫu giày cổ điển được phát triển từ những năm 1980 của Puma. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',3,6,4,'giay-puma-caven-mercedes-nam-den-xanh-01-800x800.jpg'),
    ('SP31',GETDATE(), N'GIÀY ASICS GLIDERIDE 2 NAM', 1, GETDATE(), N'Giày Asics GlideRide 2 là siêu phẩm chạy bộ tốt của Asics, tập trung vào việc tiết kiệm năng lượng tối đa cho người sử dụng. Ngoài ra, Asics GlideRide 2 sử dụng những công nghệ tiên tiến nhất  và có thiết kế rất đẹp có thể sử dụng đi lại hàng ngày.',7,5,1,'giay-asics-glideride-2-nam-xanh-01-800x800.jpg'),
    ('SP32',GETDATE(), N'GIÀY ASICS EVORIDE 2 NAM', 1, GETDATE(), N'Giày Asics EvoRide 2 là một trong những mẫu giày chạy bộ tốt nhất của Asics, tập trung vào việc tiết kiệm năng lượng tối đa cho người sử dụng.  Ngoài ra, Asics EvoRide 2 có thiết kế đẹp có thể sử dụng đi lại hàng ngày.',7,5,1,'giay-asics-evoride-2-nam-den-trang-01-800x800.jpg'),
    ('SP33',GETDATE(), N'GIÀY ASICS SKY COURT NAM', 1, GETDATE(), N'Giày Asics Sky Court được người yêu giày trên toàn thế giới nhắc đến như là một mẫu sneaker kinh điển mà bạn không thể bỏ qua. Asics Sky Court có thể sử dụng trong nhiều hoạt động hàng ngày và kết hợp được với rất nhiều loại quần áo khác nhau.',7,5,1,'giay-asics-sky-court-nam-trang-do-01-800x800.jpg'),
    ('SP34',GETDATE(), N'GIÀY ASICS GEL-VENTURE 8 NAM ', 1, GETDATE(), N'Giày Asics Gel-Venture 8 một mẫu giày với công nghệ GEL đỉnh cao của Asics Nhật Bản mang đến sự êm ái cùng cảm giác thật sự dễ chịu khi di chuyển. Asics Gel-Venture 8 thách thức mọi địa hình, giúp bạn trải nghiệm những cũng đường tuyệt vời nhất.',7,5,1,'giay-asics-gel-venture-8-nam-xanh-navy-01-800x800.png'),
    ('SP35',GETDATE(), N'GIÀY ASICS CLASSIC CT NAM', 1, GETDATE(), N'Giày Asics Classic CT được người yêu giày trên toàn thế giới nhắc đến như là một mẫu sneaker kinh điển mà bạn không thể bỏ qua. Asics Classic CT có thiết kế cổ điển với những đường nét tinh tế, chất liệu cao cấp và cực kỳ bền bỉ với thời gian.',7,5,1,'giay-asics-classic-ct-nam-trang-xanh-01-800x800.jpg'),
    ('SP36',GETDATE(), N'GIÀY ASICS GEL SONOMA 6 NAM', 1, GETDATE(), N'Giày Asics Gel Sonoma 6 với thiết kế đẹp, khỏe khoắn năng động cùng với công nghệ đỉnh cao của Asics Nhật Bản mang đến cho người sử dụng một đôi giày trail tuyệt vời.',7,5,1,'giay-asics-gel-sonoma-6-nam-den-xanh-01-800x800.png'),
    ('SP37',GETDATE(), N'GIÀY ASICS LYTERACER 2 NAM', 1, GETDATE(), N'Giày Asics LyteRacer 2 là mẫu giày thể thao được thiết kế gọn gàng phù hợp cho những ai yêu thích chạy bộ, đi bộ hàng ngày, mang lại hiệu suất rất cao cho người sử dụng.',7,5,1,'giay-asics-lyteracer-2-nam-trang-vang-01-800x800.png'),
    ('SP38',GETDATE(), N'GIÀY LACOSTE RE-COMFORT NAM', 1, GETDATE(), N'Giày Lacoste Re-Comfort là mẫu giày thể thao đa dụng của Lacoste, với thiết kế thời trang phong cách khỏe khắn mạnh mẽ và rất nhiều công nghệ tiên tiến từ hãng thời trang cao cấp của Pháp giúp cho đôi giày êm ái đồng thời có sự cân bằng tốt.',8,4,2,'giay-lacoste-re-comfort-nam-xam-den-01-800x800.jpg'),
    ('SP39',GETDATE(), N'GIÀY LACOSTE SPIN ULTRA GTX NAM', 1, GETDATE(), N'Giày Lacoste Spin Ultra GTX là mẫu giày thể thao hiệu suất cao cấp nhất của Lacoste, với những công nghệ đỉnh cao hợp tác với những hãng vật liệu nổi tiếng nhất thế giới, thể hiện tinh thần đổi mới trong thiết kế của Lacoste.',8,4,2,'giay-lacoste-run-spin-ultra-gtx-nam-den-01-800x800.jpg'),
    ('SP40',GETDATE(), N'GIÀY LACOSTE STORM 96 LO NAM', 1, GETDATE(), N'Giày Lacoste Storm 96 LO có thiết kế cổ điển lấy cảm hứng từ thập niên 90 với tính thẩm mỹ táo bạo và bắt kịp xu hướng. Lacoste Storm 96 LO chắc chắn là lựa chọn cho những ai yêu thích thời trang.',8,4,2,'giay-lacoste-storm-96-lo-nam-den-01-800x800.jpg'),
    ('SP41',GETDATE(), N'GIÀY ADIDAS ALPHATORSION M NAM', 1, GETDATE(), N'Nếu bạn yêu thích kiểu dáng thiết kế thon gọn của dòng đế Bounce thì Adidas Alphatorsion là một mẫu giày bạn không nên bỏ lỡ. Với mức giá vô cùng hợp lý cho các tín đồ yêu thích thể thao. Màu sắc trẻ trung, năng động, tươi sáng giúp kết hợp được với các kiểu quần áo khác nhau.',2,2,3,'giay-adidas-alphatorsion-m-nam-den-trang-01-800x800.jpg'),
    ('SP42',GETDATE(), N'GIÀY ADIDAS DURAMO SL 2.0 NAM', 1, GETDATE(), N'Sản phẩm tốt',2,2,3,'giay-adidas-duramo-sl-2-nam-den-cam-01-800x800.jpg'),
    ('SP43',GETDATE(), N'GIÀY ADIDAS SUPERNOVA 2 NAM', 1, GETDATE(), N'Giày adidas Supernova 2 là mẫu giày thể thao có thiết kế cực đẹp kết hợp với công nghệ đỉnh cao của adidas, adidas Supernova 2 mang đến cảm giác vô cùng thoải mái cho người sử dụng.',2,2,3,'giay-adidas-supernova-2-nam-xam-01-800x800.jpg'),
    ('SP44',GETDATE(), N'GIÀY ADIDAS ADIZERO RC 4 NAM', 1, GETDATE(), N'Giày adidas Adizero RC 4 là mẫu giày chạy bộ nhẹ, có thiết kế đẹp, thời trang. Đặc điểm cực kỳ nổi bật là hơn 50% sản phẩm được làm bằng vật liệu tái chế thân thiện và bảo vệ môi trường.',2,2,3,'giay-adidas-adizero-rc-4-nam-den-xam-01-800x800.jpg'),
    ('SP45',GETDATE(), N'GIÀY ADIDAS GRAND COURT BASE 2.0 NAM NỮ', 1, GETDATE(), N'Giày adidas Grand Court Base 2.0 phiên bản nâng cấp rất được ưu chuộng của dòng Grand Court Base .Với những cải tiến mới khiến cho mẫu giày này bền đẹp và năng động hơn khá nhiều.',2,2,3,'giay-adidas-grand-court-base-2-nam-trang-do-xanh-01-800x800.jpg')




INSERT INTO san_pham_chi_tiet (ma,so_luong, don_gia, ngay_tao, ngay_cap_nhat, trang_thai,kich_thuoc,mau_sac,san_pham_id,anh,qr)
VALUES
    ('SPCT1',100,2600000, GETDATE(), GETDATE(), 1,1,7,1,'giay-puma-shuffle-perforated-nam-den-02-800x800.jpg','SPCT1_QRCode.png'),
    ('SPCT2',200,2600000, GETDATE(), GETDATE(), 1,2,7,1,'giay-puma-shuffle-perforated-nam-den-02-800x800.jpg','SPCT2_QRCode.png'),
    ('SPCT3',403,2600000, GETDATE(), GETDATE(), 1,3,7,1,'giay-puma-shuffle-perforated-nam-den-02-800x800.jpg','SPCT3_QRCode.png'),
    ('SPCT4',204,3200000, GETDATE(), GETDATE(), 1,3,9,2,'giay-nike-reactx-infinity-4-nam-xam-01-800x800.jpg','SPCT4_QRCode.png'),
    ('SPCT5',311,3200000, GETDATE(), GETDATE(), 1,4,9,2,'giay-nike-reactx-infinity-4-nam-xam-01-800x800.jpg','SPCT5_QRCode.png'),
    ('SPCT6',100,3200000, GETDATE(), GETDATE(), 1,2,9,2,'giay-nike-reactx-infinity-4-nam-xam-01-800x800.jpg','SPCT6_QRCode.png'),
    ('SPCT7',200,3200000, GETDATE(), GETDATE(), 1,4,10,3,'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg','SPCT7_QRCode.png'),
    ('SPCT8',403,3200000, GETDATE(), GETDATE(), 1,3,10,3,'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg','SPCT8_QRCode.png'),
    ('SPCT9',204,3200000, GETDATE(), GETDATE(), 1,5,10,3,'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg','SPCT9_QRCode.png'),
    ('SPCT10',311,2000000, GETDATE(), GETDATE(), 1,4,11,45,'giay-adidas-grand-court-base-2-nam-trang-do-xanh-01-800x800.jpg','SPCT10_QRCode.png'),
    ('SPCT11',100,2000000, GETDATE(), GETDATE(), 1,2,11,45,'giay-adidas-grand-court-base-2-nam-trang-do-xanh-01-800x800.jpg','SPCT11_QRCode.png'),
    ('SPCT12',200,2880000, GETDATE(), GETDATE(), 1,4,12,44,'giay-adidas-adizero-rc-4-nam-den-xam-01-800x800.jpg','SPCT12_QRCode.png'),
    ('SPCT13',403,2880000, GETDATE(), GETDATE(), 1,3,12,44,'giay-adidas-adizero-rc-4-nam-den-xam-01-800x800.jpg','SPCT13_QRCode.png'),
    ('SPCT14',204,3200000, GETDATE(), GETDATE(), 1,3,13,43,'giay-adidas-supernova-2-nam-xam-01-800x800.jpg','SPCT14_QRCode.png'),
    ('SPCT15',311,3200000, GETDATE(), GETDATE(), 1,4,13,43,'giay-adidas-supernova-2-nam-xam-01-800x800.jpg','SPCT15_QRCode.png'),
    ('SPCT16',100,1700000, GETDATE(), GETDATE(), 1,2,14,42,'giay-adidas-duramo-sl-2-nam-den-cam-01-800x800.jpg','SPCT16_QRCode.png'),
    ('SPCT17',200,2700000, GETDATE(), GETDATE(), 1,4,15,41,'giay-adidas-alphatorsion-m-nam-den-trang-01-800x800.jpg','SPCT17_QRCode.png'),
    ('SPCT18',403,2700000, GETDATE(), GETDATE(), 1,3,6,40,'giay-lacoste-storm-96-lo-nam-den-01-800x800.jpg','SPCT18_QRCode.png'),
    ('SPCT19',204,4750000, GETDATE(), GETDATE(), 1,3,3,39,'giay-asics-lyteracer-2-nam-trang-vang-01-800x800.png','SPCT19_QRCode.png'),
    ('SPCT20',311,3650000, GETDATE(), GETDATE(), 1,4,2,38,'giay-lacoste-re-comfort-nam-xam-den-01-800x800.jpg','SPCT20_QRCode.png'),
    ('SPCT21',100,1850000, GETDATE(), GETDATE(), 1,2,3,37,'giay-asics-classic-ct-nam-trang-xanh-01-800x800.jpg','SPCT21_QRCode.png'),
    ('SPCT22',200,2100000, GETDATE(), GETDATE(), 1,4,18,36,'giay-asics-gel-venture-8-nam-xanh-navy-01-800x800.png','SPCT22_QRCode.png'),
    ('SPCT23',403,1850000, GETDATE(), GETDATE(), 1,3,20,35,'giay-asics-classic-ct-nam-trang-xanh-01-800x800.jpg','SPCT23_QRCode.png'),
    ('SPCT24',204,2100000, GETDATE(), GETDATE(), 1,3,18,34,'giay-asics-gel-venture-8-nam-xanh-navy-01-800x800.png','SPCT24_QRCode.png'),
    ('SPCT25',311,2950000, GETDATE(), GETDATE(), 1,4,21,33,'giay-asics-sky-court-nam-trang-do-01-800x800.jpg','SPCT25_QRCode.png'),
    ('SPCT26',100,3050000, GETDATE(), GETDATE(), 1,2,22,32,'giay-asics-evoride-2-nam-den-trang-01-800x800.jpg','SPCT26_QRCode.png'),
    ('SPCT27',200,4050000, GETDATE(), GETDATE(), 1,4,1,31,'giay-asics-glideride-2-nam-xanh-01-800x800.jpg','SPCT27_QRCode.png'),
    ('SPCT28',403,2300000, GETDATE(), GETDATE(), 1,3,11,30,'giay-puma-caven-mercedes-nam-den-xanh-01-800x800.jpg','SPCT28_QRCode.png'),
    ('SPCT29',204,3200000, GETDATE(), GETDATE(), 1,3,23,29,'Slipstream-Cord-Unisex-Sneakers_80-800x800.jpg','SPCT29_QRCode.png'),
    ('SPCT30',311,2500000, GETDATE(), GETDATE(), 1,4,24,28,'giay-puma-tramp-og-nam-nau-01-800x800.jpg','SPCT30_QRCode.png'),
    ('SPCT31',100,1900000, GETDATE(), GETDATE(), 1,2,8,27,'giay-puma-softride-cruise-nam-trang-01-800x800.jpg','SPCT31_QRCode.png'),
    ('SPCT32',200,1750000, GETDATE(), GETDATE(), 1,4,25,26,'giay-puma-caven-nam-trang-do-01-800x800.jpg','SPCT32_QRCode.png'),
    ('SPCT33',403,1700000, GETDATE(), GETDATE(), 1,3,8,25,'giay-puma-taper-nam-trang-01-800x800.jpg','SPCT33_QRCode.png'),
    ('SPCT34',204,1900000, GETDATE(), GETDATE(), 1,3,18,24,'giay-puma-SOFTRIDE-Cruise-2-nam-xanh-navy-01-800x800.jpg','SPCT34_QRCode.png'),
    ('SPCT35',311,2500000, GETDATE(), GETDATE(), 1,4,18,23,'giay-puma-suede-bulk-nam-xanh-navy-01-800x800.jpg','SPCT35_QRCode.png'),
    ('SPCT36',100,2850000, GETDATE(), GETDATE(), 1,2,26,22,'giay-puma-anzarun-2-open-road-nam-trang-cam-01-800x800.jpg','SPCT36_QRCode.png'),
    ('SPCT37',200,1850000, GETDATE(), GETDATE(), 1,4,15,21,'giay-puma-court-star-sl-nam-trang-den-01-800x800.jpg','SPCT37_QRCode.png'),
    ('SPCT38',403,2850000, GETDATE(), GETDATE(), 1,3,9,20,'giay-adidas-run-80s-nam-xam-01-800x800.jpg','SPCT38_QRCode.png'),
    ('SPCT39',204,1700000, GETDATE(), GETDATE(), 1,3,10,19,'giay-adidas-galaxy-6-nu-trang-xanh-01-800x800.jpg','SPCT39_QRCode.png'),
    ('SPCT40',311,3100000, GETDATE(), GETDATE(), 1,4,22,18,'giay-adidas-x900l3-nam-den-trang-01-800x800.jpg','SPCT40_QRCode.png'),
    ('SPCT41',100,3500000, GETDATE(), GETDATE(), 1,2,22,17,'giay-adidas-supernova+-nam-den-trang-01-800x800.jpg','SPCT41_QRCode.png'),
    ('SPCT42',200,2950000, GETDATE(), GETDATE(), 1,4,10,16,'giay-adidas-adizero-rc-5-nam-nu-trang-xanh-01-800x800.jpg','SPCT42_QRCode.png'),
    ('SPCT43',403,3800000, GETDATE(), GETDATE(), 1,3,27,15,'giay-adidas-solar-glide-5-nam-vang-cam-01-800x800.jpg','SPCT43_QRCode.png'),
    ('SPCT44',204,1700000, GETDATE(), GETDATE(), 1,3,21,14,'giay-adidas-runfalcon-3-nam-trang-do-01-800x800.jpg','SPCT44_QRCode.png'),
    ('SPCT45',311,2500000, GETDATE(), GETDATE(), 1,4,18,13,'giay-adidas-duramo-speed-nam-xanh-navy-01-800x800.jpg','SPCT45_QRCode.png'),
    ('SPCT46',100,5000000, GETDATE(), GETDATE(), 1,2,20,12,'giay-adidas-adizero-takumi-sen-9-nam-trang-xanh-01-800x800.jpg','SPCT46_QRCode.png'),
    ('SPCT47',200,1800000, GETDATE(), GETDATE(), 1,4,28,11,'giay-adidas-runfalcon-3-nam-xam-den-xanh-01-800x800.jpg','SPCT47_QRCode.png'),
    ('SPCT48',403,3829000, GETDATE(), GETDATE(), 1,3,29,10,'giay-nike-air-zoom-pegasus-40-nam-xanh-duong-01-800x800.jpg','SPCT48_QRCode.png'),
    ('SPCT49',204,2810000, GETDATE(), GETDATE(), 1,3,8,9,'giay-nike-renew-in-season-tr-11-nu-trang-01-800x800.jpg','SPCT49_QRCode.png'),
    ('SPCT50',311,2950000, GETDATE(), GETDATE(), 1,4,1,8,'giay-nike-react-escape-run-2-nu-trang-xanh-01-800x800.jpg','SPCT50_QRCode.png'),
    ('SPCT51',100,2929000, GETDATE(), GETDATE(), 1,2,8,7,'giay-nike-air-winflo-10-nu-den-trang-01-800x800.jpg','SPCT51_QRCode.png'),
    ('SPCT52',200,2500000, GETDATE(), GETDATE(), 1,4,18,6,'giay-nike-air-max-sc-nam-xanh-navy-01-800x800.jpg','SPCT52_QRCode.png'),
    ('SPCT53',403,3829000, GETDATE(), GETDATE(), 1,3,22,5,'giay-nike-air-zoom-structure-25-nam-den-trang-01-800x800.jpg','SPCT53_QRCode.png'),
    ('SPCT54',204,4699000, GETDATE(), GETDATE(), 1,3,28,4,'giay-nike-reactx-infinity-4-nam-den-xanh-01-800x800.jpg','SPCT54_QRCode.png'),
    ('SPCT55',311,3200000, GETDATE(), GETDATE(), 1,4,20,3,'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg','SPCT55_QRCode.png')



INSERT INTO san_pham_anh (san_pham_id, anh)
VALUES
    (1, 'giay-puma-shuffle-perforated-nam-den-02-800x800.jpg'),
    (2, 'giay-nike-reactx-infinity-4-nam-xam-01-800x800.jpg'),
    (1, 'giay-puma-slipstream-archive-remastered-nam-trang-xanh-la-01-800x800.jpg'),
    (4, 'giay-nike-reactx-infinity-4-nam-den-xanh-01-800x800.jpg'),
    (5, 'giay-nike-air-zoom-structure-25-nam-den-trang-01-800x800.jpg'),
    (6, 'giay-nike-air-max-sc-nam-xanh-navy-01-800x800.jpg.jpg'),
    (7, 'giay-nike-air-winflo-10-nu-den-trang-01-800x800.jpg.jpg'),
    (8, 'giay-nike-react-escape-run-2-nu-trang-xanh-01-800x800.jpg'),
    (9, 'giay-nike-renew-in-season-tr-11-nu-trang-01-800x800.jpg'),
    (10, 'giay-nike-air-zoom-pegasus-40-nam-xanh-duong-01-800x800.jpg'),
    (11, 'giay-adidas-runfalcon-3-nam-xam-den-xanh-01-800x800.jpg'),
    (12, 'giay-adidas-adizero-takumi-sen-9-nam-trang-xanh-01-800x800.jpg'),
    (13, 'giay-adidas-duramo-speed-nam-xanh-navy-01-800x800.jpg'),
    (14, 'giay-adidas-runfalcon-3-nam-trang-do-01-800x800.jpg'),
    (15, 'giay-adidas-solar-glide-5-nam-vang-cam-01-800x800.jpg'),
    (16, 'giay-adidas-adizero-rc-5-nam-nu-trang-xanh-01-800x800.jpg'),
    (17, 'giay-adidas-supernova+-nam-den-trang-01-800x800.jpg.jpg'),
    (18, 'giay-adidas-x900l3-nam-den-trang-01-800x800.jpg'),
    (19, 'giay-adidas-galaxy-6-nu-trang-xanh-01-800x800.jpg'),
    (20, 'giay-adidas-run-80s-nam-xam-01-800x800.jpg'),
    (21, 'giay-puma-court-star-sl-nam-trang-den-01-800x800.jpg'),
    (22, 'giay-puma-anzarun-2-open-road-nam-trang-cam-01-800x800.jpg'),
    (23, 'giay-puma-suede-bulk-nam-xanh-navy-01-800x800.jpg'),
    (24, 'giay-puma-SOFTRIDE-Cruise-2-nam-xanh-navy-01-800x800.jpg'),
    (25, 'giay-puma-taper-nam-trang-01-800x800.jpg'),
    (26, 'giay-puma-caven-nam-trang-do-01-800x800.jpg'),
    (27, 'giay-puma-softride-cruise-nam-trang-01-800x800.jpg'),
    (28, 'giay-puma-tramp-og-nam-nau-01-800x800.jpg'),
    (29, 'Slipstream-Cord-Unisex-Sneakers_80-800x800.jpg'),
    (30, 'giay-puma-caven-mercedes-nam-den-xanh-01-800x800.jpg'),
    (31, 'giay-asics-glideride-2-nam-xanh-01-800x800.jpg'),
    (32, 'giay-asics-evoride-2-nam-den-trang-01-800x800.jpg'),
    (33, 'giay-asics-sky-court-nam-trang-do-01-800x800.jpg'),
    (34, 'giay-asics-gel-venture-8-nam-xanh-navy-01-800x800.png'),
    (35, 'giay-asics-classic-ct-nam-trang-xanh-01-800x800.jpg'),
    (36, 'giay-asics-gel-sonoma-6-nam-den-xanh-01-800x800.png'),
    (37, 'giay-asics-lyteracer-2-nam-trang-vang-01-800x800.jpg'),
    (38, 'giay-lacoste-re-comfort-nam-xam-den-01-800x800.jpg'),
    (39, 'giay-lacoste-run-spin-ultra-gtx-nam-den-01-800x800.jpg'),
    (40, 'giay-lacoste-storm-96-lo-nam-den-01-800x800.jpg'),
    (41, 'giay-adidas-alphatorsion-m-nam-den-trang-01-800x800.jpg'),
    (42, 'giay-adidas-duramo-sl-2-nam-den-cam-01-800x800.jpg'),
    (43, 'giay-adidas-supernova-2-nam-xam-01-800x800.jpg'),
    (44, 'giay-adidas-adizero-rc-4-nam-den-xam-01-800x800.jpg'),
    (45, 'giay-adidas-grand-court-base-2-nam-trang-do-xanh-01-800x800.jpg')


INSERT INTO [dbo].[khuyen_mai]
(ma,[ten],[mo_ta],[bat_dau],[ket_thuc],[giam_gia],[kieu_khuyen_mai],dieu_kien,so_luong,trang_thai)
VALUES
    ('KHUYENMAICHAOMUNG',N'KHUYẾN MÃI CHÀO MỪNG NGƯỜI MỚI',N'GIẢM 10% VỚI HÓA ĐƠN 0Đ',GETDATE(),GETDATE(),10 ,1,0,20,1),
    ('KHUYENMAIPK',N'KHUYẾN MÃI TƯNG BỪNG',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K',GETDATE(),GETDATE(),10000 ,0,10000,20,1),
    ('KHUYENMAITHANG10',N'KHUYẾN MÃI THÁNG 10',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 15K',GETDATE(),GETDATE(),15000 ,0,100000,20,1),
    ('KHUYENMAIDEMDONG',N'ĐÔNG KHUYẾN MÃI',N'GIẢM 80K KHI MUA SẢN PHẨM TRÊN 800K',GETDATE(),GETDATE(),80000 ,0,800000,20,1),
    ('KHUYENMAIBLACKDAY',N'KHUYẾN MÃI NGÀY ĐEN',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K',GETDATE(),GETDATE(),10000 ,1,10000,20,1);


INSERT INTO hoa_don (ma_hoa_don, ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, cho_xac_nhan, ghi_chu_cho_xac_nhan, cho_giao, ghi_chu_cho_giao, dang_giao, ghi_chu_dang_giao, hoan_thanh, ghi_chu_hoan_thanh, huy, ghi_chu_huy, tai_khoan_nhan_vien_id,tai_khoan_khach_hang_id,khuyen_mai, thanh_toan_id, kieu_hoa_don, tong_tien, phi_ship, tien_giam, tong_tien_sau_giam, ten, sdt, email, dia_chi_cu_the, tinh_thanh_pho, quan_huyen, xa_phuong_thi_tran)
VALUES
('HD001', GETDATE(), N'Ghi chú cho hóa đơn 1', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,1,2, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD002', '2023-1-15', N'Ghi chú cho hóa đơn 2', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,1,3, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD003', GETDATE(), N'Ghi chú cho hóa đơn 3', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,1,1, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD004', '2023-3-15', N'Ghi chú cho hóa đơn 4', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,1,2, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD005', GETDATE(), N'Ghi chú cho hóa đơn 5', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,2,2, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD006', '2023-4-15', N'Ghi chú cho hóa đơn 1', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,4,1, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD007', '2023-4-15', N'Ghi chú cho hóa đơn 2', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,2,2, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD008', '2023-5-15', N'Ghi chú cho hóa đơn 3', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,1,3, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD009', '2023-6-15', N'Ghi chú cho hóa đơn 4', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,1,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0010', '2023-6-15', N'Ghi chú cho hóa đơn 5', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,3,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0011', '2023-6-15', N'Ghi chú cho hóa đơn 1', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,3,1, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD0012', '2023-7-15', N'Ghi chú cho hóa đơn 2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,1,2, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD0013', '2023-7-15', N'Ghi chú cho hóa đơn 3', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,2,3, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD0014', '2023-8-15', N'Ghi chú cho hóa đơn 4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,3,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0015', '2023-8-15', N'Ghi chú cho hóa đơn 5', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,2,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0016', '2023-9-15', N'Ghi chú cho hóa đơn 1', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,2,1, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD0017', '2023-10-15', N'Ghi chú cho hóa đơn 2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,1,2, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD0018', '2023-11-15', N'Ghi chú cho hóa đơn 3', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,1,3, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD0019', '2023-12-15', N'Ghi chú cho hóa đơn 4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,4,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0020', '2022-1-15', N'Ghi chú cho hóa đơn 5', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,4,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0021', '2022-2-15', N'Ghi chú cho hóa đơn 1', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1,4,1, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD0022', '2022-3-15', N'Ghi chú cho hóa đơn 2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,1,3, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD0023', '2021-6-15', N'Ghi chú cho hóa đơn 3', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,3,3, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD0024', '2022-5-15', N'Ghi chú cho hóa đơn 4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,4,3, 4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0025', '2022-9-15', N'Ghi chú cho hóa đơn 5', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,1,1, 4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0026', '2021-4-15', N'Ghi chú cho hóa đơn 1', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,2,2, 1, 1, 1, 1000000, 50000, 100000, 950000, N'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', 'Địa chỉ 1', 'Hồ Chí Minh', 'Quận 1', 'Phường 1'),
('HD0027', '2020-11-15', N'Ghi chú cho hóa đơn 2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,3,3, 2, 2, 2, 1500000, 60000, 200000, 1300000, N'Trần Thị B', '0987654321', 'tranthib@example.com', 'Địa chỉ 2', 'Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'),
('HD0028', '2021-3-15', N'Ghi chú cho hóa đơn 3', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4,1,3, 3, 1, 800000, 30000, 50000, 720000, N'Lê Văn C', '0123456789', 'levanc@example.com', 'Địa chỉ 3', 'Đà Nẵng', 'Quận Hải Châu', 'Phường Thạch Thang'),
('HD0029', '2020-11-15', N'Ghi chú cho hóa đơn 4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3,3,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh'),
('HD0030', '2019-11-15', N'Ghi chú cho hóa đơn 5', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2,2,4, 1, 2, 1200000, 40000, 80000, 1120000, N'Nguyễn Thị D', '0987654321', 'nguyenthid@example.com', 'Địa chỉ 4', 'Cần Thơ', 'Quận Ninh Kiều', 'Phường An Khánh')

    INSERT INTO gio_hang (ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, tai_khoan_id,tong_tien)
VALUES
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 2,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 3,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 4,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 5,0);




INSERT INTO hoa_don_chi_tiet (ghi_chu, so_luong, hoa_don_id, san_pham_chi_tiet_id)
VALUES
(N'Tốt', 2, 1, 1),
(N'Tốt', 3, 2, 3),
(N'Tốt', 4, 3, 5),
(N'Tốt', 2, 4, 7),
(N'Tốt', 3, 5, 9),
(N'Tốt', 4, 6, 11),
(N'Tốt', 2, 7, 13),
(N'Tốt', 3, 8, 15),
(N'Tốt', 4, 9, 17),
(N'Tốt', 2, 10, 19),
(N'Tốt', 3, 11, 21),
(N'Tốt', 2, 12, 23),
(N'Tốt', 3, 13, 25),
(N'Tốt', 4, 14, 27),
(N'Tốt', 2, 15, 29),
(N'Tốt', 3, 16, 31),
(N'Tốt', 2, 17, 33),
(N'Tốt', 3, 18, 35),
(N'Tốt', 4, 19, 37),
(N'Tốt', 2, 20, 39),
(N'Tốt', 3, 21, 2),
(N'Tốt', 2, 22, 4),
(N'Tốt', 3, 23, 6),
(N'Tốt', 4, 24, 8),
(N'Tốt', 2, 25, 10),
(N'Tốt', 3, 26, 12),
(N'Tốt', 2, 27, 14),
(N'Tốt', 3, 28, 16),
(N'Tốt', 4, 29, 18),
(N'Tốt', 2, 30, 20),
(N'Tốt', 2, 1, 22),
(N'Tốt', 3, 2, 24),
(N'Tốt', 4, 3, 26),
(N'Tốt', 2, 4, 28),
(N'Tốt', 3, 5, 30),
(N'Tốt', 4, 6, 32),
(N'Tốt', 2, 7, 34),
(N'Tốt', 3, 8, 36),
(N'Tốt', 4, 9, 38),
(N'Tốt', 2, 10, 40),
(N'Tốt', 3, 11, 3),
(N'Tốt', 2, 12, 2),
(N'Tốt', 3, 13, 9),
(N'Tốt', 4, 14, 12),
(N'Tốt', 2, 15, 44),
(N'Tốt', 3, 16, 23),
(N'Tốt', 2, 17, 12),
(N'Tốt', 3, 18, 19),
(N'Tốt', 4, 19, 12),
(N'Tốt', 2, 20, 44),
(N'Tốt', 3, 21, 23),
(N'Tốt', 2, 22, 12),
(N'Tốt', 3, 23, 19),
(N'Tốt', 4, 24, 12),
(N'Tốt', 2, 25, 44),
(N'Tốt', 3, 26, 23),
(N'Tốt', 2, 27, 12),
(N'Tốt', 3, 28, 19),
(N'Tốt', 4, 29, 12),
(N'Tốt', 2, 30, 44)






    INSERT INTO gio_hang_chi_tiet (gio_hang_id, san_pham_chi_tiet_id, so_luong)
VALUES
    (1, 2, 3),
    (3, 3, 4)


/*
INSERT INTO [dbo].[lich_su_hoa_don]
([ma_hoa_don],[san_pham_chi_tiet],[phuong_thuc_thanh_toan],[nguoi_nhan],[khuyen_mai],[ngay_tao_hoa_don],[tong_tien],[dia_chi_giao],[ghi_chu],[trang_thai_hoa_don])
VALUES
(1,1,1,3,1,'2023/10/5',0,N'Hà Nội',N'Không',1),
(2,2,2,4,2,'2023/10/5',0,N'Hà Nội',N'Không',1),
(3,2,2,5,2,'2023/10/5',0,N'Hà Nội',N'Không',1)
*/


select * from danh_muc
select * from hoa_don_khuyen_mai
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
select * from xuat_xu
select * from dia_chi

