package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.entity.XuatXu;

import java.sql.Date;

 public interface SanPhamUserCustom {
     long getId() ;
     String getMaSanPham();
     String getAnhBia();
     Long getDanhMuc();
     String getTenDanhMuc();
     String getMoTa();
     String getTen() ;
     Long getThuongHieu();
     String getTenThuongHieu();
     Long getXuatXu();
     String getTenXuatXu();
    int getMin();
    int getMax();
    int getSoLuongDaBan();
}
