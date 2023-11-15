package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class HoaDonImpl implements HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Override
    public HoaDon add(HoaDon sp) {
        sp.setNgayTao(Date.valueOf(LocalDate.now()));
        sp.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        hoaDonRepository.save(sp);
        return sp;
    }

    @Override
    public void delete(Long id) {

    }
    @Override
    public HoaDon update(Long id,HoaDon hoaDon) {
        HoaDon hoaDon1 = hoaDonRepository.findById(id).get();
        if(hoaDon1.getTrangThai()==0) {
            hoaDon1.setChoXacNhan(Date.valueOf(LocalDate.now()));
            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuChoXacNhan(hoaDon.getGhiChuChoXacNhan());
        }else
        if(hoaDon1.getTrangThai()==1) {
            hoaDon1.setChoGiao(Date.valueOf(LocalDate.now()));
            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuChoGiao(hoaDon.getGhiChuChoGiao());
        }else if(hoaDon1.getTrangThai()==2){
            hoaDon1.setDangGiao(Date.valueOf(LocalDate.now()));
            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuDangGiao(hoaDon.getGhiChuDangGiao());
        }else if(hoaDon1.getTrangThai()==3) {
            hoaDon1.setHoanThanh(Date.valueOf(LocalDate.now()));
            hoaDon1.setTrangThai(hoaDon1.getTrangThai() + 1);
            hoaDon1.setGhiChuHoanThanh(hoaDon.getGhiChuHoanThanh());
        }
        return hoaDonRepository.save(hoaDon1);
    }

    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepository.findAll();
    }

    @Override
    public HoaDon getOne(Long id) {
        return hoaDonRepository.findById(id).get();
    }

    @Override
    public void chuyenTrangThai(HoaDonService hoaDon) {

    }
}
