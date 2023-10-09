package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamXuatXu;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.repository.SanPhamXuatXuRepository;
import com.example.datn404shoes.repository.SanPhamXuatXuRepository;
import com.example.datn404shoes.request.SanPhamXuatXuRequest;
import com.example.datn404shoes.service.SanPhamXuatXuService;
import com.example.datn404shoes.service.SanPhamXuatXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamXuatXuServiceimpl implements SanPhamXuatXuService {
    @Autowired
    SanPhamXuatXuRepository repo;

    @Override
    public SanPhamXuatXu add(SanPhamXuatXuRequest sanphamXuatXuRequest) {
        SanPhamXuatXu sanphamXuatXu = new SanPhamXuatXu();
        sanphamXuatXu.setXuatXuId(XuatXu.builder().id(sanphamXuatXuRequest.getXuatXuId()).build());
        sanphamXuatXu.setSanPhamId(SanPham.builder().id(sanphamXuatXuRequest.getSanPhamId()).build());
        return sanphamXuatXu;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public SanPhamXuatXu detail(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public SanPhamXuatXu update(Long id, SanPhamXuatXuRequest sanphamXuatXuRequest) {
        SanPhamXuatXu sanphamXuatXu1 = repo.findById(id).get();
        sanphamXuatXu1.setXuatXuId(XuatXu.builder().id(sanphamXuatXuRequest.getXuatXuId()).build());
        sanphamXuatXu1.setSanPhamId(SanPham.builder().id(sanphamXuatXuRequest.getSanPhamId()).build());
        return sanphamXuatXu1;
    }

    @Override
    public List<SanPhamXuatXu> getAll() {
        return repo.findAll();
    }

    @Override
    public SanPhamXuatXu getOne(Long id) {
        return repo.findById(id).get();
    }
}
