package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Optional;

@Service
public interface KhuyenMaiService {
    ArrayList<KhuyenMai>getAll();
    void add(KhuyenMai khuyenMai);

    void delete(Long id);

    void update(Long id,KhuyenMai km);

    Optional<KhuyenMai>detail(Long id);
    KhuyenMai findOne(Long id);
    void imPortExcel(MultipartFile file);
}
