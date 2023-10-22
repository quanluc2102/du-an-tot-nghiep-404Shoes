package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThanhToan;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.ThanhToanRepository;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("hoa_don")
public class HoaDonController {
    @Autowired
    HoaDonImpl hoaDonImpl;
@Autowired
    ThanhToanRepository thanhToanRepository;
@Autowired
    TaiKhoanRepository taiKhoanRepository;
    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(Model model){
        return ResponseEntity.ok(hoaDonImpl.getAll());
    }
//    @PostMapping("create")
//    public  ResponseEntity<?> create(Model model,@RequestBody HoaDon hoaDon){
//
//        return ResponseEntity.ok(hoaDonImpl.add(hoaDon));
//    }
//    @PostMapping("add")
//    public  String addNew(Model model,
////                          @RequestParam("ngayTao")Date ngayTao,
//                          @RequestParam("ghiChu") String ghiChu,
////                          @RequestParam("ngayCapNhat") Date ngayCapNhat,
//                          @RequestParam("trangThai") int trangThai,
//                          @RequestParam("taiKhoan")TaiKhoan taiKhoan,
//                          @RequestParam("thanhToan")ThanhToan thanhToan){
//
//        HoaDon hoaDon = new HoaDon();
////        hoaDon.setNgayTao(ngayTao);
//        hoaDon.setGhiChu(ghiChu);
////        hoaDon.setNgayCapNhat(ngayCapNhat);
//        hoaDon.setTrangThai(trangThai);
//        hoaDon.setTaiKhoan(taiKhoan);
//        hoaDon.setThanhToan(thanhToan);
//        hoaDonImpl.add(hoaDon);
//        return "redirect:/hoa_don/hien-thi";
//    }
//    @GetMapping("detail/{id}")
//    public String detail(Model model, @PathVariable("id") Long id){
//        model.addAttribute("listHoaDon",hoaDonImpl.getAll());
//        model.addAttribute("hddt",hoaDonImpl.getOne(id));
//        model.addAttribute("listThanhToan",thanhToanRepository.findAll());
//        model.addAttribute("listTaiKhoan",taiKhoanRepository.findAll());
//        model.addAttribute("view", "/hoa_don/index.jsp");
//        System.out.println("tới detail r");
//        return "admin/index";
//    }
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

}
