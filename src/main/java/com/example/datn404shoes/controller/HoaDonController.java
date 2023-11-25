package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.ThanhToanDTO;
import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.ThanhToanRepository;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
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

    @PostMapping("/add")
    public ResponseEntity<?> addNew(@RequestBody ThanhToanDTO thanhToanDTO) {
        try {
            // Lấy thông tin đơn hàng từ DTO
            HoaDon hoaDon = thanhToanDTO.getHoaDon();

            // Đặt ngày tạo là ngày hiện tại
            hoaDon.setNgayTao(Date.valueOf(LocalDate.now()));

            // Đặt trạng thái và kiểu đơn hàng theo yêu cầu
            hoaDon.setTrangThai(6);
            hoaDon.setKieuHoaDon(0);

            // Thêm mới đơn hàng và lấy về đơn hàng mới nhất
            HoaDon hoaDonMoiNhat = hoaDonImpl.add(hoaDon);

            // Xử lý từng chi tiết sản phẩm
            for (SanPhamChiTiet sanPhamChiTiet : thanhToanDTO.getSanPhamChiTietList()) {
                // Lấy chi tiết sản phẩm từ cơ sở dữ liệu
                SanPhamChiTiet sanPhamChiTiet1 = sanPhamChiTietServiceimpl.getOne(sanPhamChiTiet.getId());

                // Giảm số lượng sản phẩm trong kho
                int soLuong = sanPhamChiTiet.getSoLuong();
                sanPhamChiTiet1.setSoLuong(sanPhamChiTiet1.getSoLuong() - soLuong);

                // Cập nhật thông tin chi tiết sản phẩm
                SanPhamChiTietRequest sanPhamChiTietRequest = new SanPhamChiTietRequest();
                sanPhamChiTietRequest.setDonGia((int) sanPhamChiTiet1.getDonGia());
                sanPhamChiTietRequest.setAnh(sanPhamChiTiet1.getAnh());
                sanPhamChiTietRequest.setMauSac(sanPhamChiTiet1.getMauSac().getId());
                sanPhamChiTietRequest.setKichThuoc(sanPhamChiTiet1.getKichThuoc().getId());
                sanPhamChiTietRequest.setSoLuong(sanPhamChiTiet1.getSoLuong());

                // Tạo và thêm mới chi tiết đơn hàng
                HoaDonChiTiet hoaDonChiTiet = HoaDonChiTiet.builder()
                        .sanPhamChiTiet(sanPhamChiTiet1)
                        .soLuong(soLuong)
                        .hd(hoaDonMoiNhat)
                        .ghiChu(hoaDon.getGhiChu())
                        .build();

                hoaDonChiTietimpl.addNewHDCT(hoaDonChiTiet);

                // Cập nhật thông tin chi tiết sản phẩm
                sanPhamChiTietServiceimpl.update(sanPhamChiTiet1.getId(), sanPhamChiTietRequest);
            }

            // Trả về đơn hàng mới nhất
            return ResponseEntity.ok(hoaDonMoiNhat);
        } catch (Exception e) {
            String errorMessage = "Error occurred: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

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
}
