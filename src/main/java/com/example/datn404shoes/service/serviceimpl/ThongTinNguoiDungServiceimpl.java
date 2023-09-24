package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.ThongTinNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ThongTinNguoiDungServiceimpl implements ThongTinNguoiDungService {
    @Autowired
    private ThongTinNguoiDungRespository thongTinNguoiDungRespository;
    @Override
    public ArrayList<ThongTinNguoiDung> getAll() {
        return (ArrayList<ThongTinNguoiDung>) thongTinNguoiDungRespository.findAll();
    }

    @Override
    public void add(ThongTinNguoiDung thongTinNguoiDung) {
        thongTinNguoiDungRespository.saveAndFlush(thongTinNguoiDung);
    }

    @Override
    public void delete(Long id) {
            thongTinNguoiDungRespository.deleteById(id);
    }

    @Override
    public void update(Long id, ThongTinNguoiDung thongTinNguoiDung) {
       Optional<ThongTinNguoiDung> dung = thongTinNguoiDungRespository.findById(id);
       dung.get().setTen(thongTinNguoiDung.getTen());
        dung.get().setDiaChi(thongTinNguoiDung.getDiaChi());
        dung.get().setSdt(thongTinNguoiDung.getSdt());
        dung.get().setNgaySinh(thongTinNguoiDung.getNgaySinh());
        dung.get().setTaiKhoan(thongTinNguoiDung.getTaiKhoan());
        thongTinNguoiDungRespository.flush();

    }

    @Override
    public Optional<ThongTinNguoiDung> detail(Long id) {
        return thongTinNguoiDungRespository.findById(id);
    }
}
