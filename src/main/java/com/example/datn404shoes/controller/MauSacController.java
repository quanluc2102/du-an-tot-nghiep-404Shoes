package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.MauSac;
//import com.example.datn404shoes.helper.MauSacExcelSave;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("mau_sac")
public class MauSacController {

    @Autowired
    MauSacServiceImpl mauSacService;

    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model, Pageable pageable) {
        return ResponseEntity.ok(mauSacService.findAll(pageable));
    }

//    @GetMapping("create")
//    public String create(Model model) {
//        model.addAttribute("view", "/mau_sac/mau_sac_add.jsp");
//        return "admin/index";
//    }

    @PostMapping("add")
    public ResponseEntity<?> themMoi(Model model,
                                    @RequestBody MauSac mauSac
    ) {
        return ResponseEntity.ok(mauSacService.add(mauSac));
    }

    @PutMapping("update/{idud}")
    public ResponseEntity<?> update(Model model,
                         @PathVariable("idud") Long idud,
                         @RequestBody MauSac mauSac
    ) {

        return ResponseEntity.ok(mauSacService.update(idud, mauSac));
    }

    @DeleteMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        mauSacService.delete(idx);
        return "redirect:/mau_sac/hien_thi";
    }

    @GetMapping("hien_thi/{iddt}")
    public ResponseEntity<?> detail(Model model, @PathVariable("iddt") Long iddt) {
        return ResponseEntity.ok(mauSacService.findOne(iddt));

    }

    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
//        if (MauSacExcelSave.hasExcelFormat(file)) {
//            try {
//                mauSacService.imPortExcel(file);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        message = "Please upload an excel file!";
        return "redirect:/mau_sac/hien_thi";
    }

}
