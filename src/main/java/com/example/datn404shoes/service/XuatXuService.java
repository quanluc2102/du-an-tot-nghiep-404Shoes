package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.XuatXu;

import java.util.List;

public interface XuatXuService {
    XuatXu add(XuatXu xuatXu);

    void delete(Long id);

    XuatXu update(Long id, XuatXu xuatXu);

    List<XuatXu> getAll();

    XuatXu getOne(Long id);
}
