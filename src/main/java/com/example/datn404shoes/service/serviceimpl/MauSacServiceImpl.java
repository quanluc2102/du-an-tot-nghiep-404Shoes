package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.helper.MauSacExcelSave;
import com.example.datn404shoes.repository.MauSacRepository;
import com.example.datn404shoes.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    MauSacRepository mauSacRepository;

    @Override
    public void add(MauSac mauSac) {
        mauSacRepository.save(mauSac);
    }

    @Override
    public void delete(Long id) {
        mauSacRepository.deleteById(id);
    }

    @Override
    public void update(MauSac mauSac) {
        MauSac mauSac1 = mauSacRepository.findById(mauSac.getId()).get();
        mauSac1.setGiaTri(mauSac.getGiaTri());
        mauSac1.setTen(mauSac.getTen());
        mauSac1.setTrangThai(mauSac.getTrangThai());
        this.mauSacRepository.save(mauSac1);

    }

    @Override
    public MauSac detail(Long id) {
        return mauSacRepository.findById(id).get();
    }

    @Override
    public MauSac findOne(Long id) {
        return mauSacRepository.findById(id).get();
    }

    @Override
    public List<MauSac> findAll() {
        return mauSacRepository.findAll();
    }

    @Override
    public void imPortExcel(MultipartFile file) {
        try {
            List<MauSac> importEX = MauSacExcelSave.excelImport(file.getInputStream());
            for (MauSac mauSac : importEX) {
                add(mauSac);
                mauSac.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
        {

        }
    }
}
