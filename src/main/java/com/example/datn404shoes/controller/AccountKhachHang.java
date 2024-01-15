package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.ChiTietHoaDonDTO;
import com.example.datn404shoes.DTO.HoaDonKhachDTO;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.repository.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3006")
@RequestMapping("khach_hang_page")
public class AccountKhachHang {
    @Autowired
    private HoaDonRepository hoaDonRepository;
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @GetMapping("all")
    public List<Object[]> all(Long id) {
        return hoaDonRepository.all(id);
    }

    @GetMapping("hoa_don_chua_xac_nhan")
    public List<Object[]> hoa_don_chua_xac_nhan(Long id) {
        return hoaDonRepository.hoaDonChuaXacNhan(id);
    }

    @GetMapping("hoa_don_xac_nhan")
    public List<Object[]> hoa_don_xac_nhan(Long id) {
        return hoaDonRepository.xacNhan(id);
    }

    @GetMapping("hoa_don_dong_goi")
    public List<Object[]> hoa_don_dong_goi(Long id) {
        return hoaDonRepository.dongGoi(id);
    }

    @GetMapping("hoa_don_dang_giao")
    public List<Object[]> hoa_don_dang_giao(Long id) {
        return hoaDonRepository.dangGiao(id);
    }

    @GetMapping("hoa_don_hoan_thanh")
    public List<Object[]> hoa_don_hoan_thanh(Long id) {
        return hoaDonRepository.hoanThanh(id);
    }

    @GetMapping("huy")
    public List<Object[]> huy(Long id) {
        return hoaDonRepository.huy(id);
    }


    @GetMapping("mua_tai_quay")
    public List<Object[]> thongKeDoanhThuSanPham(Long id) {
        return hoaDonRepository.muaTaiQuay(id);
    }

    @GetMapping("dat_hang_thanh_cong")
    public Object[] dat_hang_thanh_cong(Long id) {
        return hoaDonRepository.thanhToanThanhCong();
    }

}
