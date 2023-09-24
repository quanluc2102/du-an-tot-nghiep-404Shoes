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
    public void add(KhuyenMai khuyenMai) {
        khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public void delete(Long id) {
        khuyenMaiRepository.deleteById(id);
    }

    @Override
    public void update(Long id, KhuyenMai km) {
        Optional<KhuyenMai>khuyenMai = khuyenMaiRepository.findById(id);
        khuyenMai.get().setTen(km.getTen());
        khuyenMai.get().setMoTa(km.getMoTa());
        khuyenMai.get().setBatDau(km.getBatDau());
        khuyenMai.get().setKetThuc(km.getKetThuc());
        khuyenMai.get().setGiamGia(km.getGiamGia());
        khuyenMai.get().setKieuKhuyenMai(km.getKieuKhuyenMai());
        khuyenMaiRepository.flush();
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
