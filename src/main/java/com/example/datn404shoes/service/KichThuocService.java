package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.KichThuoc;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface KichThuocService {
    void add(KichThuoc kichThuoc);

    void delete(Long id);

    void update(KichThuoc kichThuoc);

    KichThuoc detail(Long id);

    KichThuoc findOne(Long id);

    List<KichThuoc> findAll();

    void imPortExcel(MultipartFile file);
}
