package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.KichThuocExcelSave;
import com.example.datn404shoes.request.KichThuocMauSacReQuest;
import com.example.datn404shoes.service.serviceimpl.KichThuocMauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.KichThuocServiceImpl;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("kich_thuoc_mau_sac")
public class KichThuocMauSacController {

    @Autowired
    KichThuocServiceImpl kichThuocService;
    @Autowired
    KichThuocMauSacServiceImpl kichThuocMauSacService;
    @Autowired
    MauSacServiceImpl mauSacService;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;

    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model) {
        return ResponseEntity.ok(kichThuocMauSacService.findAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> themMoi(Model model,
                          @RequestBody KichThuocMauSac kichThuocMauSac
    ) {


        return ResponseEntity.ok(kichThuocMauSacService.add(kichThuocMauSac));
    }

    @PutMapping("update/{idud}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("idud") Long idud,
                                    @RequestBody KichThuocMauSacReQuest kichThuocMauSacReQuest
                                    ) {
        return ResponseEntity.ok(kichThuocMauSacService.update(idud,kichThuocMauSacReQuest));
    }

    @DeleteMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        kichThuocMauSacService.delete(idx);
        return "redirect:/kich_thuoc_mau_sac/hien_thi";
    }

    @GetMapping("hien_thi/{iddt}")
    public ResponseEntity<?> detail(Model model, @PathVariable("iddt") Long iddt) {
        return ResponseEntity.ok(kichThuocMauSacService.detail(iddt));

    }

    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (KichThuocExcelSave.hasExcelFormat(file)) {
            try {
                kichThuocMauSacService.imPortExcel(file);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        message = "Please upload an excel file!";
        return "redirect:/kich_thuoc_mau_sac/hien_thi";
    }

}
