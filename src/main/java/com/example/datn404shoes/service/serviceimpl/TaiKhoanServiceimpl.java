package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.TaiKhoan;
//import com.example.datn404shoes.helper.TaiKhoanExcelSave;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServiceimpl implements TaiKhoanService {
    @Autowired
    private TaiKhoanResponsitory responsitory;


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
         responsitory.save(taiKhoan);
        return taiKhoan;
    }

    @Override
    public void delete(Long id) {
               responsitory.deleteById(id);
    }

    @Override
    public TaiKhoan update(Long id, TaiKhoan taiKhoan) {
        TaiKhoan tk = getOne(id);
        tk.setUsername(taiKhoan.getUsername());
        tk.setEmail(taiKhoan.getEmail());
        tk.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        tk.setPassword(taiKhoan.getPassword());
        tk.setAnh(taiKhoan.getAnh());
        tk.setTrangThai(taiKhoan.isTrangThai());
       responsitory.save(taiKhoan);
        return tk;
    }

    @Override
    public List<TaiKhoan> getAll() {
        return responsitory.findAll();
    }

    @Override
    public TaiKhoan getOne(Long id) {
        return responsitory.findById(id).get();
    }

    @Override
    public Page<TaiKhoan> findAll(Pageable pageable) {
        return responsitory.findAll(pageable);
    }
}
