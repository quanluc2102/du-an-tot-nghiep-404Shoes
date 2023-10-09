package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPhamThuongHieu;
import com.example.datn404shoes.request.SanPhamThuongHieuRequest;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamThuongHieuServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThuongHieuServiceimpl;
import com.oracle.wls.shaded.org.apache.regexp.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("san_pham_thuong_hieu")
public class SanPhamThuongHieuController {
    @Autowired
    SanPhamThuongHieuServiceimpl sanPhamThuongHieuServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    ThuongHieuServiceimpl thuongHieuServiceimpl;

    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model) {

        return ResponseEntity.ok(sanPhamServiceimpl.getAll());
    }

    @GetMapping("create")
    public String create(Model model) {
        model.addAttribute("SanPhamThuongHieu", new SanPhamThuongHieu());
        model.addAttribute("listSP", sanPhamServiceimpl.getAll());
        model.addAttribute("listTH", thuongHieuServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_thuong_hieu/addNew.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody SanPhamThuongHieuRequest sanPhamThuongHieuRequest) {
        return ResponseEntity.ok(sanPhamThuongHieuServiceimpl.add(sanPhamThuongHieuRequest));
    }

    @DeleteMapping("delete/{idx}")
    public String delete(Model model,
                         @RequestParam("idx") Long id) {
        sanPhamThuongHieuServiceimpl.delete(id);
        return "thanh cong";
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(Model model,
                         @PathVariable("id") Long id) {
        return ResponseEntity.ok(sanPhamThuongHieuServiceimpl.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                     @PathVariable("id") Long id,
                     @RequestBody SanPhamThuongHieuRequest sanPhamThuongHieuRequest) {
        return ResponseEntity.ok(sanPhamThuongHieuServiceimpl.update(id, sanPhamThuongHieuRequest));
    }
}
