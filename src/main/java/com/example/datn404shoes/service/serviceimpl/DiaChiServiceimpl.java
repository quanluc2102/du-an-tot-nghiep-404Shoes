package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.DiaChiResponsitory;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DiaChiServiceimpl implements DiaChiService {

    @Autowired
    private DiaChiResponsitory responsitory;
    @Autowired
    private ThongTinNguoiDungRespository  thongTinNguoiDungRespository;
    @Override
    public void add(DiaChi diaChi) {
        diaChi.setNgayCapNhat(Date.valueOf(LocalDate.now()));
            responsitory.saveAndFlush(diaChi);
    }

    @Override
    public List<DiaChi> getAll() {
        return responsitory.findAll();
    }

    @Override
    public List<DiaChi> getAllByIdTTND(Long id) {
        return responsitory.findDiaChiByThongTinNguoiDungId(id);
    }

    @Override
    public void update(DiaChi diaChi) {
        Optional<DiaChi> existingDiaChiOptional =responsitory.findById(diaChi.getId());

        if (existingDiaChiOptional.isPresent()) {
            DiaChi existingDiaChi = existingDiaChiOptional.get();
            existingDiaChi.setTen(diaChi.getTen());
            existingDiaChi.setSdt(diaChi.getSdt());
            existingDiaChi.setTrangThai(diaChi.getTrangThai());
            existingDiaChi.setDiaChiCuThe(diaChi.getDiaChiCuThe());
            existingDiaChi.setTinhThanhPho(diaChi.getTinhThanhPho());
            existingDiaChi.setQuanHuyen(diaChi.getQuanHuyen());
            existingDiaChi.setXaPhuongThiTran(diaChi.getXaPhuongThiTran());

            // Assuming diaChiRepository.save() persists the changes
            responsitory.save(existingDiaChi);
        }
    }
    @Override
    public void updateOrAdd(DiaChi diaChi) {
        responsitory.save(diaChi);
    }

//    @Override
//    public void addDC(DiaChi diaChi, ThongTinNguoiDung thongTinNguoiDung) {
//        // Thêm địa chỉ mới
//        DiaChi savedDiaChi = responsitory.save(diaChi);
//
//        // Cập nhật thông tin người dùng
//        thongTinNguoiDungRespository.updateThongTinNguoiDung(diaChi.getId(), thongTinNguoiDung);
//
//
//    }


    @Override
    public void updateDC(DiaChi diaChi, Long thongTinNguoiDungId) {
        // Cập nhật địa chỉ
        Optional<DiaChi> existingDiaChi = responsitory.findById(diaChi.getId());
        if (existingDiaChi.isPresent()) {
            responsitory.save(diaChi);
        } else {
            // Địa chỉ không tồn tại, có thể xử lý tùy thuộc vào yêu cầu của bạn.
        }

        // Cập nhật thông tin người dùng
        Optional<ThongTinNguoiDung> existingThongTinNguoiDung = thongTinNguoiDungRespository.findById(thongTinNguoiDungId);
        if (existingThongTinNguoiDung.isPresent()) {
            ThongTinNguoiDung thongTinNguoiDung = existingThongTinNguoiDung.get();

            // Không thực hiện cập nhật thông tin người dùng

            thongTinNguoiDungRespository.save(thongTinNguoiDung);
        } else {
            // Thông tin người dùng không tồn tại, có thể xử lý tùy thuộc vào yêu cầu của bạn.
        }
    }




    public Optional<DiaChi> findByThongTinNguoiDungId(long id) {

        return responsitory.findById(id);
    }
}
