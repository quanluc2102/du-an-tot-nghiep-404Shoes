package com.example.datn404shoes.service.serviceimpl;


//import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.helper.KichThuocMauSacExcelSave;
import com.example.datn404shoes.repository.KichThuocMauSacRepository;
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
    public void add(KichThuocMauSac kichThuoc) {
        kichThuocMauSacRepository.save(kichThuoc);
    }

    @Override
    public void delete(Long id) {
        kichThuocMauSacRepository.deleteById(id);
    }

    @Override
    public void update(KichThuocMauSac kichThuocMauSac) {
        KichThuocMauSac kichThuocMauSac1 = kichThuocMauSacRepository.findById(kichThuocMauSac.getId()).get();
        kichThuocMauSac1.setTrangThai(kichThuocMauSac.getTrangThai());
        kichThuocMauSac1.setSoLuong(kichThuocMauSac.getSoLuong());
        kichThuocMauSac1.setMauSac(kichThuocMauSac.getMauSac());
        kichThuocMauSac1.setSanPham(kichThuocMauSac.getSanPham());
        kichThuocMauSac1.setKichThuoc(kichThuocMauSac.getKichThuoc());
        this.kichThuocMauSacRepository.save(kichThuocMauSac1);
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
