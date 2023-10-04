package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.request.KichThuocMauSacReQuest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface KichThuocMauSacService {

    KichThuocMauSac add(KichThuocMauSac kichThuocMauSac);

    void delete(Long id);

    KichThuocMauSac update(Long idud,KichThuocMauSacReQuest kichThuocMauSacReQuest);

    KichThuocMauSac detail(Long id);

    KichThuocMauSac findOne(Long id);

    List<KichThuocMauSac> findAll();

    void imPortExcel(MultipartFile file);

}
