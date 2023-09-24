package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPhamAnh;
import com.example.datn404shoes.service.serviceimpl.SanPhamAnhServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("san_pham_anh")
public class SanPhamAnhController {
    @Autowired
    SanPhamAnhServiceimpl sanPhamAnhServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    private final Path root = Paths.get("src/main/resources/static/assets/img");

    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("listSPA",sanPhamAnhServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_anh/index.jsp");
        return "admin/index";
    }

    @GetMapping("create")
    public String create(Model model){
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_anh/addNew.jsp");
        return "admin/index";
    }

    @PostMapping(value = "add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String upload(Model model,
                         @RequestParam("files") MultipartFile[] files,
                         @RequestParam("sanPham") Long id) {
        String message = "";
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.asList(files).stream().forEach(file -> {
                SanPhamAnh a = new SanPhamAnh();
                File uploadRootDir = new File(String.valueOf(root));
                if(!uploadRootDir.exists()){
                    uploadRootDir.mkdirs();
                }try{
                    String filename= file.getOriginalFilename();
                    File serverFile = new File(uploadRootDir.getAbsoluteFile() + File.separator + filename);
                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                    stream.write(file.getBytes());
                    a.setSanPham(sanPhamServiceimpl.getOne(id));
                    a.setAnh(filename);
                    sanPhamAnhServiceimpl.save(a);
                    stream.close();
                }catch (Exception e){

                }
            });

            message = "Uploaded the files successfully: " + fileNames;
        } catch (Exception e) {
            message = "Fail to upload files!";
        }
        return "redirect:/san_pham_anh/index";
    }
}
