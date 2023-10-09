package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.ThuongHieu;

import java.util.List;

public interface ThuongHieuService {
    ThuongHieu add(ThuongHieu th);
    void delete(Long id);
    ThuongHieu update(Long id,ThuongHieu th);
    List<ThuongHieu> getAll();
    ThuongHieu getOne(Long id);
}
