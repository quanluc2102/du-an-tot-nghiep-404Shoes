package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.helper.MauSacExcelSave;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("mau_sac")
public class MauSacController {

    @Autowired
    MauSacServiceImpl mauSacService;

    @GetMapping("hien_thi")
    public String hienThi(Model model) {
        model.addAttribute("listMauSac", mauSacService.findAll());
        model.addAttribute("view", "/mau_sac/index.jsp");

        return "admin/index";
    }

//    @GetMapping("create")
//    public String create(Model model) {
//        model.addAttribute("view", "/mau_sac/mau_sac_add.jsp");
//        return "admin/index";
//    }

    @PostMapping("add")
    public String themMoi(Model model,
                          @RequestParam("ten") String ten,
                          @RequestParam("giaTri") Integer giaTri,
                          @RequestParam("trangThai") Boolean trangThai
    ) {
        MauSac mauSac = new MauSac();
        mauSac.setTen(ten);
        mauSac.setGiaTri(giaTri);
        mauSac.setTrangThai(trangThai);
        mauSacService.add(mauSac);
        return "redirect:/mau_sac/hien_thi";
    }

    @PostMapping("update/{idud}")
    public String update(Model model,
                         @PathVariable("idud") Long idud,
                         @RequestParam("ten") String ten,
                         @RequestParam("giaTri") Integer giaTri,
                         @RequestParam("trangThai") Boolean trangThai
    ) {
        MauSac mauSac = mauSacService.findOne(idud);
        mauSac.setTen(ten);
        mauSac.setGiaTri(giaTri);
        mauSac.setTrangThai(trangThai);
        mauSacService.update(mauSac);
        return "redirect:/mau_sac/hien_thi";
    }

    @GetMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        mauSacService.delete(idx);
        return "redirect:/mau_sac/hien_thi";
    }

    @GetMapping("hien_thi/{iddt}")
    public String detail(Model model, @PathVariable("iddt") Long iddt) {
        model.addAttribute("msd", mauSacService.detail(iddt));
        model.addAttribute("view", "/mau_sac/index.jsp");
        model.addAttribute("listMauSac", mauSacService.findAll());
        return "admin/index";

    }

    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (MauSacExcelSave.hasExcelFormat(file)) {
            try {
                mauSacService.imPortExcel(file);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        message = "Please upload an excel file!";
        return "redirect:/mau_sac/hien_thi";
    }

}
