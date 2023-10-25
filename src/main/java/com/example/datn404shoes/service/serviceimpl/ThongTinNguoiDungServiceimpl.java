package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.ThongTinNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThongTinNguoiDungServiceimpl implements ThongTinNguoiDungService {
 @Autowired
 private ThongTinNguoiDungRespository respository;
    @Override
    public List<ThongTinNguoiDung> getAll() {
        return respository.findAll();
    }

    @Override
    public Page<ThongTinNguoiDung> getAllPhanTrang(Pageable pageable) {
        return respository.findAll(pageable);
    }

    @Override
    public ThongTinNguoiDung add(ThongTinNguoiDung thongTinNguoiDung) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public ThongTinNguoiDung getOne(Long id) {
        return null;
    }

    @Override
    public ThongTinNguoiDung update(Long id, ThongTinNguoiDung thongTinNguoiDung) {
        return null;
    }
}
