package com.example.datn404shoes.service;

import com.example.datn404shoes.DTO.LocDTO;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.request.SanPhamUserCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SanPhamService {
    SanPham add(SanPham sp);

    void delete(Long id);

    SanPham update(Long id, SanPham sp);

    Page<SanPham> getAllPhanTrang(Pageable pageable);

    Page<SanPham> phanTrangNew(int page);

    Page<SanPhamUserCustom> phanTrangUser(int page);
    List<SanPhamUserCustom> phanTrangUserFiltered(LocDTO filters);
    List<SanPhamUserCustom> searchSanPham(String search);

    List<SanPham> getAll();

    SanPham getOne(Long id);

    void chuyenSoLuong(SanPham sp);

    void importExcel(MultipartFile file);
}
