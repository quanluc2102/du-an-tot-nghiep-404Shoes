package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.repository.GioHangChiTietRepository;
import com.example.datn404shoes.service.GioHangChiTietService;
import com.example.datn404shoes.service.GiohangService;
import com.example.datn404shoes.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class GioHangController {

    private final GiohangService giohangService;

    private final GioHangChiTietService gioHangChiTietService;

    private final TaiKhoanService taiKhoanService;

    private final GioHangChiTietRepository gioHangChiTietRepository;

    @Autowired
    public GioHangController(GiohangService giohangService, GioHangChiTietService gioHangChiTietService, TaiKhoanService taiKhoanService, GioHangChiTietRepository gioHangChiTietRepository){
        this.gioHangChiTietService = gioHangChiTietService;
        this.giohangService = giohangService;
        this.taiKhoanService = taiKhoanService;
        this.gioHangChiTietRepository = gioHangChiTietRepository;
    }

    @GetMapping("/detail/{idCart}")
    public ResponseEntity<List<GioHangChiTiet>>  getAllCartDetail(@PathVariable Long idCart){
        return ResponseEntity.ok(giohangService.getAll(idCart));
    }

    @PostMapping("/add")
    @Scope("session")
    public ResponseEntity<?> themGioHang(Model model) {
        Date currentTime = new Date(System.currentTimeMillis());
        java.sql.Date sqlDate = new java.sql.Date(currentTime.getTime());
        System.out.println("Ngày hiện tại (java.sql.Date): " + sqlDate);
        return ResponseEntity.ok("Dã thêm");
    }

    @GetMapping("/delete/{id}")
    public String xoaGioHang(Model model,
                             @PathVariable("id") Long id) {

        return "redirect:/giohang/index";
    }
}
