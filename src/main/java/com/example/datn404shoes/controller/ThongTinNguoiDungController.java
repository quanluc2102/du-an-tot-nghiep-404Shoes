package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThongTinNguoiDungServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Optional;

@Controller
@RequestMapping("/nguoi-dung")
public class ThongTinNguoiDungController {
    @Autowired
    private TaiKhoanResponsitory taiKhoanResponsitory;
    @Autowired
    private TaiKhoanServiceimpl taiKhoanServiceimpl;
    @Autowired
    private ThongTinNguoiDungServiceimpl thongTinNguoiDungServiceimpl;

    @GetMapping("/index")
    public String index(Model model) {
        ArrayList<ThongTinNguoiDung> list = thongTinNguoiDungServiceimpl.getAll();
//        ArrayList<TaiKhoan> listtk = taiKhoanServiceimpl.getAll();
        model.addAttribute("listND", list);
//        model.addAttribute("listTK",listtk);
        model.addAttribute("view", "/tai_khoan/danh_sach.jsp");
        return "admin/index";
    }

    @GetMapping("/create")
    public String create(Model model) {
//        ArrayList<TaiKhoan> listtk = taiKhoanServiceimpl.getAll();
//        model.addAttribute("listTK",listtk);
        model.addAttribute("view", "/tai_khoan/viewThem.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public String add(Model model,
                      @RequestParam("diaChi") String diaChi,
                      @RequestParam("sdt") String sdt,
                      @RequestParam("ten") String ten,
                      @RequestParam("ngaySinh") Date ngaySinh,
                      @RequestParam("ngayCapNhat") Date ngayCapNhat,
                      @RequestParam("taiKhoan") String taiKhoan
    ) {
        TaiKhoan khoan = taiKhoanResponsitory.findById(Long.valueOf(taiKhoan)).orElse(null);
        thongTinNguoiDungServiceimpl.add(new ThongTinNguoiDung(diaChi, sdt, ten, ngaySinh, ngayCapNhat, khoan));
        return "redirect:/nguoi-dung/index";
    }

    @GetMapping("/delete/{id}")
    public String delete(Model model,
                         @PathVariable("id") String id) {
        thongTinNguoiDungServiceimpl.delete(Long.valueOf(id));
        return "redirect:/nguoi-dung/index";
    }

    @GetMapping("/detail/{id}")
    public String detail(Model model,
                         @PathVariable("id") String id
    ) {
        Optional<ThongTinNguoiDung> dung = thongTinNguoiDungServiceimpl.detail(Long.valueOf(id));
        ArrayList<ThongTinNguoiDung> list = thongTinNguoiDungServiceimpl.getAll();
//        ArrayList<TaiKhoan> listtk = taiKhoanServiceimpl.getAll();
        model.addAttribute("listND", list);
//        model.addAttribute("listTK",listtk);
        model.addAttribute("nd", dung.get());
        model.addAttribute("listTK", taiKhoanServiceimpl.getAll());
        model.addAttribute("view", "/tai_khoan/danh_sach.jsp");
        return "admin/index";

//    @PostMapping("/update/{id}")
//    public String update(Model model,
//                         @PathVariable("id") String id,
//                         @ModelAttribute("ThongTinNguoiDung") ThongTinNguoiDung thongTinNguoiDung){
//        thongTinNguoiDungServiceimpl.update(Long.valueOf(id),thongTinNguoiDung);
//        return "redirect:/nguoi-dung/index";
//    }

    }
}
