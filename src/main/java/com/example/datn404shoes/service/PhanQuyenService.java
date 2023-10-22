package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.entity.Quyen;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PhanQuyenService {


    List<PhanQuyen> getAll();

    Page<PhanQuyen> getAllPhanTrang(Pageable pageable);
}
