package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonChiTietimpl implements HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;

    @Override
    public List<HoaDonChiTiet> getAllByIdHD(Long idHD) {
        return hoaDonChiTietRepository.findAllByHd_Id(idHD);
    }

    @Override
    public String findAllByHd_MaHoaDonandEmail(String maHoaDon, String email) {
        return hoaDonChiTietRepository.findAllByHd_MaHoaDonandEmail(maHoaDon, email);
    }

    @Override
    public HoaDonChiTiet addNewHDCT(HoaDonChiTiet hoaDonChiTiet) {
        return hoaDonChiTietRepository.save(hoaDonChiTiet);
    }


}
