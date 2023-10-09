package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.repository.ThuongHieuRepository;
import com.example.datn404shoes.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ThuongHieuServiceimpl implements ThuongHieuService {
    @Autowired
    ThuongHieuRepository repository;

    @Override
    public ThuongHieu add(ThuongHieu th) {
        repository.save(th);
        return th;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ThuongHieu update(Long id, ThuongHieu th) {
        ThuongHieu a = getOne(id);
        a.setTen(th.getTen());
        a.setTrangThai(th.getTrangThai());
        repository.save(a);
        return a;
    }

    @Override
    public List<ThuongHieu> getAll() {
        return repository.findAll();
    }

    @Override
    public ThuongHieu getOne(Long id) {
        return repository.findById(id).get();
    }
}
