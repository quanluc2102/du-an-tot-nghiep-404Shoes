package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.HoaDon;

import java.util.List;

public interface HoaDonService {
    HoaDon add(HoaDon sp);
    void delete(Long id);
    HoaDon update(Long id, HoaDon hoaDon);
    List<HoaDon> getAll();
    HoaDon getOne(Long id);
    void chuyenTrangThai(HoaDonService hoaDon);
    HoaDon huyHoaDon(Long id, HoaDon hoaDon);
    long countHoaDons();
    void updateQuantityForCancel(Long id, Integer quantity);
}
