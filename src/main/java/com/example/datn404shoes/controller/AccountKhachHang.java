package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.ChiTietHoaDonDTO;
import com.example.datn404shoes.DTO.DiaChiDTO;
import com.example.datn404shoes.DTO.HoaDonKhachDTO;
import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.DiaChiResponsitory;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.repository.ThongKeRepository;
import com.example.datn404shoes.service.serviceimpl.DiaChiServiceimpl;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThongTinNguoiDungServiceimpl;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3006")
@RequestMapping("khach_hang_page")
public class AccountKhachHang {
    @Autowired
    private HoaDonRepository hoaDonRepository;
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    DiaChiResponsitory diaChiResponsitory;
    @Autowired
    private ThongTinNguoiDungServiceimpl thongTinNguoiDungServiceimpl;
    @Autowired
    DiaChiServiceimpl diaChiServiceimpl;
    @GetMapping("all")
    public List<Object[]> all(Long id) {
        return hoaDonRepository.all(id);
    }

    @GetMapping("hoa_don_chua_xac_nhan")
    public List<Object[]> hoa_don_chua_xac_nhan(Long id) {
        return hoaDonRepository.hoaDonChuaXacNhan(id);
    }

    @GetMapping("hoa_don_xac_nhan")
    public List<Object[]> hoa_don_xac_nhan(Long id) {
        return hoaDonRepository.xacNhan(id);
    }

    @GetMapping("hoa_don_dong_goi")
    public List<Object[]> hoa_don_dong_goi(Long id) {
        return hoaDonRepository.dongGoi(id);
    }

    @GetMapping("hoa_don_dang_giao")
    public List<Object[]> hoa_don_dang_giao(Long id) {
        return hoaDonRepository.dangGiao(id);
    }

    @GetMapping("hoa_don_hoan_thanh")
    public List<Object[]> hoa_don_hoan_thanh(Long id) {
        return hoaDonRepository.hoanThanh(id);
    }

    @GetMapping("huy")
    public List<Object[]> huy(Long id) {
        return hoaDonRepository.huy(id);
    }


    @GetMapping("mua_tai_quay")
    public List<Object[]> thongKeDoanhThuSanPham(Long id) {
        return hoaDonRepository.muaTaiQuay(id);
    }

    @GetMapping("dat_hang_thanh_cong")
    public Object[] dat_hang_thanh_cong(Long id) {
        return hoaDonRepository.thanhToanThanhCong();
    }

    @GetMapping("get_dia_chi_by_khach_hang")
    public ResponseEntity<?> get_dia_chi_by_khach_hang(Long id) {
        return ResponseEntity.ok(diaChiServiceimpl.getAllByIdTTND(id));
    }

    @PostMapping("addDC")
    public ResponseEntity<?> addDC(@RequestBody DiaChiDTO diaChi) {
        System.out.println("deualf" + diaChi.getTen());
        System.out.println("dcct" + diaChi.getDiaChiCuThe());
        System.out.println("tp" + diaChi.getTinhThanhPho());
        System.out.println("tp" + diaChi.getQuanHuyen());
        System.out.println("tp" + diaChi.getXaPhuongThiTran());
        System.out.println("ttnd" + diaChi.getThongTinNguoiDungId());

        DiaChi newDiaChi = new DiaChi();
        newDiaChi.setTen(diaChi.getTen());
        newDiaChi.setSdt(diaChi.getSdt());
        newDiaChi.setDiaChiCuThe(diaChi.getDiaChiCuThe());
        newDiaChi.setTinhThanhPho(diaChi.getTinhThanhPho());
        newDiaChi.setQuanHuyen(diaChi.getQuanHuyen());
        newDiaChi.setXaPhuongThiTran(diaChi.getXaPhuongThiTran());
        newDiaChi.setTrangThai(1);

        // Lấy ngày và giờ hiện tại
        java.util.Date currentDate = new java.util.Date();
        java.sql.Date ngayCapNhat = new java.sql.Date(currentDate.getTime());
        newDiaChi.setNgayCapNhat(ngayCapNhat);

        newDiaChi.setThongTinNguoiDung(thongTinNguoiDungServiceimpl.findById(diaChi.getThongTinNguoiDungId()));

        // Kiểm tra xem có ID được cung cấp hay không để xác định hành động là thêm mới hay cập nhật

            DiaChi addedDiaChi = diaChiResponsitory.save(newDiaChi);
            return ResponseEntity.ok(addedDiaChi);


    }

    @PutMapping("/updateDiaChi/{id}")
    public ResponseEntity<?> updateDiaChi(@PathVariable Long id, @RequestBody DiaChiDTO updatedDiaChi) {
        System.out.println("id"+id);
            // Bước 1: Xác định địa chỉ cần cập nhật
            DiaChi existingDiaChi = diaChiResponsitory.getById(id);
        System.out.println("exasfdas"+existingDiaChi.getDiaChiCuThe());

        // Bước 2: Cập nhật thông tin địa chỉ với dữ liệu mới từ updatedDiaChi
            existingDiaChi.setTen(updatedDiaChi.getTen());
            existingDiaChi.setSdt(updatedDiaChi.getSdt());
            existingDiaChi.setDiaChiCuThe(updatedDiaChi.getDiaChiCuThe());
            existingDiaChi.setXaPhuongThiTran(updatedDiaChi.getXaPhuongThiTran());
            existingDiaChi.setQuanHuyen(updatedDiaChi.getQuanHuyen());
            existingDiaChi.setTinhThanhPho(updatedDiaChi.getTinhThanhPho());
            existingDiaChi.setTrangThai(1);

            // Lấy ngày và giờ hiện tại
            java.util.Date currentDate = new java.util.Date();
            java.sql.Date ngayCapNhat = new java.sql.Date(currentDate.getTime());
            existingDiaChi.setNgayCapNhat(ngayCapNhat);

            existingDiaChi.setThongTinNguoiDung(thongTinNguoiDungServiceimpl.findById(updatedDiaChi.getThongTinNguoiDungId()));
            System.out.println(existingDiaChi.getId());
            System.out.println(existingDiaChi.getTen());
            System.out.println(existingDiaChi.getSdt());
            System.out.println(existingDiaChi.getDiaChiCuThe());
            System.out.println(existingDiaChi.getXaPhuongThiTran());
            System.out.println(existingDiaChi.getQuanHuyen());
            System.out.println(existingDiaChi.getTinhThanhPho());
            System.out.println(existingDiaChi.getTrangThai());
            System.out.println(existingDiaChi.getNgayCapNhat());
            // Bước 3: Lưu trữ đối tượng địa chỉ đã cập nhật vào cơ sở dữ liệu
            DiaChi updatedEntity = diaChiResponsitory.save(existingDiaChi);
            return ResponseEntity.ok(updatedEntity);

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDiaChi(@PathVariable Long id) {
        diaChiResponsitory.delete(diaChiResponsitory.getById(id));
        return ResponseEntity.ok("OK");

    }


}
