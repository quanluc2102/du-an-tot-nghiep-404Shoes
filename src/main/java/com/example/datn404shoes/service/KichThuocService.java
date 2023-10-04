package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.KichThuoc;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public interface KichThuocService {
    KichThuoc add(KichThuoc kichThuoc);

    void delete(Long id);

    KichThuoc update(KichThuoc kichThuoc, Long idKichThuoc);

    KichThuoc detail(Long id);

    KichThuoc findOne(Long id);

    List<KichThuoc> findAll();

    void imPortExcel(MultipartFile file);
}
