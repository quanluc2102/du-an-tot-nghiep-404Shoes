package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.GioHang;
import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.repository.GioHangChiTietRepository;
import com.example.datn404shoes.repository.GioHangRepository;
import com.example.datn404shoes.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
@RestController
@RequestMapping("gio-hang-chi-tiet")
public class GioHangChiTietController {
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    GioHangRepository gioHangRepository;
    private final GioHangChiTietService gioHangChiTietService;

    @Autowired
    public GioHangChiTietController(GioHangChiTietService gioHangChiTietService){
        this.gioHangChiTietService = gioHangChiTietService;
    }

    @GetMapping("/get-gio-hang")
    public ResponseEntity<?> getGioHang(){
        return ResponseEntity.ok(gioHangRepository.findById(0L).orElse(new GioHang()));
    }

    @GetMapping("/danh-sach")
    public ResponseEntity<?> danhSach(){
        return ResponseEntity.ok(gioHangChiTietService.getAll());
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<?> danhSachOne(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(gioHangChiTietService.getGioHangChiTietByKhachHang(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> suaSoLuong(@PathVariable(name = "id") long id , @RequestParam(name = "soLuong") int soLuong){
        GioHangChiTiet gioHangChiTiet = gioHangChiTietService.getOne(id);
        gioHangChiTiet.setSoLuong(soLuong);
        gioHangChiTietRepository.save(gioHangChiTiet);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/delete-one/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable(name = "id") long id){
        gioHangChiTietService.delete(id);
        return ResponseEntity.ok("Xóa thành công");
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<?> deleteMultiple(@RequestBody List<GioHangChiTiet> list){
        System.out.println(list.toArray());
        for(GioHangChiTiet ghct : list){
            gioHangChiTietService.delete(ghct.getId());
        }
        return ResponseEntity.ok("Xóa thành công");
    }
}
