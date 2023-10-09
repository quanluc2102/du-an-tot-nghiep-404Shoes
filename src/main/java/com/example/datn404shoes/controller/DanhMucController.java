package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.service.serviceimpl.DanhMucServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("danh_muc")
public class DanhMucController {
    @Autowired
    DanhMucServiceimpl serviceimpl;

    @GetMapping("hien_thi")
    public ResponseEntity<?> index(Model model) {
        return ResponseEntity.ok(serviceimpl.getAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody DanhMuc danhMuc) {
        return ResponseEntity.ok(serviceimpl.add(danhMuc));
    }

    @DeleteMapping("delete")
    public String delete(Model model,
                         @RequestParam("id") Long id) {
        serviceimpl.delete(id);
        return "OK";
    }

    @GetMapping("detail")
    public ResponseEntity<?> detail(Model model,
                                    @RequestParam("id") Long id) {
        return ResponseEntity.ok(serviceimpl.getOne(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody DanhMuc danhMuc) {

        return ResponseEntity.ok(serviceimpl.update(id, danhMuc));
    }
}
