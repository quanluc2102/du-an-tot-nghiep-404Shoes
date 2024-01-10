package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThongTinNguoiDungServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("thong_tin")
public class ThongTinNguoiDungController {

    @Autowired
    private ThongTinNguoiDungServiceimpl serviceimpl;

    @GetMapping("index")
    public ResponseEntity<?> index(Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.getAllPhanTrang(pageable));
    }
//    @PostMapping("add")
//    public ResponseEntity<?> add(Model model,
//                                     @RequestBody ThongTinNguoiDung thongTin
//    ) {
//        return ResponseEntity.ok(serviceimpl.add(thongTin));
//    }
@PostMapping("/add")
public ResponseEntity<?> addThongTinNguoiDung(@RequestBody ThongTinNguoiDung thongTinNguoiDung) {
    try {
        // Kiểm tra và cung cấp giá trị cho ngaySinh
        if (thongTinNguoiDung.getNgaySinh() == null) {
            // Nếu giá trị ngaySinh là null, hãy đặt giá trị mặc định hoặc xử lý nó một cách phù hợp.
            LocalDate defaultNgaySinh = LocalDate.of(2000, 12, 20);
                   thongTinNguoiDung.setNgaySinh(Date.valueOf(defaultNgaySinh));
        }

        // Lưu vào cơ sở dữ liệu
        serviceimpl.add(thongTinNguoiDung);

        return ResponseEntity.ok("Thêm thông tin người dùng thành công!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi thêm thông tin người dùng.");
    }
}
    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody ThongTinNguoiDung thongTin
    ) {
        return ResponseEntity.ok(serviceimpl.update(id,thongTin));
    }

//    @DeleteMapping("delete/{idx}")
//    public String xoa(Model model, @PathVariable("idx") Long idx) {
//        xuatXuServiceimpl.delete(idx);
//        return "ok";
//    }

    @GetMapping("index/{id}")
    public ResponseEntity<?> detail(Model model, @PathVariable("id") Long id) {
        return ResponseEntity.ok(serviceimpl.getOne(id));

    }


}
