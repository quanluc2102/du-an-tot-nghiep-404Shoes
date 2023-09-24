package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.KichThuocExcelSave;
import com.example.datn404shoes.service.serviceimpl.KichThuocMauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.KichThuocServiceImpl;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
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
    public String hienThi(Model model) {
        model.addAttribute("listKichThuoc", kichThuocService.findAll());
        model.addAttribute("listSanPham", sanPhamServiceimpl.getAll());
        model.addAttribute("listMauSac", mauSacService.findAll());
        model.addAttribute("listKichThuocMauSac", kichThuocMauSacService.findAll());
        model.addAttribute("view", "/kich_thuoc_mau_sac/index.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public String themMoi(Model model,
                          @RequestParam("soLuong") Integer soLuong,
                          @RequestParam("sanPham") SanPham sanPham,
                          @RequestParam("mauSac") MauSac mauSac,
                          @RequestParam("kichThuoc") KichThuoc kichThuoc,
                          @RequestParam("trangThai") Integer trangThai
    ) {
        KichThuocMauSac kichThuocMauSac = new KichThuocMauSac();
        kichThuocMauSac.setSoLuong(soLuong);
        kichThuocMauSac.setSanPham(sanPham);
        kichThuocMauSac.setMauSac(mauSac);
        kichThuocMauSac.setKichThuoc(kichThuoc);
        kichThuocMauSac.setSoLuong(soLuong);
        kichThuocMauSac.setTrangThai(trangThai);
        kichThuocMauSacService.add(kichThuocMauSac);
        return "redirect:/kich_thuoc_mau_sac/hien_thi";
    }

    @PostMapping("update/{idud}")
    public String update(Model model,
                         @PathVariable("idud") Long idud,
                         @RequestParam("soLuong") Integer soLuong,
                         @RequestParam("sanPham") SanPham sanPham,
                         @RequestParam("mauSac") MauSac mauSac,
                         @RequestParam("kichThuoc") KichThuoc kichThuoc,
                         @RequestParam("trangThai") Integer trangThai
    ) {
        KichThuocMauSac kichThuocMauSac = kichThuocMauSacService.findOne(idud);
        kichThuocMauSac.setSoLuong(soLuong);
        kichThuocMauSac.setSanPham(sanPham);
        kichThuocMauSac.setMauSac(mauSac);
        kichThuocMauSac.setKichThuoc(kichThuoc);
        kichThuocMauSac.setSoLuong(soLuong);
        kichThuocMauSac.setTrangThai(trangThai);
        kichThuocMauSacService.add(kichThuocMauSac);
        return "redirect:/kich_thuoc_mau_sac/hien_thi";
    }

    @GetMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        kichThuocMauSacService.delete(idx);
        return "redirect:/kich_thuoc_mau_sac/hien_thi";
    }

    @GetMapping("hien_thi/{iddt}")
    public String detail(Model model, @PathVariable("iddt") Long iddt) {
        model.addAttribute("listKichThuoc", kichThuocService.findAll());
        model.addAttribute("listSanPham", sanPhamServiceimpl.getAll());
        model.addAttribute("listMauSac", mauSacService.findAll());
        model.addAttribute("ktmsd", kichThuocMauSacService.detail(iddt));
        model.addAttribute("listKichThuocMauSac", kichThuocMauSacService.findAll());
        model.addAttribute("view", "/kich_thuoc_mau_sac/index.jsp");
        return "admin/index";

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
