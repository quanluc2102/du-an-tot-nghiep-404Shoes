package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PhanQuyenService {


    List<PhanQuyen> getAll();

    Page<PhanQuyen> getAllPhanTrang(Pageable pageable);
    PhanQuyen add(PhanQuyen phanQuyen);

    void delete(Long id);
    PhanQuyen getOne(Long id);
    PhanQuyen update(Long id, PhanQuyen phanQuyen);
//    List<PhanQuyen> findPhanQuyenByQuyenId(Long id);
}
