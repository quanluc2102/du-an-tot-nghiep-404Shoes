package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "tai_khoan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaiKhoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "ten")
    private String ten;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "password")
    private String password;

    @Column(name = "anh")
    private String anh;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "trang_thai")
    private boolean trangThai;

    public TaiKhoan(String username, String email, String ten, String diaChi, Date ngayTao, Date ngayCapNhat, String password, String anh, String sdt, boolean trangThai) {
        this.username = username;
        this.email = email;
        this.ten = ten;
        this.diaChi = diaChi;
        this.ngayTao = ngayTao;
        this.ngayCapNhat = ngayCapNhat;
        this.password = password;
        this.anh = anh;
        this.sdt = sdt;
        this.trangThai = trangThai;

    }

}
