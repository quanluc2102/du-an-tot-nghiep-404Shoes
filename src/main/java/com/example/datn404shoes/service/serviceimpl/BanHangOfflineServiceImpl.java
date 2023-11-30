package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.repository.PhanQuyenRepository;
import com.example.datn404shoes.repository.TaiKhoanRepository;
import com.example.datn404shoes.repository.TaiKhoanResponsitory;
import com.example.datn404shoes.service.BanHangOfflineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BanHangOfflineServiceImpl implements BanHangOfflineService {

    private final KhuyenMaiRepository khuyenMaiRepository;

    private final TaiKhoanResponsitory taiKhoanResponsitory;

    private final TaiKhoanRepository taiKhoanRepository;
    private PhanQuyenRepository phanQuyenRepository;

    @Autowired
    public BanHangOfflineServiceImpl(KhuyenMaiRepository khuyenMaiRepository, TaiKhoanResponsitory taiKhoanResponsitory, TaiKhoanRepository taiKhoanRepository){
        this.taiKhoanResponsitory = taiKhoanResponsitory;
        this.khuyenMaiRepository = khuyenMaiRepository;
        this.taiKhoanRepository = taiKhoanRepository;
    }

    @Override
    public List<KhuyenMai> danhsachKM() {
        return khuyenMaiRepository.getAllKhuyenMai();
    }

    @Override
    public KhuyenMai getOneByMa(String ma) {
        return khuyenMaiRepository.getOneKmByMa(ma);
    }

    @Override
    public List<PhanQuyen> getKH(Long id) {
        return phanQuyenRepository.findPhanQuyenByQuyenId(id);
    }

}
