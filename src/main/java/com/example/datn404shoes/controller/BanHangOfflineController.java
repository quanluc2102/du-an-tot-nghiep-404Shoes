package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.service.serviceimpl.BanHangOfflineServiceImpl;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ban_hang")
public class BanHangOfflineController {

    @Autowired
    private BanHangOfflineServiceImpl banHangOfflineService;

    @Autowired
    private TaiKhoanServiceimpl taiKhoanServiceimpl;
    @GetMapping("/danh_sach_km")
    public ResponseEntity<?> danhsachKM(){
       List<KhuyenMai> listKM = banHangOfflineService.danhsachKM();
       return ResponseEntity.ok(listKM);
    }

    @GetMapping("/{ma}")
    public ResponseEntity<?> getKhuyenMaiByMa(@PathVariable("ma") String ma){
        return ResponseEntity.ok(banHangOfflineService.getOneByMa(ma));
    }

    @GetMapping("/hienthiKH")
    public ResponseEntity<?> geKH(){
        return ResponseEntity.ok(taiKhoanServiceimpl.getNhanVienByQuyenId3());
    }

}
