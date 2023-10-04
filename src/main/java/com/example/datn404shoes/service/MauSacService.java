package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.MauSac;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MauSacService {
    MauSac add(MauSac mauSac);

    void delete(Long id);

    MauSac update(Long idud, MauSac mauSac);

    MauSac detail(Long id);

    MauSac findOne(Long id);

    List<MauSac> findAll();

    void imPortExcel(MultipartFile file);
}
