package com.example.datn404shoes.controller;


import com.example.datn404shoes.service.serviceimpl.DiaChiServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dia_chi")
@RestController
public class DiaChiController {

    @Autowired
    DiaChiServiceimpl diaChiServiceimpl;
    @GetMapping("index")
    public ResponseEntity<?> hienThi(Model model){
        return ResponseEntity.ok(diaChiServiceimpl.getAll());
    }
}
