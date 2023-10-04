package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "gio_hang", schema = "dbo", catalog = "ShopShoe")
@Builder
public class GioHang {
    private long id;
    private Date ngayTao;
    private String ghiChu;
    private int trangThai;
    private Long taiKhoanId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "ngay_tao", nullable = false)
    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    @Basic
    @Column(name = "ghi_chu", nullable = false, length = 255)
    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    @Basic
    @Column(name = "trang_thai", nullable = false)
    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    @Basic
    @Column(name = "tai_khoan_id", nullable = true)
    public Long getTaiKhoanId() {
        return taiKhoanId;
    }

    public void setTaiKhoanId(Long taiKhoanId) {
        this.taiKhoanId = taiKhoanId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GioHang gioHang = (GioHang) o;
        return id == gioHang.id && trangThai == gioHang.trangThai && Objects.equals(ngayTao, gioHang.ngayTao) && Objects.equals(ghiChu, gioHang.ghiChu) && Objects.equals(taiKhoanId, gioHang.taiKhoanId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ngayTao, ghiChu, trangThai, taiKhoanId);
    }
}
