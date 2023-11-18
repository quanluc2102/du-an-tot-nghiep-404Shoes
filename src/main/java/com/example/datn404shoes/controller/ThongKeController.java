package com.example.datn404shoes.controller;

import com.example.datn404shoes.custom.ThongKeCustom;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.ThongKeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("thong_ke")
public class ThongKeController {


    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    private ThongKeRepository thongKeRepository;

    @GetMapping("thong_ke_theo_doanh_thu_san_pham")
    public List<Object[]> thongKeDoanhThuSanPham(Date startDate, Date endDate) {
        return hoaDonChiTietRepository.thongKeDoanhThu(startDate, endDate);
    }

    @GetMapping("/doanh_thu_ngay")
    public Float getDoanhThuNgay() {
        return thongKeRepository.findDoanhThuNgay();
    }

    @GetMapping("/doanh_thu_tuan")
    public Float getDoanhThuTuan() {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfWeek = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        return thongKeRepository.findDoanhThuTuan(startOfWeek, currentDate);
    }

    @GetMapping("/doanh_thu_thang")
    public Float getDoanhThuThang() {
        return thongKeRepository.findDoanhThuThang();
    }

    @GetMapping("/doanh_thu_quy")
    public Float getDoanhThuQuy() {
        return thongKeRepository.findDoanhThuQuy();
    }

    @GetMapping("/doanh_thu_nam")
    public Float getDoanhThuNam() {
        return thongKeRepository.findDoanhThuNam();
    }

    @GetMapping("/hoa_don_ngay")
    public Long getHoaDonNgay() {
        return thongKeRepository.countHoaDonNgay();
    }

    @GetMapping("/hoa_don_tuan")
    public Long getHoaDonTuan() {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfWeek = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        Date startDate = Date.valueOf(startOfWeek);
        Date endDate = Date.valueOf(currentDate);
        return thongKeRepository.countHoaDonTuan(startDate, endDate);
    }

    @GetMapping("/hoa_don_thang")
    public Long getHoaDonThang() {
        return thongKeRepository.countHoaDonThang();
    }

    @GetMapping("/hoa_don_quy")
    public Long getHoaDonQuy() {
        return thongKeRepository.countHoaDonQuy();
    }

    @GetMapping("/hoa_don_nam")
    public Long getHoaDonNam() {
        return thongKeRepository.countHoaDonNam();
    }

}
