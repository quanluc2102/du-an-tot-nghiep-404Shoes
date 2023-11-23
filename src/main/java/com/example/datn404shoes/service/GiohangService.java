package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.GioHang;
import com.example.datn404shoes.entity.GioHangChiTiet;

import java.util.List;

public interface GiohangService {

    void add(GioHang giohang);

    void delete(Long id);

    void update(GioHang gioHang);

    List<GioHangChiTiet> getAll(Long id);

    GioHang findById(Long id);
}
