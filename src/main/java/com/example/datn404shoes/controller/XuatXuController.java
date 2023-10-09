package com.example.datn404shoes.controller;



import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.service.serviceimpl.XuatXuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("xuat_xu")
public class XuatXuController {

    @Autowired
    XuatXuServiceimpl xuatXuServiceimpl;

    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model) {
        return ResponseEntity.ok(xuatXuServiceimpl.getAll());
    }

//    @GetMapping("create")
//    public String addView(Model model) {
//        model.addAttribute("listXuatXu", xuatXuServiceimpl.findAll());
//        model.addAttribute("view", "/kich_thuoc/kich_thuoc_add.jsp");
//        return "admin/index";
//    }

    @PostMapping("add")
    public ResponseEntity<?> themMoi(Model model,
                                     @RequestBody XuatXu xuatXu
    ) {
        return ResponseEntity.ok(xuatXuServiceimpl.add(xuatXu));
    }

    @PutMapping("update/{idud}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("idud") Long idud,
                                    @RequestBody XuatXu xuatXu
    ) {
        return ResponseEntity.ok(xuatXuServiceimpl.update(idud,xuatXu));
    }

    @DeleteMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        xuatXuServiceimpl.delete(idx);
        return "ok";
    }

    @GetMapping("hien_thi/{iddt}")
    public ResponseEntity<?> detail(Model model, @PathVariable("iddt") Long iddt) {
        return ResponseEntity.ok(xuatXuServiceimpl.getOne(iddt));

    }

}
