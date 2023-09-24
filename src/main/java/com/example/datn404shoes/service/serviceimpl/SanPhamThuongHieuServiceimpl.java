package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.SanPhamThuongHieu;
import com.example.datn404shoes.repository.SanPhamThuongHieuRepository;
import com.example.datn404shoes.service.SanPhamThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamThuongHieuServiceimpl implements SanPhamThuongHieuService {
    @Autowired
    SanPhamThuongHieuRepository repo;
    @Override
    public void add(SanPhamThuongHieu sanPhamThuongHieu) {
        repo.saveAndFlush(sanPhamThuongHieu);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public void detail(Long id, SanPhamThuongHieu sanPhamThuongHieu) {
        SanPhamThuongHieu a = getOne(id);
        a.setThuongHieuId(sanPhamThuongHieu.getThuongHieuId());
        a.setSanPhamId(sanPhamThuongHieu.getSanPhamId());
        repo.flush();
    }

    @Override
    public List<SanPhamThuongHieu> getAll() {
        return repo.findAll();
    }

    @Override
    public SanPhamThuongHieu getOne(Long id) {
        return repo.findById(id).get();
    }
}
