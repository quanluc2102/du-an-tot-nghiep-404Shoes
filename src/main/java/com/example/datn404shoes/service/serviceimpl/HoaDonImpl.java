package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.BanHangOfflineRepository;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class HoaDonImpl implements HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Autowired
    SanPhamChiTietRepository SPCTRepository;

    @Autowired
    HoaDonChiTietRepository HDCTRepository;

    @Autowired
    BanHangOfflineRepository banHangOfflineRepository;

    @Override
    public HoaDon add(HoaDon hd) {
        Long count = banHangOfflineRepository.layIdHoaDon() + 1;
        hd.setKieuHoaDon(0);
        hd.setMaHoaDon("HD00" + count);
        hd.setTen(null);
        hd.setSdt(null);
        hd.setTrangThai(0);
        hd.setKieuHoaDon(2);
        hd.setTongTien(Float.valueOf(0));
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
        hoaDonRepository.deleteById(id);
    }

    @Override
    public HoaDon update(Long id,HoaDon hoaDon) {

        HoaDon hoaDon1 = hoaDonRepository.findById(id).get();
        if(hoaDon1.getTrangThai()==0 && hoaDon1.getKieuHoaDon()==1) {
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();

// Combine date and time
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
            Timestamp timeChoXacNhan = Timestamp.valueOf(currentDateTime);
            hoaDon1.setChoXacNhan(timeChoXacNhan);

            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuChoXacNhan(hoaDon.getGhiChuChoXacNhan());
            hoaDon1.setPhiShip(hoaDon.getPhiShip());
            hoaDon1.setTaiKhoan(TaiKhoan.builder().id(hoaDon.getTaiKhoan().getId()).build());
            List<HoaDonChiTiet> hoaDonChiTietList = HDCTRepository.findAllByHd_Id(hoaDon1.getId()) ;
            for(HoaDonChiTiet a :hoaDonChiTietList){
                a.getSanPhamChiTiet().setSoLuong(a.getSanPhamChiTiet().getSoLuong()-a.getSoLuong());
                SPCTRepository.save(a.getSanPhamChiTiet());
            }
        }else if(hoaDon1.getTrangThai()==0) {
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();

// Combine date and time
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
            Timestamp timeChoXacNhan = Timestamp.valueOf(currentDateTime);
            hoaDon1.setChoXacNhan(timeChoXacNhan);

            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuChoXacNhan(hoaDon.getGhiChuChoXacNhan());
            hoaDon1.setPhiShip(hoaDon.getPhiShip());
            hoaDon1.setTaiKhoan(TaiKhoan.builder().id(hoaDon.getTaiKhoan().getId()).build());

        }else if(hoaDon1.getTrangThai()==1) {
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();

// Combine date and time
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
            Timestamp timeChoGiao = Timestamp.valueOf(currentDateTime);
            hoaDon1.setChoGiao(timeChoGiao);
            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuChoGiao(hoaDon.getGhiChuChoGiao());
        }else if(hoaDon1.getTrangThai()==2){
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();

// Combine date and time
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
            Timestamp timeDangGiao= Timestamp.valueOf(currentDateTime);
            hoaDon1.setDangGiao(timeDangGiao);
            hoaDon1.setTrangThai(hoaDon1.getTrangThai()+1);
            hoaDon1.setGhiChuDangGiao(hoaDon.getGhiChuDangGiao());
        }else if(hoaDon1.getTrangThai()==3) {
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();

// Combine date and time
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
            Timestamp timeHoanThanh= Timestamp.valueOf(currentDateTime);
            hoaDon1.setHoanThanh(timeHoanThanh);
            hoaDon1.setTrangThai(hoaDon1.getTrangThai() + 1);
            hoaDon1.setGhiChuHoanThanh(hoaDon.getGhiChuHoanThanh());
        }
        return hoaDonRepository.save(hoaDon1);
    }

    @Override
    public HoaDon updateDC(Long id, HoaDon hoaDon) {
        HoaDon hoaDon1 = hoaDonRepository.findById(id).get();
            hoaDon1.setDiaChiCuThe(hoaDon.getDiaChiCuThe());
            hoaDon1.setTinhThanhPho(hoaDon.getTinhThanhPho());
            hoaDon1.setQuanHuyen(hoaDon.getQuanHuyen());
            hoaDon1.setXaPhuongThiTran(hoaDon.getXaPhuongThiTran());
        System.out.printf(hoaDon.getDiaChiCuThe());
        return hoaDonRepository.save(hoaDon1);
    }

    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepository.findAllByDescByNgayTao();
    }

    @Override
    public HoaDon getOne(Long id) {
        return hoaDonRepository.findById(id).get();
    }

    @Override
    public void chuyenTrangThai(HoaDonService hoaDon) {

    }

    @Override
    public HoaDon huyHoaDon(Long id, HoaDon hoaDon) {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

// Combine date and time
        LocalDateTime currentDateTime = LocalDateTime.of(currentDate, currentTime);

// Convert LocalDateTime to Timestamp
        Timestamp timeHuy= Timestamp.valueOf(currentDateTime);
        HoaDon hoaDon1 = hoaDonRepository.findById(id).get();
        hoaDon1.setTrangThai(5);
        hoaDon1.setHuy(timeHuy);
        hoaDon1.setGhiChuHuy(hoaDon.getGhiChuHuy());
        List<HoaDonChiTiet> hoaDonChiTiet = HDCTRepository.findAllByHd_Id(id);
        hoaDonChiTiet.forEach(hoaDonChiTiets -> updateQuantityForCancel(hoaDonChiTiets.getSanPhamChiTiet().getId(),hoaDonChiTiets.getSoLuong()));
        return hoaDonRepository.save(hoaDon1);
    }

    @Override
    public long countHoaDons() {
        return hoaDonRepository.count();
    }

    @Override
    public void updateQuantityForCancel(Long id, Integer quantity) {
        SanPhamChiTiet product = SPCTRepository.findById(id).get();
        product.setSoLuong(product.getSoLuong()+quantity);
    }
}
