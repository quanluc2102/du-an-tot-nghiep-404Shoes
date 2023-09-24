package com.example.datn404shoes.controller;

import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.service.serviceimpl.GioHangChiTietServiceImpl;
import com.example.datn404shoes.service.serviceimpl.GioHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/giohang")
public class GioHangController {

    @Autowired
    private GioHangServiceImpl giohangImpl;

    @Autowired
    private GioHangChiTietServiceImpl giohangchitietImpl;

    @Autowired
    private TaiKhoanRepository taikhoanRepo;

    @GetMapping("/index")
    public String thongTin(Model model){


        return "/gio-hang/GioHang";
    }

    @PostMapping("/add")
    public String themGioHang(Model model){


        return "redirect:/giohang/index";
    }

    @GetMapping("/delete/{id}")
    public String xoaGioHang(Model model,
                             @PathVariable("id") Long id){

        return "redirect:/giohang/index";
    }
}
