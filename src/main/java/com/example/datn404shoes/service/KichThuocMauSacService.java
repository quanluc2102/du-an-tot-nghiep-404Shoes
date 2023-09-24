package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KichThuocMauSac;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface KichThuocMauSacService {

    void add(KichThuocMauSac kichThuocMauSac);

    void delete(Long id);

    void update(KichThuocMauSac kichThuocMauSac);

    KichThuocMauSac detail(Long id);

    KichThuocMauSac findOne(Long id);

    List<KichThuocMauSac> findAll();

    void imPortExcel(MultipartFile file);

}
