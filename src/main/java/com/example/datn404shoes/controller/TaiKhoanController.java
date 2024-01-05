package com.example.datn404shoes.controller;


import com.example.datn404shoes.DTO.ForgotPasswordDTO;
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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
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
    @Autowired
    private JavaMailSender javaMailSender;
    private final Path root = Paths.get("frontend/src/img");

    @GetMapping("index")
    public Page<TaiKhoan> index(Model model, Pageable pageable) {
        return serviceimpl.findAll(pageable);
    }
    @GetMapping("index1")
    public List<TaiKhoan> index1(){
        return serviceimpl.getAll();
    }



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
    public ResponseEntity<?> addNhanVien(Model model, @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();
        Long list = taiKhoanRepository.count();
        taiKhoan.setMaTaiKhoan("NV" + (list + 1));
        taiKhoan.setTrangThai(true);
        String employeeName = thongTinNguoiDung.getTen();
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

        // Send an email to the newly added employee
        sendEmail(taiKhoan.getEmail(), "Chào mừng bạn gia nhập gia đình 404Shoes", "Dear " + b.getTen() +
                ".\n\nTôi hy vọng bạn đang có một ngày tốt lành. Chúng tôi muốn thông báo với bạn về việc thêm một thành viên mới vào đội ngũ của chúng tôi."+
                ".\n\nTên nhân viên : " + b.getTen()+
                ".\n\nChức vụ : Nhân viên bán hàng" +
                ".\n\nChúng tôi đã tạo một tài khoản cho bạn , mật khẩu là : " + taiKhoan.getPassword()+
                ".\n\nNếu bạn có bất kỳ câu hỏi hoặc thắc mắc gì , đừng ngần ngại liên hệ với chúng tôi theo Hotline: 0257xxxxx."+
                ".\n\nTrân trọng !" );
        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            javaMailSender.send(message);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            // Handle the exception, you might want to log it or take other actions
        }
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

        Long list = taiKhoanRepository.count();
        taiKhoan.setMaTaiKhoan("KH" + (list + 1));
        var b = thongTinNguoiDungServiceimpl.add(thongTinNguoiDung);
        taiKhoan.setTrangThai(true);
        String employeeName = thongTinNguoiDung.getTen(); // Replace this with the actual name
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
        phanQuyen.setQuyen(quyenServiceimpl.findOne(Long.valueOf(3)));
//        phanQuyen.setQuyen(Quyen.builder().id(3).build());
        phanQuyenServiceimpl.add(phanQuyen);

        // Lưu mật khẩu vào một biến tạm thời
        String matKhau = taiKhoan.getPassword();

// Xóa mật khẩu ngẫu nhiên
        taiKhoan.setPassword("");

// Gửi email
        sendEmail(taiKhoan.getEmail(), "Chào mừng bạn gia nhập gia đình 404Shoes", "Dear " + b.getTen() +
                ".\n\nTôi hy vọng bạn đang có một ngày tốt lành. Chúng tôi muốn thông báo với bạn về việc thêm một thành viên mới vào đội ngũ của chúng tôi."+
                ".\n\nTên khách hàng  : " + b.getTen()+
                ".\n\nChúng tôi đã tạo một tài khoản cho bạn và  mật khẩu đăng nhập  là : " + matKhau +
                ".\n\nNếu bạn có bất kỳ câu hỏi hoặc thắc mắc gì , đừng ngần ngại liên hệ với chúng tôi theo Hotline: 0986xxxxx."+
                ".\n\nTrân trọng !" );

// Tiếp tục xử lý và trả về kết quả
        taiKhoan.setPassword("");
        return ResponseEntity.ok(serviceimpl.add(taiKhoan));
    }
@PutMapping("updateKhachHang/{id}")
public ResponseEntity<?> updateKhachHang(@PathVariable Long id, @RequestBody TaiKhoanVaThongTin taiKhoanVaThongTin) {
        ThongTinNguoiDung thongTinNguoiDung = taiKhoanVaThongTin.getThongTinNguoiDung();
        TaiKhoan taiKhoan = taiKhoanVaThongTin.getTaiKhoan();

        Optional<ThongTinNguoiDung> optionalThongTinNguoiDung = Optional.ofNullable(thongTinNguoiDungServiceimpl.add(thongTinNguoiDung));

        if (optionalThongTinNguoiDung.isPresent()) {
            ThongTinNguoiDung b = optionalThongTinNguoiDung.get();

            taiKhoan.setThongTinNguoiDung(b);
            taiKhoan.setTrangThai(true);
//            taiKhoan.setAnh(taiKhoanVaThongTin.getFiles().get(0));
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
            phanQuyenServiceimpl.add(phanQuyen);
            taiKhoan.setPassword("");
            return ResponseEntity.ok(serviceimpl.update(id, taiKhoan));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy thông tin người dùng");
        }
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

        return taiKhoanRepository.findUserDetailsById(id);
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

    @PostMapping("quenMatKhau")
    public ResponseEntity<?> quenMatKhau(Model model, @RequestBody ForgotPasswordDTO email) {
        // Tìm kiếm tài khoản theo email
        TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(email.getSearchString());

        // Kiểm tra nếu tài khoản không tồn tại
        if (taiKhoan == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy tài khoản với email: " + email);
        }

        // Lấy thông tin người dùng từ tài khoản
        ThongTinNguoiDung thongTinNguoiDung = taiKhoan.getThongTinNguoiDung();

        // Tạo mật khẩu mới
        String generatedPassword = generatePasswordFromName("NewPass");
        taiKhoan.setPassword(generatedPassword);

        // Send an email to the newly added employee
        sendEmail(taiKhoan.getEmail(), "Xin chào", " Xin chào " + thongTinNguoiDung.getTen() +
                ".\n\nChúng tôi vừa nhận được yêu cầu khôi phục mật khẩu của bạn và đã tạo một mật khẩu mới cho tài khoản của bạn. Dưới đây là thông tin chi tiết:"+
                ".\n\nTên khách hàng : " + thongTinNguoiDung.getTen()+
                ".\n\nMật khẩu mới   : " + generatedPassword+
                ".\n\nChúng tôi khuyến khích bạn đổi mật khẩu ngay sau khi đăng nhập để bảo vệ tài khoản của mình."+
                ".\n\nNếu bạn gặp bất kỳ vấn đề nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua Hotline: 0257xxxxx."+
                ".\n\nChân thành cảm ơn và chúc bạn một ngày tốt lành! [404Shoes]" );
        return ResponseEntity.ok(serviceimpl.update(taiKhoan.getId(),taiKhoan));
    }

}
