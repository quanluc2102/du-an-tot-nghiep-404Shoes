package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.ThanhToanRepository;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("hoa_don")
public class HoaDonController {
    @Autowired
    HoaDonImpl hoaDonImpl;
    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @Autowired
    SanPhamChiTietServiceimpl sanPhamChiTietServiceimpl;
    @Autowired
    ThanhToanRepository thanhToanRepository;
    @Autowired
    TaiKhoanRepository taiKhoanRepository;
    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    PhanQuyenRepository phanQuyenRepository;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(Model model) {
        return ResponseEntity.ok(hoaDonImpl.getAll());
    }

    @GetMapping("hien-thi-taiKhoanKH/{id}")
    public ResponseEntity<?> hienThiKH(Model model, @PathVariable("id") Long id) {
        ;
        return ResponseEntity.ok(phanQuyenRepository.findPhanQuyenByQuyenId(id));
    }

    @GetMapping("hien-SPCT")
    public ResponseEntity<?> hienThiSPChiTiet(Model model, @PathVariable("id") Long id) {
        ;
        return ResponseEntity.ok(phanQuyenRepository.findPhanQuyenByQuyenId(id));
    }

    //    @PostMapping("create")
//    public  ResponseEntity<?> create(Model model,@RequestBody HoaDon hoaDon){
//
//        return ResponseEntity.ok(hoaDonImpl.add(hoaDon));
//    }
    @PostMapping("/add")
    public ResponseEntity<?> addNew(Model model,
                                    @RequestBody HoaDon hoaDon,
                                    @RequestBody List<SanPhamChiTiet> sanPhamChiTiet) {
        Date ngayTao = Date.valueOf(LocalDate.now());
        hoaDon.setNgayTao(ngayTao);
        for (var lstItem : sanPhamChiTiet) {
            SanPhamChiTiet sanPhamChiTiet1 = sanPhamChiTietServiceimpl.getOne(lstItem.getId());
            sanPhamChiTiet1.setSoLuong(sanPhamChiTiet1.getSoLuong() - lstItem.getSoLuong());
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet1);
            hoaDonChiTiet.setSoLuong(lstItem.getSoLuong());
            hoaDonChiTiet.setHd(hoaDon);
            hoaDonChiTiet.setGhiChu(hoaDon.getGhiChu());
            SanPhamChiTietRequest sanPhamChiTietRequest = new SanPhamChiTietRequest() ;
            sanPhamChiTietRequest.setSoLuong(sanPhamChiTiet1.getSoLuong());
            hoaDonChiTietimpl.addNewHDCT(hoaDonChiTiet);
            sanPhamChiTietServiceimpl.update(sanPhamChiTiet1.getId(),sanPhamChiTietRequest);
        }
        return ResponseEntity.ok(hoaDonImpl.add(hoaDon));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(Model model, @PathVariable("id") Long id) {

        return ResponseEntity.ok(hoaDonImpl.getOne(id));
    }

    //    @PostMapping("update/{id}")
//    public String update(Model model,
//                         @PathVariable("id") Long id,
//                         @RequestParam("ghiChu") String ghiChu,
//                         @RequestParam("thanhToan") ThanhToan thanhToan,
//                         @RequestParam("taiKhoan") TaiKhoan taiKhoan,
//                         @RequestParam("trangThai") int trangThai
//
//    ) {
//        HoaDon hoaDon = hoaDonImpl.getOne(id);
//        hoaDon.setGhiChu(ghiChu);
//        hoaDon.setTrangThai(trangThai);
//        hoaDon.setTaiKhoan(taiKhoan);
//        hoaDon.setThanhToan(thanhToan);
//        hoaDonImpl.update(hoaDon);
//        return "redirect:/hoa_don/hien-thi";
//    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody HoaDon hoaDon) {

        return ResponseEntity.ok(hoaDonImpl.update(id, hoaDon));
    }
}
