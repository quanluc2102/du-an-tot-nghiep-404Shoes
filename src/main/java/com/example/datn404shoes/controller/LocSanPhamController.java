package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.helper.MatrixToImageWriter;
import com.example.datn404shoes.request.SPCTRequest;
import com.example.datn404shoes.request.SanPhamRequest;
import com.example.datn404shoes.service.serviceimpl.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.time.LocalDate;

@CrossOrigin(origins = {"http://localhost:3006"})
@RestController
@RequestMapping("loc")
public class LocSanPhamController {

    @Autowired
    MauSacServiceImpl mauSacService;
    @Autowired
    KichThuocServiceImpl kichThuocService;
    @Autowired
    ThuongHieuServiceimpl thuongHieuService;
    @Autowired
    XuatXuServiceimpl xuatXuService;
    @Autowired
    DanhMucServiceimpl danhMucService;

    @GetMapping("thuonghieuloc")
    public ResponseEntity<?> showThuongHieu(){
        return ResponseEntity.ok(thuongHieuService.getAllNoPage());
    }

    @GetMapping("xuatxuloc")
    public ResponseEntity<?> showXuatXu(){
        return ResponseEntity.ok(xuatXuService.getAllNoPage());
    }

    @GetMapping("danhmucloc")
    public ResponseEntity<?> showDanhMuc(){
        return ResponseEntity.ok(danhMucService.getAllNoPage());
    }

    @GetMapping("mausacloc")
    public ResponseEntity<?> showMauSac(){
        return ResponseEntity.ok(mauSacService.findAllNoPage());
    }

    @GetMapping("kichthuocloc")
    public ResponseEntity<?> shoKichThuoc(){
        return ResponseEntity.ok(kichThuocService.findAllNoPage());
    }
}
