package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("san_pham_chi_tiet")
public class SanPhamChiTietController {
    @Autowired
    SanPhamChiTietServiceimpl serviceimpl;

    @GetMapping("index")
    public List<SanPhamChiTiet> index(){
        return serviceimpl.getAll();
    }
    @PostMapping("add/{ktmsId}/{spId}")
    public SanPhamChiTiet add(@RequestBody SanPhamChiTiet spct,@PathVariable(name = "ktmsId") Long ktmsId,@PathVariable(name = "spId") Long spId){

        return serviceimpl.add(spct,ktmsId,spId);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        serviceimpl.delete(id);
        Map<String,Boolean> response =new HashMap<>();
        response.put("Delete",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){

        return ResponseEntity.ok(serviceimpl.getOne(id));
    }
    @PutMapping("update/{id}/{ktmsId}/{spId}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @PathVariable(name = "ktmsId") Long ktmsId,
                                    @PathVariable(name = "spId") Long spId,
                                    @RequestBody SanPhamChiTiet spct){

        return ResponseEntity.ok(serviceimpl.update(id,ktmsId,spId,spct));
    }
}
