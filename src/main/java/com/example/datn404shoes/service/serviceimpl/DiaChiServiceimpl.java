package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.repository.DiaChiResponsitory;
import com.example.datn404shoes.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DiaChiServiceimpl implements DiaChiService {

    @Autowired
    private DiaChiResponsitory responsitory;
    @Override
    public void add(DiaChi diaChi) {
        diaChi.setNgayCapNhat(Date.valueOf(LocalDate.now()));
            responsitory.saveAndFlush(diaChi);
    }

    @Override
    public List<DiaChi> getAll() {
        return responsitory.findAll();
    }

    @Override
    public void update(DiaChi diaChi) {
        Optional<DiaChi> existingDiaChiOptional =responsitory.findById(diaChi.getId());

        if (existingDiaChiOptional.isPresent()) {
            DiaChi existingDiaChi = existingDiaChiOptional.get();
            existingDiaChi.setTen(diaChi.getTen());
            existingDiaChi.setSdt(diaChi.getSdt());
            existingDiaChi.setTrangThai(diaChi.getTrangThai());
            existingDiaChi.setDiaChiCuThe(diaChi.getDiaChiCuThe());
            existingDiaChi.setTinhThanhPho(diaChi.getTinhThanhPho());
            existingDiaChi.setQuanHuyen(diaChi.getQuanHuyen());
            existingDiaChi.setXaPhuongThiTran(diaChi.getXaPhuongThiTran());

            // Assuming diaChiRepository.save() persists the changes
            responsitory.save(existingDiaChi);
        }
    }
    @Override
    public void updateOrAdd(DiaChi diaChi) {
        responsitory.save(diaChi);
    }

    public Optional<DiaChi> findByThongTinNguoiDungId(long id) {
        return responsitory.findById(id);
    }
}
