package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.repository.XuatXuRepository;
import com.example.datn404shoes.service.XuatXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class XuatXuServiceimpl implements XuatXuService {
    @Autowired
    XuatXuRepository repository;

    @Override
    public XuatXu add(XuatXu xuatXu) {
        repository.save(xuatXu);
        return xuatXu;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public XuatXu update(Long id, XuatXu xuatXu) {
        XuatXu xuatXu1 = getOne(id);
        xuatXu1.setTen(xuatXu.getTen());
        xuatXu1.setTrangThai(xuatXu.getTrangThai());
        repository.save(xuatXu1);
        return xuatXu1;
    }

    @Override
    public List<XuatXu> getAll() {
        return repository.findAll();
    }

    @Override
    public XuatXu getOne(Long id) {
        return repository.findById(id).get();
    }
}
