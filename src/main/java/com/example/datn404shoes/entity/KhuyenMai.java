package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "khuyen_mai")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KhuyenMai {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "bat_dau")
    private Date batDau;

    @Column(name = "ket_thuc")
    private Date ketThuc;

    @Column(name = "giam_gia")
    private float giamGia;

    @Column(name = "kieu_khuyen_mai")
    private int kieuKhuyenMai;

    public KhuyenMai(String ten, String moTa, Date batDau, Date ketThuc, float giamGia, int kieuKhuyenMai) {
        this.ten = ten;
        this.moTa = moTa;
        this.batDau = batDau;
        this.ketThuc = ketThuc;
        this.giamGia = giamGia;
        this.kieuKhuyenMai = kieuKhuyenMai;
    }
}
