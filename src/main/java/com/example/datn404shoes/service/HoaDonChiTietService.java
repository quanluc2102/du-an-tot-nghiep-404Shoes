package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.HoaDonChiTiet;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoaDonChiTietService {
    List<HoaDonChiTiet> getAllByIdHD  (Long idHD);
    String findAllByHd_MaHoaDonandEmail  (String maHoaDon,String email);

    HoaDonChiTiet addNewHDCT(HoaDonChiTiet hoaDonChiTiet);
}
