package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "thong_tin_nguoi_dung")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThongTinNguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "ten")
    private String ten;
    @Column(name = "cccd")
    private String CCCD;
    @Column(name = "gioi_tinh")
    private int gioiTinh;
    @Column(name = " ngay_sinh")
    private Date ngaySinh;
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id")
    private TaiKhoan taiKhoan;

    public ThongTinNguoiDung(String diaChi, String sdt, String ten, Date ngaySinh, Date ngayCapNhat, TaiKhoan taiKhoan) {

        this.diaChi = diaChi;
        this.sdt = sdt;
        this.ten = ten;
        this.ngaySinh = ngaySinh;
        this.ngayCapNhat = ngayCapNhat;
        this.taiKhoan = taiKhoan;
    }
}
