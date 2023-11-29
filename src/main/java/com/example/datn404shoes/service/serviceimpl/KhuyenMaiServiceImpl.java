package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.helper.KhuyenMaiExcelSave;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    public Page<KhuyenMai> getAll(Pageable pageable, String searchValue, String filterType) {
        Specification<KhuyenMai> specification = Specification.where(null);

        if (filterType != null && !filterType.isEmpty()) {
            if ("percent".equals(filterType)) {
                specification = specification.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("kieuKhuyenMai"), 0)
                );
            } else if ("money".equals(filterType)) {
                specification = specification.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("kieuKhuyenMai"), 1)
                );
            }
        }

        if (searchValue != null && !searchValue.isEmpty()) {
            String likeSearchValue = "%" + searchValue + "%";
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.or(
                            criteriaBuilder.like(root.get("ma"), likeSearchValue),
                            criteriaBuilder.like(root.get("ten"), likeSearchValue),
                            criteriaBuilder.like(root.get("moTa"), likeSearchValue),
                            criteriaBuilder.like(root.get("dieuKien"), likeSearchValue),
                            criteriaBuilder.like(root.get("giamGia").as(String.class), likeSearchValue)
                    )
            );
        }

        return khuyenMaiRepository.findAll(specification, pageable);
    }

    @Override
    public List<KhuyenMai> getAllNoPage() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        return khuyenMaiRepository.findAll(sort);
    }

    @Override
//    public KhuyenMai add(KhuyenMai khuyenMai) {
//       khuyenMai.setBatDau(Date.valueOf(LocalDate.now()));
//       khuyenMai.setKetThuc(Date.valueOf(LocalDate.now()));
//       return khuyenMaiRepository.save(khuyenMai);
//    }
    public KhuyenMai add(KhuyenMai khuyenMai) {
        Timestamp ngayBatDau = (khuyenMai.getBatDau());
        Timestamp ngayKetThuc = (khuyenMai.getKetThuc());
        khuyenMai.setBatDau(ngayBatDau);
        khuyenMai.setKetThuc(ngayKetThuc);
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public void delete(Long id) {

        KhuyenMai a = khuyenMaiRepository.findById(id).get();
        if(a.getKieuKhuyenMai()==1){
            a.setKieuKhuyenMai(0);
        }else{
            a.setKieuKhuyenMai(1);
        }
        khuyenMaiRepository.flush();
    }

    @Override
    public KhuyenMai update(Long id, KhuyenMai km) {
        KhuyenMai khuyenMai = findOne(id);
        khuyenMai.setMa(km.getMa());
        khuyenMai.setTen(km.getTen());
        khuyenMai.setMoTa(km.getMoTa());
        Timestamp ngayBatDau = (khuyenMai.getBatDau());
        Timestamp ngayKetThuc = (khuyenMai.getKetThuc());
        khuyenMai.setBatDau(ngayBatDau);
        khuyenMai.setKetThuc(ngayKetThuc);
        khuyenMai.setGiamGia(km.getGiamGia());
        khuyenMai.setKieuKhuyenMai(km.getKieuKhuyenMai());
        khuyenMai.setDieuKien(km.getDieuKien());
        khuyenMai.setSoLuong(km.getSoLuong());
        khuyenMai.setTrangThai(km.getTrangThai());
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
    public Page<KhuyenMai> findAll(Pageable pageable) {
        return khuyenMaiRepository.findAll(pageable);
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

    @Override
    public KhuyenMai thayDoiTrangThai(Long id, KhuyenMai khuyenMai) {
        KhuyenMai khuyenMai1 = khuyenMaiRepository.findById(id).get();

        khuyenMai1.setTrangThai(khuyenMai.getTrangThai());
        return khuyenMaiRepository.save(khuyenMai1);

    }


    @Override
    public boolean isKhuyenMaiNameUnique(String name) {
        return khuyenMaiRepository.existsKhuyenMaiByTen(name);
    }

    @Override
    public List<KhuyenMai> getKMTT() {
        return khuyenMaiRepository.findActivePromotions();
    }
}
