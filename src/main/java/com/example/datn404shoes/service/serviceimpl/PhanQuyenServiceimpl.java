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

    @Override
    public PhanQuyen add(PhanQuyen phanQuyen) {
        PhanQuyen quyen = new PhanQuyen();
        quyen.setTaiKhoan(phanQuyen.getTaiKhoan());
        quyen.setQuyen(phanQuyen.getQuyen());
        return phanQuyenRepository.save(phanQuyen);
    }

    @Override
    public void delete(Long id) {
         phanQuyenRepository.deleteById(id);
    }

    @Override
    public PhanQuyen getOne(Long id) {
        return phanQuyenRepository.findById(id).get();
    }

    @Override
    public PhanQuyen update(Long id, PhanQuyen phanQuyen) {
        PhanQuyen quyen = phanQuyenRepository.findById(id).orElse(null);
        quyen.setTaiKhoan(phanQuyen.getTaiKhoan());
        quyen.setQuyen(phanQuyen.getQuyen());
        return phanQuyenRepository.save(phanQuyen);
    }

//    @Override
//    public List<PhanQuyen> findPhanQuyenByQuyenId(Long id) {
//        return phanQuyenRepository.findPhanQuyenByQuyenId(id);
//    }
}
