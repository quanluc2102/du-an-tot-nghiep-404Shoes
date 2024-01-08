package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.repository.*;
import com.example.datn404shoes.service.BanHangOfflineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BanHangOfflineServiceImpl implements BanHangOfflineService {

    private final KhuyenMaiRepository khuyenMaiRepository;

    private final TaiKhoanResponsitory taiKhoanResponsitory;

    private final TaiKhoanRepository taiKhoanRepository;

    private PhanQuyenRepository phanQuyenRepository;

    private final BanHangOfflineRepository banHangOfflineRepository;

    private final HoaDonChiTietRepository hoaDonChiTietRepository;

    private final HoaDonRepository hoaDonRepository;

    @Autowired
    public BanHangOfflineServiceImpl(KhuyenMaiRepository khuyenMaiRepository,
                                     TaiKhoanResponsitory taiKhoanResponsitory,
                                     TaiKhoanRepository taiKhoanRepository,
                                     BanHangOfflineRepository banHangOfflineRepository,
                                     HoaDonChiTietRepository hoaDonChiTietRepository,
                                     HoaDonRepository hoaDonRepository){
        this.taiKhoanResponsitory = taiKhoanResponsitory;
        this.khuyenMaiRepository = khuyenMaiRepository;
        this.taiKhoanRepository = taiKhoanRepository;
        this.banHangOfflineRepository = banHangOfflineRepository;
        this.hoaDonChiTietRepository = hoaDonChiTietRepository;
        this.hoaDonRepository = hoaDonRepository;
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

    @Override
    public List<HoaDon> layDanhSachHoaDonCho() {
        List<HoaDon> danhSachHoaDonCho = banHangOfflineRepository.layDanhSachHoaDonCho();
        return danhSachHoaDonCho;
    }

    @Override
    public List<HoaDonChiTiet> layDanhSachHDCT(Long id) {
        List<HoaDonChiTiet> danhSachHDCT = banHangOfflineRepository.layDanhSachHDCTTrongHD(id);
        return danhSachHDCT;
    }

    @Override
    public List<SanPhamChiTiet> layDanhSachSPCT(Long id) {
        List<SanPhamChiTiet> danhSachSP = banHangOfflineRepository.layDanhSachSPCT(id);
        return danhSachSP;
    }

    @Override
    public Boolean deleteHoaDonChiTiet(Long id) {
        try {
            hoaDonChiTietRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteHoaDon(Long id) {
        try {
            hoaDonRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void deleteHDCT(Long id) {
        banHangOfflineRepository.deleteHoaDonChiTiet(id);
    }

}
