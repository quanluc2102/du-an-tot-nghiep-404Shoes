package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.SanPhamKhuyenMai;
import com.example.datn404shoes.repository.SanPhamKhuyenMaiRepository;
import com.example.datn404shoes.service.SanPhamKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamKhuyenMaiServiceImpl implements SanPhamKhuyenMaiService {
    @Autowired
    private SanPhamKhuyenMaiRepository sanPhamKhuyenMaiRepository;
    @Override
    public List<SanPhamKhuyenMai> getAll() {
        return sanPhamKhuyenMaiRepository.findAll();
    }

    @Override
    public void add(SanPhamKhuyenMai spkm) {
    sanPhamKhuyenMaiRepository.save(spkm);
    }

    @Override
    public void delete(Long id) {
    sanPhamKhuyenMaiRepository.deleteById(id);
    }


    @Override
    public Optional<SanPhamKhuyenMai> detail(Long id) {
        return sanPhamKhuyenMaiRepository.findById(id);
    }
}
