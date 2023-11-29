package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.entity.XuatXu;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamUserRequest {
    private long id;
    private String ma;
    private Date ngayTao;
    private String ten;
    private int trangThai;
    private Date ngayCapNhat;
    private String moTa;
    private String anh;
    private ThuongHieu thuongHieu;
    private XuatXu xuatXu;
    private DanhMuc danhMuc;
    private int min;
    private int max;
}
