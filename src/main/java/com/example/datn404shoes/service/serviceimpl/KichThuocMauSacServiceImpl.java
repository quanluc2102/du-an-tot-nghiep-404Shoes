package com.example.datn404shoes.service.serviceimpl;


//import com.example.datn404shoes.entity.KichThuocMauSac;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.KichThuocMauSacExcelSave;
import com.example.datn404shoes.repository.KichThuocMauSacRepository;
import com.example.datn404shoes.request.KichThuocMauSacReQuest;
import com.example.datn404shoes.service.KichThuocMauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class KichThuocMauSacServiceImpl implements KichThuocMauSacService {

    @Autowired
    KichThuocMauSacRepository kichThuocMauSacRepository;

    @Autowired
    private KichThuocMauSacExcelSave excelSave;

    @Override
    public KichThuocMauSac add(KichThuocMauSac kichThuocMauSac) {
        kichThuocMauSacRepository.save(kichThuocMauSac);
        return kichThuocMauSac;
    }

    @Override
    public void delete(Long id) {
        kichThuocMauSacRepository.deleteById(id);
    }

    @Override
    public KichThuocMauSac update(Long idud, KichThuocMauSacReQuest kichThuocMauSacReQuest) {
        KichThuocMauSac kichThuocMauSac1 = kichThuocMauSacRepository.findById(idud).get();
        kichThuocMauSac1.setTrangThai(kichThuocMauSacReQuest.getTrangThai());
//        kichThuocMauSac1.setSoLuong(kichThuocMauSacReQuest.getSoLuong());
        kichThuocMauSac1.setMauSac(MauSac.builder().id(kichThuocMauSacReQuest.getMauSacId()).build());
//        kichThuocMauSac1.setSanPham(SanPham.builder().id(kichThuocMauSacReQuest.getSanPhamId()).build());
        kichThuocMauSac1.setKichThuoc(KichThuoc.builder().id(kichThuocMauSacReQuest.getKichThuocId()).build());
        this.kichThuocMauSacRepository.save(kichThuocMauSac1);
        return kichThuocMauSac1;
    }

    @Override
    public KichThuocMauSac detail(Long id) {
        return kichThuocMauSacRepository.findById(id).get();
    }

    @Override
    public KichThuocMauSac findOne(Long id) {
        return kichThuocMauSacRepository.findById(id).get();
    }

    @Override
    public List<KichThuocMauSac> findAll() {
        return kichThuocMauSacRepository.findAll();
    }

    @Override
    public void imPortExcel(MultipartFile file) {
        try {
            List<KichThuocMauSac> importEX = excelSave.excelImport(file.getInputStream());
            for (KichThuocMauSac kichThuocMauSac : importEX) {
                kichThuocMauSacRepository.save(kichThuocMauSac);
                kichThuocMauSac.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
        {

        }
    }
}
