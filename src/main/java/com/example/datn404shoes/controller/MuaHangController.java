package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.GioHangRepository;
import com.example.datn404shoes.request.AddGioHangRequest;
import com.example.datn404shoes.service.serviceimpl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
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
    GioHangRepository gioHangRepository;
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

    @PostMapping("add_gio_hang")
    public ResponseEntity<?> addGioHang(Model model, @RequestBody AddGioHangRequest request) {
        GioHangChiTiet gioHangChiTiet = new GioHangChiTiet();
        gioHangChiTiet.setSanPhamChiTietId(request.getSpct());
//        TaiKhoan tk = TaiKhoan.builder().id(request.getNguoiDung()).build();
        TaiKhoan tk = TaiKhoan.builder().id(1).build();
        List<GioHang> listGioHang = gioHangRepository.findAll();
        Long gioHangId = Long.valueOf(1);
        for(GioHang list:listGioHang){
            if(list.getTaiKhoan()==tk){
                gioHangId=list.getId();
            }
        }
        gioHangChiTiet.setSoLuong(request.getSoLuong());
        gioHangChiTiet.setGioHangId(GioHang.builder().id(gioHangId).build());
        gioHangChiTietService.add(gioHangChiTiet);
        System.out.println(gioHangChiTiet);
        return ResponseEntity.ok(gioHangChiTiet);
    }
}
