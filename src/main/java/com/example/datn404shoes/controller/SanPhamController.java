package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.helper.SanPhamExport;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("san_pham")
public class SanPhamController {
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @GetMapping("index")
    public Page<SanPham> index(Pageable pageable){
        return sanPhamServiceimpl.getAllPhanTrang(pageable);
    }
    @PostMapping("add")
    public SanPham add(@RequestBody SanPham sanPham){

        return sanPhamServiceimpl.add(sanPham);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
        sanPhamServiceimpl.delete(id);
        Map<String,Boolean> response =new HashMap<>();
        response.put("Delete",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") long id){

        return ResponseEntity.ok(sanPhamServiceimpl.getOne(id));
    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                         @PathVariable("id") long id,
                         @RequestBody SanPham sanPham){

        return ResponseEntity.ok(sanPhamServiceimpl.update(id,sanPham));
    }

    @PostMapping( value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (SanPhamExcelSave.hasExcelFormat(file)) {
            try {
                sanPhamServiceimpl.importExcel(file);
            } catch (Exception e) {

            }
        }

        message = "Please upload an excel file!";

        return "redirect:/san_pham/index";
    }

    @GetMapping("export")
    public void exportToExcel(HttpServletResponse response,Pageable pageable) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<SanPham> listSP = sanPhamServiceimpl.getAll();

        SanPhamExport excelExporter = new SanPhamExport((listSP));

        excelExporter.export(response);
    }
}
