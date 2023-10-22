package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.service.PhanQuyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhanQuyenServiceimpl implements PhanQuyenService {
    @Autowired
    PhanQuyenRepository phanQuyenRepository;

    @Override
    public List<PhanQuyen> getAll() {
        return phanQuyenRepository.findAll();
    }

    @Override
    public Page<PhanQuyen> getAllPhanTrang(Pageable pageable) {
        return phanQuyenRepository.findAll(pageable);
    }
}
