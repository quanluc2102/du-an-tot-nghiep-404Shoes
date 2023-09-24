package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.helper.SanPhamExport;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("san_pham")
public class SanPhamController {
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("SanPham",new SanPham());
        model.addAttribute("view", "/san_pham/index.jsp");
        return "admin/index";
    }
    @PostMapping("add")
    public String add(Model model,
                      @RequestParam("ten") String ten,
                      @RequestParam("giaNhap") double giaNhap,
                      @RequestParam("giaBan")double giaBan,
                      @RequestParam("soLuong") Integer soLuong,
                      @RequestParam("moTa") String moTa,
                      @RequestParam("trangThai") Integer trangThai){
        SanPham sp = new SanPham(giaNhap,ten,giaBan,soLuong,trangThai,moTa);
        sanPhamServiceimpl.add(sp);
        sanPhamServiceimpl.chuyenSoLuong(sp);
        return "redirect:/san_pham/index";
    }
    @GetMapping("delete")
    public String delete(Model model,
                         @RequestParam("id") Long id){
        sanPhamServiceimpl.delete(id);
        return "redirect:/san_pham/index";
    }
    @GetMapping("detail")
    public String detail(Model model,
                         @RequestParam("id") Long id){
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("SanPham",sanPhamServiceimpl.getOne(id));
        model.addAttribute("sp",sanPhamServiceimpl.getOne(id));
        model.addAttribute("view", "/san_pham/index.jsp");
        return "admin/index";
    }
    @PostMapping("update/{id}")
    public String detail(Model model,
                         @PathVariable("id") Long id,
                         @ModelAttribute("SanPham") SanPham sp){
        sanPhamServiceimpl.update(id,sp);
        sanPhamServiceimpl.chuyenSoLuong(sanPhamServiceimpl.getOne(id));
        return "redirect:/san_pham/index";
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
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List listSP = sanPhamServiceimpl.getAll();

        SanPhamExport excelExporter = new SanPhamExport(listSP);

        excelExporter.export(response);
    }
}
