package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.*;
import com.example.datn404shoes.request.AddGioHangRequest;
import com.example.datn404shoes.request.HoaDonUserRequest;
import com.example.datn404shoes.service.serviceimpl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
@RestController
@RequestMapping("payment")
public class MuaHangController {

    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @Autowired
    HoaDonImpl hoaDonImpl;
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    GioHangServiceImpl gioHangService;
    @Autowired
    GioHangRepository gioHangRepository;
    @Autowired
    GioHangChiTietServiceImpl gioHangChiTietService;
    @Autowired
    DiaChiResponsitory diaChiResponsitory;
    @Autowired
    TaiKhoanServiceimpl taiKhoanServiceimpl;
    @Autowired
    SanPhamChiTietServiceimpl sanPhamChiTietServiceimpl;
    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    KhuyenMaiServiceImpl khuyenMaiService;
    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;


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

//        TaiKhoan tk = TaiKhoan.builder().id(request.getNguoiDung()).build();
        TaiKhoan tk = TaiKhoan.builder().id(1).build();
        List<GioHang> listGioHang = gioHangRepository.findAll();
        Long gioHangId = Long.valueOf(1);
        for(GioHang list:listGioHang){
            if(list.getTaiKhoan()==tk){
                gioHangId=list.getId();
            }
        }
        List<GioHangChiTiet> listGHCT = gioHangChiTietService.getAll();
        int total = 0 ;
        GioHangChiTiet gioHangChiTietCo = null;
//        for(GioHangChiTiet ghct:listGHCT){
//            if(ghct.getGioHangId().getId()==gioHangId&&ghct.getSanPhamChiTietId().getId()==request.getSpct().getId()){
//                total += 1;
//                gioHangChiTietCo = ghct;
//            }
//        }
//        if(total==0){
//            GioHangChiTiet gioHangChiTiet = new GioHangChiTiet();
//            gioHangChiTiet.setSanPhamChiTietId(request.getSpct());
//            gioHangChiTiet.setSoLuong(request.getSoLuong());
//            gioHangChiTiet.setGioHangId(GioHang.builder().id(gioHangId).build());
//            gioHangChiTietService.add(gioHangChiTiet);
//        }else{
//            int tong = gioHangChiTietCo.getSoLuong()+request.getSoLuong();
//            if(tong > request.getSpct().getSoLuong()){
//                gioHangChiTietCo.setSoLuong(request.getSpct().getSoLuong());
//            }else{
//                gioHangChiTietCo.setSoLuong(gioHangChiTietCo.getSoLuong()+ request.getSoLuong());
//
//            }
//            gioHangChiTietRepository.save(gioHangChiTietCo);
//        }
        List<GioHangChiTiet> list = gioHangChiTietService.getGioHangChiTietByKhachHang(2L);
        for(GioHangChiTiet ghct:list){
            if(ghct.getSanPhamChiTietId().getId()==request.getSpct().getId()){
                total += 1;
                gioHangChiTietCo = ghct;
            }
        }
        if(total==0){
            GioHangChiTiet gioHangChiTiet = new GioHangChiTiet();
            gioHangChiTiet.setSanPhamChiTietId(request.getSpct());
            gioHangChiTiet.setSoLuong(request.getSoLuong());
            gioHangChiTiet.setGioHangId(GioHang.builder().id(gioHangId).build());
            gioHangChiTietService.add(gioHangChiTiet);
        }else{
            int tong = gioHangChiTietCo.getSoLuong()+request.getSoLuong();
            if(tong > request.getSpct().getSoLuong()){
                gioHangChiTietCo.setSoLuong(request.getSpct().getSoLuong());
            }else{
                gioHangChiTietCo.setSoLuong(gioHangChiTietCo.getSoLuong()+ request.getSoLuong());

            }
            gioHangChiTietRepository.save(gioHangChiTietCo);
        }
        return ResponseEntity.ok("Thêm thành công");
    }

    @PostMapping("sold")
    public ResponseEntity<?> sold( @RequestBody HoaDonUserRequest hoaDonUserRequest){
        long countHD = hoaDonImpl.countHoaDons();
        HoaDon hoaDon = new HoaDon();
        hoaDon.setMaHoaDon("HD00"+countHD);
        hoaDon.setNgayTao(Date.valueOf(LocalDate.now()));
        hoaDon.setTrangThai(0);
        hoaDon.setGhiChu(hoaDonUserRequest.getGhiChu());
        hoaDon.setTaiKhoanKhachHang(taiKhoanServiceimpl.getOne(hoaDonUserRequest.getTaiKhoanId()));
        if(hoaDonUserRequest.getKm()==0){

        }else{
            KhuyenMai km = khuyenMaiService.findOne(hoaDonUserRequest.getKm());
            hoaDon.setKhuyenMai(km);
            km.setSoLuong(km.getSoLuong()-1);
            if(km.getSoLuong()<0){
                km.setSoLuong(0);
                km.setTrangThai(2);
            }else if(km.getSoLuong()==0){
                km.setTrangThai(2);
            }
            khuyenMaiRepository.save(km);
        }
        hoaDon.setThanhToan(ThanhToan.builder().id(hoaDonUserRequest.getThanhToanId()).build());
        hoaDon.setKieuHoaDon(1);
        hoaDon.setTongTien(Float.valueOf(hoaDonUserRequest.getTongTien()));
        hoaDon.setPhiShip(Float.valueOf(hoaDonUserRequest.getTienShip()));
        hoaDon.setTongTienSauGiam(Float.valueOf(hoaDonUserRequest.getTongTienSauKhiGiam()));
        hoaDon.setTienGiam(Float.valueOf(hoaDonUserRequest.getTienGiam()));
        Optional<DiaChi> diaChi = diaChiResponsitory.findById(hoaDonUserRequest.getDiaChiId());
        hoaDon.setTen(diaChi.get().getTen());
        hoaDon.setSdt(diaChi.get().getSdt());
        TaiKhoan taiKhoan = taiKhoanServiceimpl.getOne(hoaDonUserRequest.getTaiKhoanId());
        hoaDon.setEmail(taiKhoan.getEmail());
        hoaDon.setDiaChiCuThe(diaChi.get().getDiaChiCuThe());
        hoaDon.setTinhThanhPho(diaChi.get().getTinhThanhPho());
        hoaDon.setQuanHuyen(diaChi.get().getQuanHuyen());
        hoaDon.setXaPhuongThiTran(diaChi.get().getXaPhuongThiTran());
        hoaDonRepository.save(hoaDon);
        for(GioHangChiTiet ghct: hoaDonUserRequest.getGioHang()){
            HoaDonChiTiet hdct = new HoaDonChiTiet();
            hdct.setHd(hoaDon);
            hdct.setSanPhamChiTiet(ghct.getSanPhamChiTietId());
            hdct.setSoLuong(ghct.getSoLuong());
            hoaDonChiTietimpl.addNewHDCT(hdct);
            ghct.getSanPhamChiTietId().setSoLuong(ghct.getSanPhamChiTietId().getSoLuong()-ghct.getSoLuong());
            if(ghct.getSanPhamChiTietId().getSoLuong()<0){
                ghct.getSanPhamChiTietId().setSoLuong(0);
            }
            sanPhamChiTietRepository.save(ghct.getSanPhamChiTietId());
            gioHangChiTietService.delete(ghct.getId());
        }
        return ResponseEntity.ok("Thêm thành công");
    }
}
