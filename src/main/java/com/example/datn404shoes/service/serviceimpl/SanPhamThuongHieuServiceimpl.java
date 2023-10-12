package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamThuongHieu;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.repository.SanPhamThuongHieuRepository;
import com.example.datn404shoes.request.SanPhamThuongHieuRequest;
import com.example.datn404shoes.service.SanPhamThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamThuongHieuServiceimpl implements SanPhamThuongHieuService {
    @Autowired
    SanPhamThuongHieuRepository repo;

    @Override
    public SanPhamThuongHieu add(SanPhamThuongHieuRequest sanPhamThuongHieuRequest) {
        SanPhamThuongHieu sanPhamThuongHieu = new SanPhamThuongHieu();
        sanPhamThuongHieu.setThuongHieu(ThuongHieu.builder().id(sanPhamThuongHieuRequest.getThuongHieuId()).build());
        sanPhamThuongHieu.setSanPham(SanPham.builder().id(sanPhamThuongHieuRequest.getSanPhamId()).build());
        repo.save(sanPhamThuongHieu);
        return sanPhamThuongHieu;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public SanPhamThuongHieu detail(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public SanPhamThuongHieu update(Long id, SanPhamThuongHieuRequest sanPhamThuongHieuRequest) {
        SanPhamThuongHieu sanPhamThuongHieu1 = repo.findById(id).get();
        sanPhamThuongHieu1.setThuongHieu(ThuongHieu.builder().id(sanPhamThuongHieuRequest.getThuongHieuId()).build());
        sanPhamThuongHieu1.setSanPham(SanPham.builder().id(sanPhamThuongHieuRequest.getSanPhamId()).build());
        repo.save(sanPhamThuongHieu1);
        return sanPhamThuongHieu1;
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
