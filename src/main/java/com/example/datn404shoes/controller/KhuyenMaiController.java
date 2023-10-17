package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.helper.KhuyenMaiExcelSave;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("khuyen_mai")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiServiceImpl khuyenMaiServiceImpl;


    @GetMapping("index")
    public ResponseEntity<?> index(Model model){
        return ResponseEntity.ok(khuyenMaiServiceImpl.getAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody KhuyenMai khuyenMai){
        return ResponseEntity.ok(khuyenMaiServiceImpl.add(khuyenMai));
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        khuyenMaiServiceImpl.delete(id);
        Map<String,Boolean>respose = new HashMap<>();
        respose.put("Delete",Boolean.TRUE);
        return ResponseEntity.ok(respose);
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id")Long id){
        return ResponseEntity.ok(khuyenMaiServiceImpl.findOne(id));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id")Long id,
                                    @RequestBody KhuyenMai khuyenMai){
        return ResponseEntity.ok(khuyenMaiServiceImpl.update(id,khuyenMai));
    }
//    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public String importExecel(@RequestParam("file")MultipartFile file)
//            throws IOException{
//        String message ="";
//        if(KhuyenMaiExcelSave.hasExcelFormat(file)){
//            try {
//                khuyenMaiServiceImpl.imPortExcel(file);
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//        }
//        message = "Please upload an excel file!";
//        return "redirect:/khuyen_mai/index";
//    }
//    @Scheduled(cron = " 0 48 1 * * *")
//    public void task(){
//        System.out.println("123");
//    }
}
