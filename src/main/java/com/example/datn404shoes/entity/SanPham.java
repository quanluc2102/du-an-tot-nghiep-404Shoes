package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "san_pham")
public class SanPham {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "ngay_tao")
    private Date ngayTao;
    @Column(name = "gia_nhap")
    private double giaNhap;
    @Column(name = "ten")
    private String ten;
    @Column(name = "gia_ban")
    private double giaBan;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "trang_thai")
    private int trangThai;
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;
    @Column(name = "mo_ta")
    private String moTa;

    public String laySoLuong(){
        if(soLuong>=1){
            return "Còn hàng";
        }else{
            return "Hết hàng";
        }
    }
    public String layTrangThai(){
        if(trangThai==1){
            return "Active";
        }else{
            return "Inactive";
        }
    }
    public SanPham(Date ngayTao, double giaNhap, String ten, double giaBan, int soLuong, int trangThai, Date ngayCapNhat, String moTa) {
        this.ngayTao = ngayTao;
        this.giaNhap = giaNhap;
        this.ten = ten;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
        this.trangThai = trangThai;
        this.ngayCapNhat = ngayCapNhat;
        this.moTa = moTa;
    }

    public SanPham(double giaNhap, String ten, double giaBan, int soLuong, int trangThai, String moTa) {
        this.giaNhap = giaNhap;
        this.ten = ten;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
        this.trangThai = trangThai;
        this.moTa = moTa;
    }
}
