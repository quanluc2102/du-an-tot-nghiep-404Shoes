package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.helper.TaiKhoanExport;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

@Controller
@RequestMapping("/tai-khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanServiceimpl taiKhoanServiceimpl;
    @GetMapping("/index")
    public String hienThi(Model model){
        ArrayList<TaiKhoan> list = taiKhoanServiceimpl.getAll();
        model.addAttribute("listTK",list);
        System.out.println(list.toString());
        model.addAttribute("view", "/tai_khoan/index.jsp");
        return "admin/index";
    }
    @GetMapping("/create")
    public String create(Model model){
        model.addAttribute("view", "/tai_khoan/viewAdd.jsp");
        return "admin/index";
    }
    @GetMapping("/danhsach")
    public String hienThi1(Model model){
        ArrayList<TaiKhoan> list = taiKhoanServiceimpl.getAll();
        model.addAttribute("listTK",list);
        model.addAttribute("view", "/tai_khoan/thong_tin_tai_khoan.jsp");
        return "admin/index";
    }
    @PostMapping("add")
    public String add(Model model,
                      @RequestParam("username") String username,
                      @RequestParam("email") String email,
                      @RequestParam("ten") String ten,
                      @RequestParam("diaChi") String diaChi,
                      @RequestParam("ngayTao")Date ngayTao,
                      @RequestParam("ngayCapNhat") Date ngayCapNhat,
                      @RequestParam("password") String password,
                      @RequestParam("anh") String anh,
                      @RequestParam("sdt") String sdt,
                      @RequestParam("trangThai") Boolean trangThai
                      ){
        taiKhoanServiceimpl.add(new TaiKhoan(username,email,ten,diaChi,ngayTao,ngayCapNhat,password,anh,sdt,trangThai));
        return "redirect:/tai-khoan/index";
    }
    @GetMapping("/delete/{id}")
    public String delete (Model model,
                          @PathVariable("id") String id){
        taiKhoanServiceimpl.delete(Long.valueOf(id));
        return "redirect:/tai-khoan/index";
    }
    @GetMapping("/detail/{id}")
    public String detail(Model model,
                         @PathVariable("id") String id
                         ){
        Optional<TaiKhoan> khoan = taiKhoanServiceimpl.detail(Long.valueOf(id));
        ArrayList<TaiKhoan> list = taiKhoanServiceimpl.getAll();
        model.addAttribute("listTK",list);
        model.addAttribute("tk",khoan.get());
        model.addAttribute("view", "/tai_khoan/index.jsp");
        return "admin/index";
    }
    @PostMapping("/update/{id}")
    public String update(Model model,
                         @PathVariable("id") String id,
                         @ModelAttribute("TaiKhoan") TaiKhoan taiKhoan){
        taiKhoanServiceimpl.update(Long.valueOf(id),taiKhoan);
        return "redirect:/tai-khoan/index";
    }
    @PostMapping( value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (SanPhamExcelSave.hasExcelFormat(file)) {
            try {
                taiKhoanServiceimpl.importExcel(file);
            } catch (Exception e) {

            }
        }

        message = "Please upload an excel file!";

        return "redirect:/tai-khoan/index";
    }

    @GetMapping("export")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new java.util.Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List listTK = taiKhoanServiceimpl.getAll();

        TaiKhoanExport excelExporter = new TaiKhoanExport(listTK);

        excelExporter.export(response);
    }
}
