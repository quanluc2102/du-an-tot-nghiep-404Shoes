package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.helper.KhuyenMaiExcelSave;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public ArrayList<KhuyenMai> getAll() {
        return (ArrayList<KhuyenMai>) khuyenMaiRepository.findAll();
    }

    @Override
    public KhuyenMai add(KhuyenMai khuyenMai) {
        khuyenMaiRepository.save(khuyenMai);
        return khuyenMai;
    }


    @Override
    public void delete(Long id) {
        khuyenMaiRepository.deleteById(id);
    }

    @Override
    public KhuyenMai update(Long id, KhuyenMai km) {
        KhuyenMai khuyenMai = findOne(id);
        khuyenMai.setTen(km.getTen());
        khuyenMai.setMoTa(km.getMoTa());
        khuyenMai.setBatDau(km.getBatDau());
        khuyenMai.setKetThuc(km.getKetThuc());
        khuyenMai.setGiamGia(km.getGiamGia());
        khuyenMai.setKieuKhuyenMai(km.getKieuKhuyenMai());
        khuyenMaiRepository.save(km);
        return km;
    }


    @Override
    public Optional<KhuyenMai> detail(Long id) {
        return khuyenMaiRepository.findById(id);
    }


    @Override
    public KhuyenMai findOne(Long id) {

        return khuyenMaiRepository.findById(id).get();
    }

    @Override
    public void imPortExcel(MultipartFile file) {
        try {
            List<KhuyenMai> importEX = KhuyenMaiExcelSave.excelImport(file.getInputStream());
            for (KhuyenMai khuyenMai: importEX){
                add(khuyenMai);
                khuyenMai.toString();
            }
        }catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data:" + e.getMessage());
        }
    }
}
