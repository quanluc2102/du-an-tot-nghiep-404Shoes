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
@RequestMapping("san_pham_xuat_xu")
public class SanPhamXuatXuController {

    @Autowired
    SanPhamXuatXuServiceimpl xuatXuServiceimpl;



    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model) {

        return ResponseEntity.ok(xuatXuServiceimpl.getAll());
    }

    @GetMapping("create")
    public String create(Model model) {
//        model.addAttribute("SanPhamThuongHieu", new SanPhamThuongHieu());
//        model.addAttribute("listSP", xuatXuServiceimpl.getAll());
//        model.addAttribute("listTH", thuongHieuServiceimpl.getAll());
//        model.addAttribute("view", "/san_pham_thuong_hieu/addNew.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody SanPhamXuatXuRequest sanPhamThuongHieuRequest) {
        return ResponseEntity.ok(xuatXuServiceimpl.add(sanPhamThuongHieuRequest));
    }

    @DeleteMapping("delete/{idx}")
    public String delete(Model model,
                         @RequestParam("idx") Long id) {
        xuatXuServiceimpl.delete(id);
        return "thanh cong";
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(Model model,
                         @PathVariable("id") Long id) {
        return ResponseEntity.ok(xuatXuServiceimpl.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                     @PathVariable("id") Long id,
                     @RequestBody SanPhamXuatXuRequest sanPhamThuongHieuRequest) {
        return ResponseEntity.ok(xuatXuServiceimpl.update(id, sanPhamThuongHieuRequest));
    }
}
