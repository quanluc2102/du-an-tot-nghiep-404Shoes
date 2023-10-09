package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamDanhMuc;
import com.example.datn404shoes.repository.SanPhamDoanhMucRespository;
import com.example.datn404shoes.request.SanPhamDanhMucRequest;
import com.example.datn404shoes.service.SanPhamDanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SanPhamDanhMucServiceimpl implements SanPhamDanhMucService {
    @Autowired
    SanPhamDoanhMucRespository repo;

    @Override
    public SanPhamDanhMuc add(SanPhamDanhMucRequest sanPhamDanhMucRequest) {
        SanPhamDanhMuc sanPhamDanhMuc = new SanPhamDanhMuc();
        sanPhamDanhMuc.setDanhMuc(DanhMuc.builder().id(sanPhamDanhMucRequest.getDanhMucId()).build());
        sanPhamDanhMuc.setSanPham(SanPham.builder().id(sanPhamDanhMucRequest.getSanPhamId()).build());
        repo.save(sanPhamDanhMuc);
        return sanPhamDanhMuc;
    }

    @Override
    public SanPhamDanhMuc update(Long idud, SanPhamDanhMucRequest sanPhamDanhMucRequest) {
        SanPhamDanhMuc sanPhamDanhMuc = repo.findById(idud).get();
        sanPhamDanhMuc.setDanhMuc(DanhMuc.builder().id(sanPhamDanhMucRequest.getDanhMucId()).build());
        sanPhamDanhMuc.setSanPham(SanPham.builder().id(sanPhamDanhMucRequest.getSanPhamId()).build());
        repo.save(sanPhamDanhMuc);
        return sanPhamDanhMuc;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public SanPhamDanhMuc detail(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<SanPhamDanhMuc> getAll() {
        return repo.findAll();
    }

    @Override
    public SanPhamDanhMuc getOne(Long id) {
        return repo.findById(id).get();
    }
}
