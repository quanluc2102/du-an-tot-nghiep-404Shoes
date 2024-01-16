package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.entity.TaiKhoan;
//import com.example.datn404shoes.helper.TaiKhoanExcelSave;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;
import java.util.Random;
import java.util.Base64;
@Service
public class TaiKhoanServiceimpl implements TaiKhoanService {
    @Autowired
    private TaiKhoanResponsitory responsitory;
    @Autowired
    private TaiKhoanRepository taiKhoanResponsitory;


//    @Override
//    public void importExcel(MultipartFile file) {
//        try {
//            List<TaiKhoan> tutorials = TaiKhoanExcelSave.excelToTutorials(file.getInputStream());
//            for(TaiKhoan a :tutorials){
//                responsitory.save(a);
//                a.toString();
//            }
//            responsitory.flush();
//        } catch (IOException e) {
//            throw new RuntimeException("fail to store excel data: " + e.getMessage());
//        }
//    }

    @Override
    public TaiKhoan add(TaiKhoan taiKhoan) {
        taiKhoan.setNgayTao(Date.valueOf(LocalDate.now()));
        taiKhoan.setNgayCapNhat(Date.valueOf(LocalDate.now()));
//        String randomPassword = generateRandomPassword();
//
//        taiKhoan.setPassword(randomPassword);

        responsitory.save(taiKhoan);
        return taiKhoan;
    }
    private String generateRandomPassword() {
        // Sử dụng Random để sinh mật khẩu ngẫu nhiên
        Random random = new Random();
        byte[] randomBytes = new byte[16];
        random.nextBytes(randomBytes);

        // Chuyển đổi byte array thành chuỗi Base64
        return Base64.getEncoder().encodeToString(randomBytes);
    }

    @Override
    public void delete(Long id) {
        responsitory.deleteById(id);
    }

    @Override
    public TaiKhoan update(Long id, TaiKhoan taiKhoan) {
        TaiKhoan tk = getOne(id);
//        tk.setUsername(taiKhoan.getUsername());
        tk.setEmail(taiKhoan.getEmail());
        tk.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        tk.setPassword(taiKhoan.getPassword());
        tk.setAnh(taiKhoan.getAnh());
        tk.setTrangThai(taiKhoan.isTrangThai());
        tk.setThongTinNguoiDung(taiKhoan.getThongTinNguoiDung());
        responsitory.save(tk);
        return tk;
    }
    @Override
    public void update1(Long id, TaiKhoan taiKhoan) {
        Optional<TaiKhoan> existingTaiKhoanOptional = responsitory.findById(id);

        if (existingTaiKhoanOptional.isPresent()) {
            TaiKhoan existingTaiKhoan = existingTaiKhoanOptional.get();

            // Kiểm tra và cập nhật trường anh
            if (taiKhoan.getAnh() != null && !taiKhoan.getAnh().isEmpty()) {
                existingTaiKhoan.setAnh(taiKhoan.getAnh());
            }

            // Cập nhật các trường cần thiết của existingTaiKhoan với giá trị mới từ taiKhoan
            existingTaiKhoan.setTrangThai(taiKhoan.isTrangThai());
            existingTaiKhoan.setThongTinNguoiDung(taiKhoan.getThongTinNguoiDung());

            // Lưu lại thay đổi
            responsitory.save(existingTaiKhoan);
        }
    }
    @Override
    public List<TaiKhoan> getAll() {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return responsitory.findAll(sort);
    }

    @Override
    public List<TaiKhoan> getAllNoPage() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        return responsitory.findAll(sort);
    }

    @Override
    public TaiKhoan getOne(Long id) {
        return responsitory.findById(id).get();
    }

    @Override
    public TaiKhoan getOneByEmail(String email) {
        return responsitory.findByEmail(email);
    }

    @Override
    public Page<TaiKhoan> findAll(Pageable pageable) {
        return responsitory.findAll(pageable);
    }

    @Override
    public TaiKhoan thayDoiTrangThai(Long id, TaiKhoan taiKhoan) {
        TaiKhoan taiKhoan1 = responsitory.findById(id).get();
        taiKhoan1.setMaTaiKhoan(taiKhoan.getMaTaiKhoan());
        taiKhoan1.setEmail(taiKhoan.getEmail());
        taiKhoan1.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        taiKhoan1.setPassword(taiKhoan.getPassword());
        taiKhoan1.setAnh(taiKhoan.getAnh());
        taiKhoan1.setTrangThai(taiKhoan.isTrangThai());
        return responsitory.save(taiKhoan);
    }

    @Override
    public List<TaiKhoan> getNhanVienByQuyenId1() {
        return responsitory.findNhanVienByQuyenId1();
    }

    @Override
    public List<TaiKhoan> getNhanVienByQuyenId2() {
        return responsitory.findNhanVienByQuyenId2();
    }


    @Override
    public List<TaiKhoan> getNhanVienByQuyenId3() {

        return responsitory.findNhanVienByQuyenId3();
    }

    @Override
    public List<TaiKhoan> getNhanVienByQuyenId4() {

        return responsitory.findNhanVienByQuyenId4();
    }

    @Override
    public TaiKhoan getOneBySDT(String sdt) {
        return taiKhoanResponsitory.findByThongTinNguoiDung_Sdt(sdt);
    }




    public Optional<TaiKhoan> findById(Long id) {
        return responsitory.findById(id);
    }
}
