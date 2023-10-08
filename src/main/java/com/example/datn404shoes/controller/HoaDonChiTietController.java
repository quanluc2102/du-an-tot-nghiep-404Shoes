package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("hoa_don_chi_tiet")
public class HoaDonChiTietController {
    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @GetMapping("hien-thi/{idHD}")
    public String hienthi(Model model, @PathVariable("idHD") Long idHD){
        List<HoaDonChiTiet> listHDCT = hoaDonChiTietimpl.getAllByIdHD(idHD);
        double tongTien=0.0;
        for (HoaDonChiTiet listTT : listHDCT
             ) {
//            tongTien +=(double) listTT.getSoLuong() * listTT.getSp().getGiaBan();
        }
        model.addAttribute("listHDById",listHDCT);
        model.addAttribute("tongTien",tongTien);
        model.addAttribute("view", "/hoa_don_chi_tiet/index.jsp");
        return "admin/index";
    }
}
