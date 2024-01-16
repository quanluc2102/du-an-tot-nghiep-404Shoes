package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.DiaChiResponsitory;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.serviceimpl.DiaChiServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
@RequestMapping("/dia_chi")
@RestController
public class DiaChiController {

    @Autowired
    DiaChiServiceimpl diaChiServiceimpl;
    @Autowired
    DiaChiResponsitory diaChiResponsitory;

    @Autowired
    ThongTinNguoiDungRespository thongTinNguoiDungRespository;
    @GetMapping("index")
    public ResponseEntity<?> hienThi(Model model){
        return ResponseEntity.ok(diaChiServiceimpl.getAll());
    }

    @GetMapping("/TTDC/{id}")
    public ResponseEntity<?> detailDC(Model model, @PathVariable("id") Long id){
        return ResponseEntity.ok(diaChiServiceimpl.getAllByIdTTND(id));
    }

    @GetMapping("/getDCByTaiKhoan/{id}")
    public ResponseEntity<?> getDCByTaiKhoan(Model model, @PathVariable("id") Long id){
        return ResponseEntity.ok(diaChiResponsitory.getDiaChiByTaiKhoan(id));
    }

    @PostMapping("addOrUpdateDC")
    public ResponseEntity<?> addOrUpdateDiaChi(@RequestBody DiaChi diaChi) {
        try {
            // Kiểm tra xem diaChi có thongTinNguoiDung không
            ThongTinNguoiDung thongTinNguoiDung = diaChi.getThongTinNguoiDung();
//

                DiaChi newDiaChi = new DiaChi();
                newDiaChi.setTen(diaChi.getTen());
                newDiaChi.setSdt(diaChi.getSdt());
                newDiaChi.setDiaChiCuThe(diaChi.getDiaChiCuThe());
                newDiaChi.setTinhThanhPho(diaChi.getTinhThanhPho());
                newDiaChi.setQuanHuyen(diaChi.getQuanHuyen());
                newDiaChi.setXaPhuongThiTran(diaChi.getXaPhuongThiTran());
                newDiaChi.setThongTinNguoiDung(diaChi.getThongTinNguoiDung());
                // Thêm mới địa chỉ
                DiaChi addedDiaChi = diaChiResponsitory.save(newDiaChi);
                return ResponseEntity.ok(addedDiaChi);



        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi thêm địa chỉ.");
        }
    }

    @PutMapping("/editDC/{id}")
    public ResponseEntity<?> updateDiaChi(@PathVariable("id") Long id, @RequestBody DiaChi diaChiDetails) {
        try {
            Optional<DiaChi> diaChiOptional = diaChiResponsitory.findById(id);

            if (diaChiOptional.isPresent()) {
                DiaChi diaChi = diaChiOptional.get();

                // Cập nhật thông tin địa chỉ với dữ liệu mới từ diaChiDetails
                // ...

                // Lưu đối tượng đã cập nhật vào cơ sở dữ liệu
                diaChiResponsitory.save(diaChi);

                return ResponseEntity.ok("Cập nhật địa chỉ thành công!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ với ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật địa chỉ.");
        }
    }



}
