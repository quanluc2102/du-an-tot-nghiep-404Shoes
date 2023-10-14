package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.helper.TaiKhoanExport;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("tai_khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanServiceimpl serviceimpl;

    @GetMapping("index")
    public ResponseEntity<?> index(Model model) {
        return ResponseEntity.ok(serviceimpl.getAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    @DeleteMapping("delete/{id}")
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

      return ResponseEntity.ok(serviceimpl.update(id,taiKhoan));
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
}
