package com.example.datn404shoes.controller;


import com.example.datn404shoes.custom.TaiKhoanVaThongTin;
import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.helper.SanPhamExcelSave;
//import com.example.datn404shoes.helper.TaiKhoanExport;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.request.SanPhamRequest;
import com.example.datn404shoes.service.serviceimpl.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.DateFormat;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("tai_khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanServiceimpl serviceimpl;
    @Autowired
    private PhanQuyenServiceimpl phanQuyenServiceimpl;
    @Autowired
    private QuyenServiceimpl quyenServiceimpl;
    @Autowired
    private ThongTinNguoiDungServiceimpl thongTinNguoiDungServiceimpl;
    @Autowired
    private ThongTinNguoiDungRespository thongTinNguoiDungRespository;
    @Autowired
    private TaiKhoanResponsitory taiKhoanRepository;
    @Autowired
    private DiaChiServiceimpl diaChiServiceimpl;
    private final Path root = Paths.get("frontend/src/img");

    @GetMapping("index")
    public Page<TaiKhoan> index(Model model, Pageable pageable) {
        return serviceimpl.findAll(pageable);
    }
    @GetMapping("index1")
    public List<TaiKhoan> index1(){
        return serviceimpl.getAll();
    }
    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody TaiKhoan taiKhoan) {

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

//    @PostMapping("addNhanVien")
//    public ResponseEntity<?> addNhanVien(Model model,
//                                         @RequestBody TaiKhoan taiKhoan) {
//        serviceimpl.add(taiKhoan);
//        PhanQuyen phanQuyen = new PhanQuyen();
//        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
//        phanQuyen.setQuyen(Quyen.builder().id(1).build());
//        phanQuyenServiceimpl.add(phanQuyen);
//        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
//    }
//
//    @PostMapping("addKhachHang")
//    public ResponseEntity<?> addKhachHang(Model model,
//                                          @RequestBody TaiKhoan taiKhoan) {
//        serviceimpl.add(taiKhoan);
//        PhanQuyen phanQuyen = new PhanQuyen();
//        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
//        phanQuyen.setQuyen(Quyen.builder().id(3).build());
//        phanQuyenServiceimpl.add(phanQuyen);
//        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
//    }

    //    @PostMapping("addQuanLy")
//    public ResponseEntity<?> addQuanLy(Model model,
//                                          @RequestBody TaiKhoan taiKhoan) {
//        serviceimpl.add(taiKhoan);
//        PhanQuyen phanQuyen = new PhanQuyen();
//        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
//        phanQuyen.setQuyen(Quyen.builder().id(2).build());
//        phanQuyenServiceimpl.add(phanQuyen);
//        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
//    }
    @PostMapping("addQuanLy")
    public ResponseEntity<?> addQuanLy(Model model,
                                       @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();

        var b = thongTinNguoiDungServiceimpl.add(thongTinNguoiDung);
        taiKhoan.setThongTinNguoiDung(b);
        taiKhoan.setAnh(taiKhoanVaThongTin.getFiles().get(0));
//        taiKhoan.setAnh(taiKhoanVaThongTin.getFile().get(0));
        serviceimpl.add(taiKhoan);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(2).build());
        phanQuyenServiceimpl.add(phanQuyen);

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    @PutMapping("updateQuanLy/{id}")
    public ResponseEntity<?> updateQuanLy(@RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin,
                                          @PathVariable("id") Long id) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();


        thongTinNguoiDung.setId(thongTinNguoiDung.getId()); // Assuming id is the ID of the ThongTinNguoiDung to update
        thongTinNguoiDungServiceimpl.update(thongTinNguoiDung.getId(), thongTinNguoiDung); // Update ThongTinNguoiDung
        taiKhoan.setId(id);
        serviceimpl.update(id, taiKhoan);

        // Update or add PhanQuyen (assuming you want to update or add a new PhanQuyen)
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(id).build()); // Use the existing Quan Ly ID
        phanQuyen.setQuyen(Quyen.builder().id(2).build()); // Assuming ID 2 represents "Quan Ly" role
        phanQuyenServiceimpl.add(phanQuyen); // You should have an update method for PhanQuyen

        return ResponseEntity.ok("Update successful"); // You can return a success message or other appropriate response.
    }

    @PostMapping("addNhanVien")
    public ResponseEntity<?> addNhanVien(Model model,
                                         @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();
        Long list = taiKhoanRepository.count();
        taiKhoan.setMaTaiKhoan("NV" + (list + 1));
        taiKhoan.setTrangThai(true);
        String employeeName = thongTinNguoiDung.getTen(); // Replace this with the actual name
        String generatedPassword = generatePasswordFromName(employeeName);
        taiKhoan.setPassword(generatedPassword);
        var b = thongTinNguoiDungServiceimpl.add(thongTinNguoiDung);
        taiKhoan.setThongTinNguoiDung(b);
        taiKhoan.setAnh(taiKhoanVaThongTin.getFiles().get(0));
        serviceimpl.add(taiKhoan);
        DiaChi diaChi = new DiaChi();
        diaChi.setTen(b.getTen());
        diaChi.setSdt(b.getSdt());
        diaChi.setThongTinNguoiDung(b);
        diaChi.setTrangThai(0);
        diaChi.setDiaChiCuThe(taiKhoanVaThongTin.getDiaChiCuThe());
        diaChi.setTinhThanhPho(taiKhoanVaThongTin.getTinhThanhPho());
        diaChi.setQuanHuyen(taiKhoanVaThongTin.getQuanHuyen());
        diaChi.setXaPhuongThiTran(taiKhoanVaThongTin.getXaPhuongThiTran());
        diaChiServiceimpl.add(diaChi);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(1).build());
        phanQuyenServiceimpl.add(phanQuyen);

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }
    private String generatePasswordFromName(String ten) {
        String nameWithoutDiacritics = removeDiacritics(ten);
        String nameWithoutSpaces = nameWithoutDiacritics.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
        int randomNumber = (int) (Math.random() * 10000);
        return nameWithoutSpaces + randomNumber;
    }
    private String removeDiacritics(String input) {
        String normalizedString = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalizedString).replaceAll("");
    }

    @PutMapping("updateNhanVien/{id}")
    public ResponseEntity<?> updateNhanVien(@PathVariable Long id,
                                            @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();

        Optional<ThongTinNguoiDung> optionalThongTinNguoiDung = Optional.ofNullable(thongTinNguoiDungServiceimpl.add(thongTinNguoiDung));

        if (optionalThongTinNguoiDung.isPresent()) {
            ThongTinNguoiDung b = optionalThongTinNguoiDung.get();

            taiKhoan.setThongTinNguoiDung(b);
            taiKhoan.setTrangThai(true);
            taiKhoan.setAnh(taiKhoanVaThongTin.getFiles().get(0));
            serviceimpl.update(id, taiKhoan);

            DiaChi diaChi = new DiaChi();
            diaChi.setTen(b.getTen());
            diaChi.setSdt(b.getSdt());
            diaChi.setThongTinNguoiDung(b);
            diaChi.setTrangThai(0);
            diaChi.setDiaChiCuThe(taiKhoanVaThongTin.getDiaChiCuThe());
            diaChi.setTinhThanhPho(taiKhoanVaThongTin.getTinhThanhPho());
            diaChi.setQuanHuyen(taiKhoanVaThongTin.getQuanHuyen());
            diaChi.setXaPhuongThiTran(taiKhoanVaThongTin.getXaPhuongThiTran());
            diaChiServiceimpl.update(diaChi);

            PhanQuyen phanQuyen = new PhanQuyen();
            phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
            phanQuyen.setQuyen(Quyen.builder().id(1).build());
            phanQuyenServiceimpl.update(id, phanQuyen);

            return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy thông tin người dùng");
        }
    }




    @PostMapping("addKhachHang")
    public ResponseEntity<?> addKhachHang(Model model,
                                          @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {

        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();

        var b = thongTinNguoiDungServiceimpl.add(thongTinNguoiDung);
        taiKhoan.setThongTinNguoiDung(b);

        serviceimpl.add(taiKhoan);
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(taiKhoan.getId()).build());
        phanQuyen.setQuyen(Quyen.builder().id(3).build());
        phanQuyenServiceimpl.add(phanQuyen);

        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    @PutMapping("updateKhachHang/{id}")
    public ResponseEntity<?> updateKhacHang(@RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin,
                                            @PathVariable("id") Long id) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();


        thongTinNguoiDung.setId(thongTinNguoiDung.getId()); // Assuming id is the ID of the ThongTinNguoiDung to update
        thongTinNguoiDungServiceimpl.update(thongTinNguoiDung.getId(), thongTinNguoiDung); // Update ThongTinNguoiDung
        taiKhoan.setId(id);
        serviceimpl.update(id, taiKhoan);

        // Update or add PhanQuyen (assuming you want to update or add a new PhanQuyen)
        PhanQuyen phanQuyen = new PhanQuyen();
        phanQuyen.setTaiKhoan(TaiKhoan.builder().id(id).build()); // Use the existing Quan Ly ID
        phanQuyen.setQuyen(Quyen.builder().id(3).build()); // Assuming ID 2 represents "Quan Ly" role
        phanQuyenServiceimpl.add(phanQuyen); // You should have an update method for PhanQuyen

        return ResponseEntity.ok("Update successful"); // You can return a success message or other appropriate response.
    }

    @DeleteMapping("delete")
    public String delete(Model model,
                         @PathVariable("id") Long id) {
        serviceimpl.delete(id);
        return "OK";
    }

    @GetMapping("index/{id}")
    public ResponseEntity<?> detail(Model model,
                                    @PathVariable("id") Long id) {

        return ResponseEntity.ok(serviceimpl.getOne(id));
    }
//    @GetMapping("detail_tt/{id}")
//    public ResponseEntity<?> detailTT(@PathVariable("id") Long id) {
//
//        return ResponseEntity.ok(serviceimpl.getAllTaiKhoan(id));
//    }

//    @PutMapping("update/{id}")
//    public ResponseEntity<?> update(Model model,
//                                    @PathVariable("id") Long id,
//                                    @RequestBody TaiKhoan taiKhoan) {
//
//        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
//    }

//    @PutMapping("updateQuanLy/{id}")
//    public ResponseEntity<?> updateQuanLy(Model model,
//                                          @PathVariable("id") Long id,
//                                          @RequestBody TaiKhoan taiKhoan) {
//
//        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
//    }

//    @PutMapping("updateNhanVien/{id}")
//    public ResponseEntity<?> updateNhanVien(Model model,
//                                            @PathVariable("id") Long id,
//                                            @RequestBody TaiKhoan taiKhoan) {
//
//        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
//    }
//
//    @PutMapping("updateKhacHang/{id}")
//    public ResponseEntity<?> updateKhachHang(Model model,
//                                             @PathVariable("id") Long id,
//                                             @RequestBody TaiKhoan taiKhoan) {
//
//        return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
//    }

    //    @GetMapping("export")
//    public void exportToExcel(HttpServletResponse response) throws IOException {
//        response.setContentType("application/octet-stream");
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//        String currentDateTime = dateFormatter.format(new java.util.Date());
//
//        String headerKey = "Content-Disposition";
//        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
//        response.setHeader(headerKey, headerValue);
//
//        List listTK = taiKhoanServiceimpl.getAll();
//
//        TaiKhoanExport excelExporter = new TaiKhoanExport(listTK);
//
//        excelExporter.export(response);
//    }
    @PutMapping("updatett/{id}")
    public ResponseEntity<?> updatett(Model model,
                                      @PathVariable("id") Long id,
                                      @RequestBody Map<String, Boolean> trangThaiData) {
        Boolean newTrangThai = trangThaiData.get("trangThai");
        TaiKhoan taiKhoan = serviceimpl.getOne(id);
        taiKhoan.setTrangThai(newTrangThai);
        return ResponseEntity.ok(serviceimpl.thayDoiTrangThai(id, taiKhoan));
    }

    @GetMapping("nhan-vien-quyen-1")
    public List<TaiKhoan> getNhanVienByQuyenId1() {

        return serviceimpl.getNhanVienByQuyenId1();
    }

    @GetMapping("nhan-vien-quyen-2")
    public List<TaiKhoan> getNhanVienByQuyenId2() {

        return serviceimpl.getNhanVienByQuyenId2();
    }
    @GetMapping("nhanviendetail/{id}")
    public List<Object[]> getDesiredInformation(@PathVariable("id") Long id) {

        return taiKhoanRepository.findByIdAll(id);
    }
    @GetMapping("/nhan-vien-quyen-3")
    public List<TaiKhoan> getNhanVienByQuyenId3() {
        return
                serviceimpl.getNhanVienByQuyenId3();
    }

    @GetMapping("nhan-vien-quyen-4")
    public List<TaiKhoan> getNhanVienByQuyenId4() {

        return serviceimpl.getNhanVienByQuyenId4();
    }
}
