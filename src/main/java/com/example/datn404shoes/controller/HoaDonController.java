package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.ThanhToanDTO;
import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.ThanhToanRepository;
import com.example.datn404shoes.request.SPCTBanHangRequest;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("hoa_don")
public class HoaDonController {

    @Autowired
    HoaDonImpl hoaDonImpl;
    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @Autowired
    SanPhamChiTietServiceimpl sanPhamChiTietServiceimpl;
    @Autowired
    ThanhToanRepository thanhToanRepository;
    @Autowired
    TaiKhoanRepository taiKhoanRepository;
    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    PhanQuyenRepository phanQuyenRepository;
    @Autowired
    KhuyenMaiServiceImpl khuyenMaiService;
    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(Model model) {
        return ResponseEntity.ok(hoaDonImpl.getAll());
    }

    @GetMapping("hien-thi-taiKhoanKH/{id}")
    public ResponseEntity<?> hienThiKH(Model model, @PathVariable("id") Long id) {
        ;
        return ResponseEntity.ok(phanQuyenRepository.findPhanQuyenByQuyenId(id));
    }

    @GetMapping("hien-SPCT")
    public ResponseEntity<?> hienThiSPChiTiet(Model model, @PathVariable("id") Long id) {
        ;
        return ResponseEntity.ok(phanQuyenRepository.findPhanQuyenByQuyenId(id));
    }

//    @PostMapping("/add")
//    public ResponseEntity<?> addNew(@RequestBody ThanhToanDTO thanhToanDTO) {
//        try {
//
//            HoaDon hoaDon = thanhToanDTO.getHoaDon();
//
//            Long khuyenMai = thanhToanDTO.getKhuyenMai();
//
//            HoaDon hoaDonMoiNhat = hoaDonImpl.add(hoaDon);
//
//            String xaPhuongThiTran = thanhToanDTO.getXaPhuongThiTran();
//
//            String quanHuyen = thanhToanDTO.getQuanHuyen();
//
//            String tinhThanhPho = thanhToanDTO.getTinhThanhPho();
//
//            String diaChiCuThe = thanhToanDTO.getDiaChiCuThe();
//
//            Integer kieuHoaDon = thanhToanDTO.getKieuHoaDon();
//
//            if(xaPhuongThiTran != null){
//                hoaDonMoiNhat.setXaPhuongThiTran(xaPhuongThiTran);
//            }
//
//            if(tinhThanhPho != null){
//                hoaDonMoiNhat.setTinhThanhPho(tinhThanhPho);
//            }
//
//            if(quanHuyen != null){
//                hoaDonMoiNhat.setQuanHuyen(quanHuyen);
//            }
//
//            if(diaChiCuThe != null){
//                hoaDonMoiNhat.setDiaChiCuThe(diaChiCuThe);
//            }
//
//            if(kieuHoaDon == 0){
//                hoaDonMoiNhat.setTrangThai(0);
//            }else{
//                hoaDonMoiNhat.setTrangThai(4);
//            }
//
//            if(khuyenMai != null){
//                Optional<KhuyenMai> khuyenMaiOptional = khuyenMaiRepository.findById(khuyenMai);
//                if (khuyenMaiOptional.isPresent()) {
//                    KhuyenMai km = khuyenMaiOptional.get();
//                    int quantityKM = km.getSoLuong() - 1;
//                    km.setSoLuong(quantityKM);
//                    hoaDonMoiNhat.setKhuyenMai(km);
//                    khuyenMaiRepository.saveAndFlush(km);
//                }
//            }
//
//            for (SPCTBanHangRequest sanPhamChiTiet : thanhToanDTO.getSanPhamChiTietList()) {
//
//                SanPhamChiTiet sanPhamChiTiet1 = sanPhamChiTietServiceimpl.getOne(sanPhamChiTiet.getId());
//
//                int soLuong = sanPhamChiTiet.getQuantity();
//                sanPhamChiTiet1.setSoLuong(sanPhamChiTiet1.getSoLuong() - soLuong);
//
//                SanPhamChiTietRequest sanPhamChiTietRequest = new SanPhamChiTietRequest();
//                sanPhamChiTietRequest.setDonGia((int) sanPhamChiTiet1.getDonGia());
//                sanPhamChiTietRequest.setAnh(sanPhamChiTiet1.getAnh());
//                sanPhamChiTietRequest.setMauSac(sanPhamChiTiet1.getMauSac().getId());
//                sanPhamChiTietRequest.setKichThuoc(sanPhamChiTiet1.getKichThuoc().getId());
//                sanPhamChiTietRequest.setSoLuong(sanPhamChiTiet1.getSoLuong());
//
//                HoaDonChiTiet hoaDonChiTiet = HoaDonChiTiet.builder()
//                        .sanPhamChiTiet(sanPhamChiTiet1)
//                        .soLuong(soLuong)
//                        .hd(hoaDonMoiNhat)
//                        .ghiChu(hoaDon.getGhiChu())
//                        .build();
//
//                hoaDonChiTietimpl.addNewHDCT(hoaDonChiTiet);
//
//                sanPhamChiTietServiceimpl.update(sanPhamChiTiet1.getId(), sanPhamChiTietRequest);
//            }
//            return ResponseEntity.status(HttpStatus.CREATED).body(hoaDonMoiNhat);
//
//        } catch (Exception e) {
//            String errorMessage = "Error occurred: " + e.getMessage();
//            return ResponseEntity.badRequest().body(errorMessage);
//        }
//    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(Model model, @PathVariable("id") Long id) {

        return ResponseEntity.ok(hoaDonImpl.getOne(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody HoaDon hoaDon) {

        return ResponseEntity.ok(hoaDonImpl.update(id, hoaDon));
    }
    @PutMapping("updateDC/{id}")
    public ResponseEntity<?> updateDC(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody HoaDon hoaDon) {

        return ResponseEntity.ok(hoaDonImpl.updateDC(id, hoaDon));
    }
    @PutMapping("huyHD/{id}")
    public ResponseEntity<?> huyHD(Model model,
                                   @PathVariable("id") Long id,
                                   @RequestBody HoaDon hoaDon) {
        return ResponseEntity.ok(hoaDonImpl.huyHoaDon(id,hoaDon));
    }


}
