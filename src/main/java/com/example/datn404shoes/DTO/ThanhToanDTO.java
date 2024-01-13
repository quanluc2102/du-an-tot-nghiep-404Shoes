package com.example.datn404shoes.DTO;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.request.SPCTBanHangRequest;
import lombok.Data;

import java.util.List;

@Data
public class ThanhToanDTO {

   private String ten;

   private String sdt;

   private Long taiKhoanKhachHang;

   private Float tongTien;

   private Float tienGiam;

   private Float tongTienSauGiam;

   private Float phiShip;

   private Integer kieuHoaDon;

   private String tinhThanhPho;

   private String quanHuyen;

   private String xaPhuongThiTran;

   private String diaChiCuThe;

   private Long khuyenMai;

   private Long thanhToan;

   private String ghiChu;

   private Long taiKhoan;
}
