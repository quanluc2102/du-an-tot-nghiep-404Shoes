package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.TheoDoiHoaDonDTO;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("hoa_don_chi_tiet")
public class HoaDonChiTietController {
    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;


    @GetMapping("hien-thi/{idHD}")
    public ResponseEntity<?> hienthi(@PathVariable("idHD") Long idHD) {
        List<HoaDonChiTiet> listHDCT = hoaDonChiTietimpl.getAllByIdHD(idHD);
        return ResponseEntity.ok(listHDCT);
    }


    @PostMapping("hien-thiguest")
    public ResponseEntity<?> hienthitheodoihoadon(@RequestBody TheoDoiHoaDonDTO theoDoiHoaDonDTO) {
        String listHDCT = hoaDonChiTietimpl.findAllByHd_MaHoaDonandEmail(theoDoiHoaDonDTO.getMaHoaDon(), theoDoiHoaDonDTO.getSdt());
        return ResponseEntity.ok(listHDCT);
    }
}
