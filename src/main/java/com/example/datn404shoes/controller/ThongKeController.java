package com.example.datn404shoes.controller;

import com.example.datn404shoes.custom.ThongKeCustom;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.ThongKeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("thong_ke")
public class ThongKeController {


    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @GetMapping("thong_ke_theo_doanh_thu_san_pham")
    public List<Object[]> thongKeDoanhThu(Date startDate, Date endDate) {
            return hoaDonChiTietRepository.thongKeDoanhThu(startDate, endDate);
    }

}
