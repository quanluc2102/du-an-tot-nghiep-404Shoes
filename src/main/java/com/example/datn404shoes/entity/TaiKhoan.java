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



    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "password")
    private String password;

    @Column(name = "anh")
    private String anh;


    @Column(name = "trang_thai")
    private boolean trangThai;


    @ManyToOne
    @JoinColumn(name = "thong_tin_nguoi_dung_id")
    private ThongTinNguoiDung thongTinNguoiDung;

//    public TaiKhoan(long id, String username, String email, Date ngayTao, Date ngayCapNhat, String password, String anh, boolean trangThai, ThongTinNguoiDung thongTinNguoiDung) {
//        this.id = id;
//        this.username = username;
//        this.email = email;
//        this.ngayTao = ngayTao;
//        this.ngayCapNhat = ngayCapNhat;
//        this.password = password;
//        this.anh = anh;
//        this.trangThai = trangThai;
//        this.thongTinNguoiDung = thongTinNguoiDung;
//    }
}
