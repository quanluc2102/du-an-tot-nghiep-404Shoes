package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.ThongTinNguoiDungService;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThongTinNguoiDungServiceimpl implements ThongTinNguoiDungService {
 @Autowired
 private ThongTinNguoiDungRespository respository;
    @Override
    public List<ThongTinNguoiDung> getAll() {
        return respository.findAll();
    }

    @Override
    public Page<ThongTinNguoiDung> getAllPhanTrang(Pageable pageable) {
        return respository.findAll(pageable);
    }

    @Override
    public ThongTinNguoiDung add(ThongTinNguoiDung thongTin) {
        thongTin.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        return respository.saveAndFlush(thongTin);
    }

    @Override
    public void delete(Long id) {
           respository.deleteById(id);
    }

    @Override
    public ThongTinNguoiDung getOne(Long id) {
        return respository.findById(id).get();
    }

    @Override
    public ThongTinNguoiDung update(Long id, ThongTinNguoiDung thongTinNguoiDung) {
        ThongTinNguoiDung a = getOne(id);
        a.setTen(thongTinNguoiDung.getTen());
//        a.setDiaChi(thongTinNguoiDung.getDiaChi());
        a.setSdt(thongTinNguoiDung.getSdt());
//        a.setCCCD(thongTinNguoiDung.getCCCD());
        a.setGioiTinh(thongTinNguoiDung.getGioiTinh());
        a.setNgaySinh(thongTinNguoiDung.getNgaySinh());
        a.setNgayCapNhat(thongTinNguoiDung.getNgayCapNhat());
        respository.save(a);
        return a;
    }

    @Override

    public ThongTinNguoiDung saveThongTinNguoiDung(ThongTinNguoiDung thongTinNguoiDung) {
        // Kiểm tra nếu ngày sinh null hoặc không hợp lệ thì sử dụng ngày mặc định
//        if (thongTinNguoiDung.getNgaySinh() == null) {
//            LocalDate defaultNgaySinh = LocalDate.of(2000, 12, 20);
//            thongTinNguoiDung.setNgaySinh(Date.valueOf(defaultNgaySinh));
//        }
//
//     else {
//            // Ngày sinh hợp lệ, không cần thay đổi
//            // Bạn cũng có thể thêm điều kiện kiểm tra ngày sinh có hợp lệ không ở đây
//        }
//
//        System.out.println("NgaySinh trước khi lưu: " + thongTinNguoiDung.getNgaySinh());

        // Set ngày cập nhật là ngày hiện tại
        thongTinNguoiDung.setNgayCapNhat(Date.valueOf(LocalDate.now()));

        String sdt = thongTinNguoiDung.getSdt();

        if (StringUtils.isNotBlank(sdt) && sdt.length() > 11) {
            thongTinNguoiDung.setSdt(sdt.substring(0, 11));
        }
        System.out.println("Giá trị sdt sau khi cắt: " + thongTinNguoiDung.getSdt());

        // Save the entity
        return respository.saveAndFlush(thongTinNguoiDung);
    }

    @Override
    public ThongTinNguoiDung findById(long id) {
        Optional<ThongTinNguoiDung> optionalThongTinNguoiDung = respository.findById(id);

        return optionalThongTinNguoiDung.orElse(null);
    }

}
