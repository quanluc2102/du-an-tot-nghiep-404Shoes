package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HoaDonImpl implements HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Override
    public HoaDon add(HoaDon hd) {
long count = hoaDonRepository.count()+1;
        hd.setKieuHoaDon(0);
        hd.setMaHoaDon("HD00" + count);
        hd.setTen(null);
        hd.setSdt(null);
        hd.setTrangThai(4);
        hd.setKieuHoaDon(0);
        hd.setEmail(null);
        hd.setDiaChiCuThe(null);
        hd.setTinhThanhPho(null);
        hd.setQuanHuyen(null);
        hd.setXaPhuongThiTran(null);
        hd.setNgayTao(Date.valueOf(LocalDate.now()));
        hd.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        return hoaDonRepository.save(hd);
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

    @Override
    public HoaDon huyHoaDon(Long id) {
        HoaDon hoaDon1 = hoaDonRepository.findById(id).get();
        hoaDon1.setTrangThai(5);
        return hoaDonRepository.save(hoaDon1);
    }

    @Override
    public long countHoaDons() {
        return hoaDonRepository.count();
    }
}
