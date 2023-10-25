package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.helper.SanPhamExcelSave;
//import com.example.datn404shoes.helper.TaiKhoanExport;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.request.SanPhamRequest;
import com.example.datn404shoes.service.serviceimpl.PhanQuyenServiceimpl;
import com.example.datn404shoes.service.serviceimpl.QuyenServiceimpl;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("tai_khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanServiceimpl serviceimpl;
    @Autowired
    private PhanQuyenServiceimpl phanQuyenServiceimpl;
    @Autowired
    private QuyenServiceimpl quyenServiceimpl;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    private final Path root = Paths.get("frontend/src/img");

    @GetMapping("index")
    public Page<TaiKhoan> index(Model model, Pageable pageable) {

        return serviceimpl.findAll(pageable);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    @PostMapping("addNhanVien")
    public ResponseEntity<?> addNhanVien(Model model,
                                         @RequestBody TaiKhoan taiKhoan) {
        serviceimpl.add(taiKhoan);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(1).build());
        phanQuyenServiceimpl.add(phanQuyen);
        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }
    @PostMapping("addKhachHang")
    public ResponseEntity<?> addKhachHang(Model model,
                                         @RequestBody TaiKhoan taiKhoan) {
        serviceimpl.add(taiKhoan);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(3).build());
        phanQuyenServiceimpl.add(phanQuyen);
        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }
    @PostMapping("addQuanLy")
    public ResponseEntity<?> addQuanLy(Model model,
                                          @RequestBody TaiKhoan taiKhoan) {
        serviceimpl.add(taiKhoan);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(2).build());
        phanQuyenServiceimpl.add(phanQuyen);
        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    @DeleteMapping("delete")
    public String delete(Model model,
                         @PathVariable("id") Long id) {
        serviceimpl.delete(id);
        return "OK";
    }

    @GetMapping("index/{id}")
    public ResponseEntity<?> detail(Model model,
                                    @PathVariable("id") Long id) {

        return ResponseEntity.ok(serviceimpl.getOne(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
    }
    @PutMapping("updateQuanLy/{id}")
    public ResponseEntity<?> updateQuanLy(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
    }
    @PutMapping("updateNhanVien/{id}")
    public ResponseEntity<?> updateNhanVien(Model model,
                                          @PathVariable("id") Long id,
                                          @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
    }
    @PutMapping("updateKhacHang/{id}")
    public ResponseEntity<?> updateKhachHang(Model model,
                                          @PathVariable("id") Long id,
                                          @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
    }

    //    @GetMapping("export")
//    public void exportToExcel(HttpServletResponse response) throws IOException {
//        response.setContentType("application/octet-stream");
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//        String currentDateTime = dateFormatter.format(new java.util.Date());
//
//        String headerKey = "Content-Disposition";
//        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
//        response.setHeader(headerKey, headerValue);
//
//        List listTK = taiKhoanServiceimpl.getAll();
//
//        TaiKhoanExport excelExporter = new TaiKhoanExport(listTK);
//
//        excelExporter.export(response);
//    }
    @PutMapping("updatett/{id}")
    public ResponseEntity<?> updatett(Model model,
                                      @PathVariable("id") Long id,
                                      @RequestBody Map<String, Boolean> trangThaiData) {
        Boolean newTrangThai = trangThaiData.get("trangThai");
        TaiKhoan taiKhoan = serviceimpl.getOne(id);
        taiKhoan.setTrangThai(newTrangThai);
        return ResponseEntity.ok(serviceimpl.thayDoiTrangThai(id, taiKhoan));
    }

    @GetMapping("nhan-vien-quyen-1")
    public List<TaiKhoan> getNhanVienByQuyenId1() {

        return serviceimpl.getNhanVienByQuyenId1();
    }

    @GetMapping("nhan-vien-quyen-2")
    public List<TaiKhoan> getNhanVienByQuyenId2() {

        return serviceimpl.getNhanVienByQuyenId2();
    }

    @GetMapping("/nhan-vien-quyen-3")
    public List<TaiKhoan> getNhanVienByQuyenId3() {
        return
                serviceimpl.getNhanVienByQuyenId3();
    }

    @GetMapping("nhan-vien-quyen-4")
    public List<TaiKhoan> getNhanVienByQuyenId4() {

        return serviceimpl.getNhanVienByQuyenId4();
    }
}
