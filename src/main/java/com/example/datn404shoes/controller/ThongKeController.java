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
        return hoaDonChiTietRepository.thongKeDoanhThuSanPham(startDate, endDate);
    }

    @GetMapping("/doanh_thu_thang_custom")
    public List<Object[]> getDoanhThuThangCustom(Date startDate) {
        System.out.println("meo meo" + startDate);

        return hoaDonChiTietRepository.thongKeDoanhThuTheoThang(startDate);
    }

    @GetMapping("/doanh_thu_nam_custom")
    public List<Object[]> getDoanhThuNamCustom(Date startDate) {
        return hoaDonChiTietRepository.thongKeDoanhThuTheoNam(startDate);
    }

    @GetMapping("/doanh_thu_theo_thang_new")
    public List<Object[]> thongKeDoanhThuTheoThangNew(Date startDate) {
        return hoaDonChiTietRepository.thongKeDoanhThuTheoThangNew(startDate);
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


    //hoadon huy


    @GetMapping("/hoa_don_huy_ngay")
    public Long getHoaDonHuyNgay() {
        return thongKeRepository.countHoaDonHuyNgay();
    }

    @GetMapping("/hoa_don_huy_tuan")
    public Long getHoaDonHuyTuan() {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfWeek = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        Date startDate = Date.valueOf(startOfWeek);
        Date endDate = Date.valueOf(currentDate);
        return thongKeRepository.countHoaDonHuyTuan(startDate, endDate);
    }

    @GetMapping("/hoa_don_huy_thang")
    public Long getHoaDonHuyThang() {
        return thongKeRepository.countHoaDonHuyThang();
    }

    @GetMapping("/hoa_don_huy_quy")
    public Long getHoaDonHuyQuy() {
        return thongKeRepository.countHoaDonHuyQuy();
    }

    @GetMapping("/hoa_don_huy_nam")
    public Long getHoaDonHuyNam() {
        return thongKeRepository.countHoaDonHuyNam();
    }

    @GetMapping("/tong_so_san_pham")
    public Long countSanPhamChiTietTQ() {
        return thongKeRepository.countSanPhamChiTietTQ();
    }

    @GetMapping("/tong_so_hoa_don")
    public Long countHoaDonTQ() {
        return thongKeRepository.countHoaDonTQ();
    }

    @GetMapping("/tong_so_nguoi_dung")
    public Long countDistinctTaiKhoanIdTQ() {
        return thongKeRepository.countDistinctTaiKhoanIdTQ();
    }

    @GetMapping("/hoa_don_chua_hoan_thanh")
    public Long countHoaDonChuaHoanThanhTQ() {
        return thongKeRepository.countHoaDonChuaHoanThanhTQ();
    }

    @GetMapping("/top_san_pham_ban_chay")
    public List<Object[]> countTopSanPhamBanCHay() {
        return thongKeRepository.findTop10SanPhamBanChay();
    }

    @GetMapping("/hoa_don_chua_xu_ly")
    public List<Object[]> hoaDonChuaXuLy() {
        return thongKeRepository.hoaDonChuaXuLyhe();
    }

    @GetMapping("/toc_do_tang_truong")
    public List<Object[]> toc_do_tang_truong() {
        return thongKeRepository.tocDoTangTruongNam();
    }

    @GetMapping("/toc_do_tang_truong_ngay")
    public List<Object[]> toc_do_tang_truong_ngay() {
        return thongKeRepository.tocDoTangTruongNgay();
    }

    @GetMapping("/toc_do_tang_truong_thang")
    public List<Object[]> toc_do_tang_truong_thang() {
        return thongKeRepository.tocDoTangTruongThang();
    }

    @GetMapping("/toc_do_tang_truong_san_pham_nam")
    public List<Object[]> toc_do_tang_truong_san_pham_nam() {
        return thongKeRepository.tocDoTangTruongSanPhamTheoNam();
    }

    @GetMapping("/toc_do_tang_truong_san_pham_thang")
    public List<Object[]> toc_do_tang_truong_san_pham_thang() {
        return thongKeRepository.tocDoTangTruongSanPhamTheoThang();
    }

    @GetMapping("/toc_do_tang_truong_san_pham_ngay")
    public List<Object[]> toc_do_tang_truong_san_pham_ngay() {
        return thongKeRepository.tocDoTangTruongSanPhamTheoNgay();
    }
}
