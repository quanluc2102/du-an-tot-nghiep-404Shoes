package com.example.datn404shoes.controller;


import com.example.datn404shoes.request.SanPhamXuatXuRequest;
import com.example.datn404shoes.service.SanPhamXuatXuService;
import com.example.datn404shoes.service.serviceimpl.SanPhamXuatXuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("san_pham_xuat_xu")
public class SanPhamXuatXuController {

    @Autowired
    SanPhamXuatXuServiceimpl sanphamXuatXuService;



    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model) {

        return ResponseEntity.ok(sanphamXuatXuService.getAll());
    }

    @GetMapping("create")
    public String create(Model model) {
//        model.addAttribute("SanPhamThuongHieu", new SanPhamThuongHieu());
//        model.addAttribute("listSP", sanphamXuatXuService.getAll());
//        model.addAttribute("listTH", thuongHieuServiceimpl.getAll());
//        model.addAttribute("view", "/san_pham_thuong_hieu/addNew.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody SanPhamXuatXuRequest sanPhamXuatXuRequest) {
        return ResponseEntity.ok(sanphamXuatXuService.add(sanPhamXuatXuRequest));
    }

    @DeleteMapping("delete/{idx}")
    public String delete(Model model,
                         @PathVariable("idx") Long id) {
        sanphamXuatXuService.delete(id);
        return "thanh cong";
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(Model model,
                         @PathVariable("id") Long id) {
        return ResponseEntity.ok(sanphamXuatXuService.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                     @PathVariable("id") Long id,
                     @RequestBody SanPhamXuatXuRequest sanPhamThuongHieuRequest) {
        return ResponseEntity.ok(sanphamXuatXuService.update(id, sanPhamThuongHieuRequest));
    }
}
