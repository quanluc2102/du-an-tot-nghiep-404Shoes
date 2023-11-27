package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.KhuyenMai;
import com.example.datn404shoes.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,Long> {
    boolean existsKhuyenMaiByTen(String name);

    Page<KhuyenMai> findAll(Specification<KhuyenMai> specification, Pageable pageable);

    @Query(value = "select km from KhuyenMai km where km.soLuong >= 1 and km.trangThai = 1")
    List<KhuyenMai> getAllKhuyenMai();

    @Query(value = "select km from KhuyenMai km where km.ma =:ma and km.soLuong >= 1 and km.trangThai = 2")
    KhuyenMai getOneKmByMa(String ma);
}
