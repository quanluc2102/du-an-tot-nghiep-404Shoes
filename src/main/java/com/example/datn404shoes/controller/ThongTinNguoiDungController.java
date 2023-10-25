package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThongTinNguoiDungServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("thong_tin")
public class ThongTinNguoiDungController {

    @Autowired
    private ThongTinNguoiDungServiceimpl serviceimpl;

    @GetMapping("index")
    public ResponseEntity<?> index(Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.getAllPhanTrang(pageable));
    }
}
