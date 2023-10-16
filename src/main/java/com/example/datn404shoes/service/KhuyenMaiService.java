package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface KhuyenMaiService {
    List<KhuyenMai> getAll();
    KhuyenMai add(KhuyenMai khuyenMai);

    void delete(Long id);

    KhuyenMai update(Long id,KhuyenMai km);

    Optional<KhuyenMai>detail(Long id);
    KhuyenMai findOne(Long id);
    void imPortExcel(MultipartFile file);
}
