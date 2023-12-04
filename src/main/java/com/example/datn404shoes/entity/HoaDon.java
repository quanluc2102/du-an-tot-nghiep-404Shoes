package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hoa_don")
@Builder
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_hoa_don")
    private String maHoaDon;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "cho_xac_nhan")
    private Date choXacNhan;

    @Column(name = "ghi_chu_cho_xac_nhan")
    private String ghiChuChoXacNhan;

    @Column(name = "cho_giao")
    private Date choGiao;

    @Column(name = "ghi_chu_cho_giao")
    private String ghiChuChoGiao;

    @Column(name = "dang_giao")
    private Date dangGiao;

    @Column(name = "ghi_chu_dang_giao")
    private String ghiChuDangGiao;

    @Column(name = "hoan_thanh")
    private Date hoanThanh;

    @Column(name = "ghi_chu_hoan_thanh")
    private String ghiChuHoanThanh;

    @Column(name = "huy")
    private Date huy;

    @Column(name = "ghi_chu_huy")
    private String ghiChuHuy;

    @Column(name = "trang_thai")
    private int trangThai;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_nhan_vien_id", referencedColumnName = "id", nullable = true)
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_khach_hang_id", referencedColumnName = "id", nullable = true)
    private TaiKhoan taiKhoanKhachHang;

    @ManyToOne
    @JoinColumn(name = "khuyen_mai", referencedColumnName = "id", nullable = true)
    private KhuyenMai khuyenMai;

    @ManyToOne
    @JoinColumn(name = "thanh_toan_id", referencedColumnName = "id", nullable = true)
    private ThanhToan thanhToan;

    @Column(name = "kieu_hoa_don")
    private Integer kieuHoaDon;

    @Column(name = "tong_tien")
    private Float tongTien;

    @Column(name = "phi_ship")
    private Float phiShip;

    @Column(name = "tien_giam")
    private Float tienGiam;

    @Column(name = "tong_tien_sau_giam")
    private Float tongTienSauGiam;

    @Column(name = "ten")
    private String ten;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Column(name = "xa_phuong_thi_tran")
    private String xaPhuongThiTran;

}
