package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPhamDanhMuc;
import com.example.datn404shoes.request.SanPhamDanhMucRequest;
import com.example.datn404shoes.service.serviceimpl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("san_pham_danh_muc")
public class SanPhamDanhMucController {
    @Autowired
    SanPhamDanhMucServiceimpl sanPhamDanhMucServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    DanhMucServiceimpl danhMucServiceimpl;

    @GetMapping("hien_thi")
    public ResponseEntity<?> index(Model model) {
        return ResponseEntity.ok(sanPhamDanhMucServiceimpl.getAll());
    }

    @GetMapping("create")
    public String create(Model model) {
        model.addAttribute("SanPhamDanhMuc", new SanPhamDanhMuc());
        model.addAttribute("listSP", sanPhamServiceimpl.getAll());
        model.addAttribute("listDM", danhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/addNew.jsp");
        return "admin/index";
    }

    @GetMapping("create_multi")
    public String createMulti(Model model) {
        model.addAttribute("SanPhamDanhMuc", new SanPhamDanhMuc());
        model.addAttribute("listSP", sanPhamServiceimpl.getAll());
        model.addAttribute("listDM", danhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/addMulti.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody SanPhamDanhMucRequest sanPhamDanhMucRequest) {
        return ResponseEntity.ok(sanPhamDanhMucServiceimpl.add(sanPhamDanhMucRequest));
    }

    @PostMapping("add_multi")
    public String addMulti(Model model,
                           @RequestBody SanPhamDanhMucRequest sanPhamDanhMucRequest,
                           @RequestParam("sanPham") String sanPham) {
        String[] sp = sanPham.split(",");
        for (String a : sp) {
            SanPhamDanhMucRequest b = new SanPhamDanhMucRequest();
//            b.setDanhMucId(sanPhamServiceimpl.getOne(Long.valueOf(a)));
//            b.setSanPhamId(sanPhamDanhMuc.getDanhMuc());
            sanPhamDanhMucServiceimpl.add(b);
        }
        return "redirect:/san_pham_danh_muc/index";
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(Model model,
                         @PathVariable("id") Long id) {
        sanPhamDanhMucServiceimpl.delete(id);
        return ResponseEntity.ok("oke");
    }

    @GetMapping("hien_thi/{id}")
    public ResponseEntity<?> detail(Model model,
                                    @PathVariable("id") Long id) {
        return ResponseEntity.ok(sanPhamDanhMucServiceimpl.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody SanPhamDanhMucRequest sanPhamDanhMucRequest) {
        return ResponseEntity.ok(sanPhamDanhMucServiceimpl.update(id, sanPhamDanhMucRequest));
    }
}
