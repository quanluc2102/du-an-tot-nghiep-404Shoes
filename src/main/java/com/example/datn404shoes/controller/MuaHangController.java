package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.service.serviceimpl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

@RestController
@RequestMapping("payment")
public class MuaHangController {

    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @Autowired
    HoaDonImpl hoaDonImpl;
    @Autowired
    GioHangServiceImpl gioHangService;
    @Autowired
    GioHangChiTietServiceImpl gioHangChiTietService;
    @Autowired
    TaiKhoanServiceimpl taiKhoanServiceimpl;
    @Autowired
    SanPhamChiTietServiceimpl sanPhamChiTietServiceimpl;


    @GetMapping("placeorder")
    public ResponseEntity<?> hienThi(Model model, @RequestBody HoaDon hoaDon) {
        HoaDon hoaDon1 = new HoaDon();
        TaiKhoan taiKhoan = taiKhoanServiceimpl.getOneByEmail("");
        GioHang gioHang = gioHangService.findById(taiKhoan.getId());
        ArrayList<GioHangChiTiet> lstCartDetailView = gioHangChiTietService.getGioHangChiTietByKhachHang(taiKhoan.getId());

        hoaDon1.setMaHoaDon("HD" + hoaDon1.getId());
        hoaDon1.setNgayTao(Date.valueOf(LocalDate.now()));
        hoaDon1.setGhiChu(hoaDon.getGhiChu());
        hoaDon1.setTrangThai(hoaDon.getTrangThai());
        hoaDon1.setTaiKhoan(TaiKhoan.builder().id(1).build()); //sửa id tài khoản
        hoaDon1.setThanhToan(ThanhToan.builder().id(1).build()); //dể thanh toán là shipcode hoặc thanh toán online
        hoaDon1.setKieuHoaDon(0);// mặc định sẽ là đơn đặt hàng
        hoaDon1.setTen(hoaDon.getTen());
        hoaDon1.setSdt(hoaDon.getSdt());
        hoaDon1.setEmail(hoaDon.getEmail());
        hoaDon1.setDiaChiCuThe(hoaDon.getDiaChiCuThe());
        hoaDon1.setTinhThanhPho(hoaDon.getTinhThanhPho());
        hoaDon1.setQuanHuyen(hoaDon.getQuanHuyen());
        hoaDon1.setXaPhuongThiTran(hoaDon.getXaPhuongThiTran());
        hoaDon1.setNgayTao(Date.valueOf(LocalDate.now()));
        HoaDon hoaDonMoi;
        hoaDonMoi = hoaDonImpl.add(hoaDon);

        hoaDonMoi.setTongTien(gioHang.getTongTien());
        hoaDonMoi.setPhiShip(30.0F);//sau này call api phí ship vào dây
        hoaDonMoi.setTienGiam(hoaDonMoi.getTongTien());//lấy giá trị giảm giá của hóa đơn, nếu là phần trăm thì nhân % với tổng tiền còn nếu là tiền thì trừ thẳng
        hoaDonMoi.setTongTienSauGiam(hoaDonMoi.getTongTien() - hoaDonMoi.getTienGiam());
        var hdid = hoaDonImpl.add(hoaDonMoi);

        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietServiceimpl.getOne(Long.valueOf(1)); // đang set mặc định 1 sản phẩm chưa có giỏ hàng
        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
        hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
        hoaDonChiTiet.setSoLuong(1);
        hoaDonChiTiet.setHd(hdid);
        hoaDonChiTiet.setGhiChu("");

        hoaDonChiTietimpl.addNewHDCT(hoaDonChiTiet);

        return ResponseEntity.ok(hoaDonImpl.getAll());
    }
}
