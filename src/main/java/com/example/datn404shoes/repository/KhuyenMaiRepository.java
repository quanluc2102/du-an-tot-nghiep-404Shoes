package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.KhuyenMai;
import com.example.datn404shoes.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,Long> {
    boolean existsKhuyenMaiByTen(String name);

    Page<KhuyenMai> findAll(Specification<KhuyenMai> specification, Pageable pageable);
}
