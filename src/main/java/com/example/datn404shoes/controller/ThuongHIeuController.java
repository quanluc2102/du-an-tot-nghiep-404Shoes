package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.service.serviceimpl.ThuongHieuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("thuong_hieu")
public class ThuongHIeuController {
    @Autowired
    ThuongHieuServiceimpl serviceimpl;

    @GetMapping("index")
    public ResponseEntity<?> index(Model model) {
        return ResponseEntity.ok(serviceimpl.getAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody ThuongHieu thuongHieu) {

        return ResponseEntity.ok(serviceimpl.add(thuongHieu));
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
                                    @RequestBody ThuongHieu thuongHieu) {

        return ResponseEntity.ok(serviceimpl.update(id, thuongHieu));
    }
}
