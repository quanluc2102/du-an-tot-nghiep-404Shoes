package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.DTO.LocDTO;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.repository.SanPhamRespository;
import com.example.datn404shoes.request.SanPhamUserCustom;
import com.example.datn404shoes.service.SanPhamService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class SanPhamServiceimpl implements SanPhamService {
    @Autowired
    SanPhamRespository sanPhamRespository;

    @Override
    public SanPham add(SanPham sp) {
        sp.setNgayTao(Date.valueOf(LocalDate.now()));
        sp.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        return sanPhamRespository.save(sp);
    }

    @Override
    public void delete(Long id) {
        SanPham a = sanPhamRespository.findById(id).get();
        if (a.getTrangThai() == 1) {
            a.setTrangThai(0);
        } else {
            a.setTrangThai(1);
        }
        sanPhamRespository.flush();
    }

    @Override
    public SanPham update(Long id, SanPham sp) {
        SanPham a = sanPhamRespository.findById(id).orElse(null);
        a.setMa(sp.getMa());
        a.setTen(sp.getTen());
        a.setMoTa(sp.getMoTa());
        a.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        sanPhamRespository.save(a);
        return a;
    }

    @Override
    public Page<SanPham> getAllPhanTrang(Pageable pageable) {
        return sanPhamRespository.findAll(pageable);
    }

    @Override
    public Page<SanPham> phanTrangNew(int page) {
        return sanPhamRespository.findAll(PageRequest.of(page,6));
    }

    @Override
    public Page<SanPhamUserCustom> phanTrangUser(int page) {
        return sanPhamRespository.findAllKhoangGia(PageRequest.of(page,6));
    }

    @Override
    public List<SanPhamUserCustom> phanTrangUserFiltered(LocDTO filters) {
//        Pageable pageable = PageRequest.of(page, 10); // 10 là số lượng phần tử trên mỗi trang, bạn có thể thay đổi
        System.out.println("Cái này là danh mục"+filters.getDanhMuc());
        System.out.println("Cái này là danh mục"+filters.getThuongHieu());
        System.out.println("Cái này là danh mục"+filters.getXuatXu());
        System.out.println("Cái này là danh mục"+filters.getKichThuoc());
        System.out.println("Cái này là danh mục"+filters.getMauSac());
        return sanPhamRespository.findAllFilter(
                filters.getDanhMuc(),
                filters.getDanhMuc(),
                filters.getThuongHieu(),
                filters.getThuongHieu(),
                filters.getXuatXu(),
                filters.getXuatXu(),
                filters.getKichThuoc(),
                filters.getKichThuoc(),
                filters.getMauSac(),
                filters.getMauSac(),
                filters.getGiaMin(),
                filters.getGiaMax()
        );
    }

    @Override
    public List<SanPhamUserCustom> searchSanPham(String search) {
        return sanPhamRespository.searchSanPham(search);
    }

    @Override
    public List<SanPham> getAll() {
        Sort sort=Sort.by(Sort.Direction.DESC,"id");
        return sanPhamRespository.findAll(sort);
    }

    @Override
    public SanPham getOne(Long id) {
        return sanPhamRespository.findById(id).orElse(null);
    }

    @Override
    public void chuyenSoLuong(SanPham sp) {
//        if(sp.getSoLuong()<0){
//            sp.setSoLuong(0);
//        }
//        sanPhamRespository.flush();
    }

    @Override
    public void importExcel(MultipartFile file) {
        try {
            List<SanPham> tutorials = SanPhamExcelSave.excelToTutorials(file.getInputStream());
            for (SanPham a : tutorials) {
                sanPhamRespository.save(a);
                a.toString();
            }
            sanPhamRespository.flush();
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }
}
