package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.PhanQuyen;

import java.util.List;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.entity.SanPhamChiTiet;

public interface BanHangOfflineService {

    List<KhuyenMai> danhsachKM();

    KhuyenMai getOneByMa(String ma);

    List<PhanQuyen> getKH(Long id);

    List<HoaDon> layDanhSachHoaDonCho();

    List<HoaDonChiTiet> layDanhSachHDCT(Long id);

    List<SanPhamChiTiet> layDanhSachSPCT(Long id);

    Boolean deleteHoaDonChiTiet(Long id);

    Boolean deleteHoaDon(Long id);

    void deleteHDCT(Long id);
}
