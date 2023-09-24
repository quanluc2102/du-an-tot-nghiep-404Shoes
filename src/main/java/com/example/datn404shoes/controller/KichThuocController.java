package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.helper.KichThuocExcelSave;
import com.example.datn404shoes.service.serviceimpl.KichThuocServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("kich_thuoc")
public class KichThuocController {

    @Autowired
    KichThuocServiceImpl kichThuocService;

    @GetMapping("hien_thi")
    public String hienThi(Model model) {
        model.addAttribute("listKichThuoc", kichThuocService.findAll());
        model.addAttribute("view", "/kich_thuoc/index.jsp");
        return "admin/index";
    }

//    @GetMapping("create")
//    public String addView(Model model) {
//        model.addAttribute("listKichThuoc", kichThuocService.findAll());
//        model.addAttribute("view", "/kich_thuoc/kich_thuoc_add.jsp");
//        return "admin/index";
//    }

    @PostMapping("add")
    public String themMoi(Model model,
                          @RequestParam("giaTri") Integer giaTri,
                          @RequestParam("trangThai") Boolean trangThai
    ) {
        KichThuoc kichThuoc = new KichThuoc();
        kichThuoc.setGiaTri(giaTri);
        kichThuoc.setTrangThai(trangThai);
        kichThuocService.add(kichThuoc);
        return "redirect:/kich_thuoc/hien_thi";
    }

    @PostMapping("update/{idud}")
    public String update(Model model,
                         @PathVariable("idud") Long idud,
                         @RequestParam("giaTri") Integer giaTri,
                         @RequestParam("trangThai") Boolean trangThai
    ) {
        KichThuoc kichThuoc = kichThuocService.findOne(idud);
        kichThuoc.setGiaTri(giaTri);
        kichThuoc.setTrangThai(trangThai);
        kichThuocService.update(kichThuoc);
        return "redirect:/kich_thuoc/hien_thi";
    }

    @GetMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        kichThuocService.delete(idx);
        return "redirect:/kich_thuoc/hien_thi";
    }

    @GetMapping("hien_thi/{iddt}")
    public String detail(Model model, @PathVariable("iddt") Long iddt) {
        model.addAttribute("ktd", kichThuocService.detail(iddt));
        model.addAttribute("listKichThuoc", kichThuocService.findAll());
        model.addAttribute("view", "/kich_thuoc/index.jsp");
        return "admin/index";

    }

    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (KichThuocExcelSave.hasExcelFormat(file)) {
            try {
                kichThuocService.imPortExcel(file);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        message = "Please upload an excel file!";
        return "redirect:/kich_thuoc/hien_thi";
    }
}
