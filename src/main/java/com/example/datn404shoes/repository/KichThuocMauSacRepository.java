package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.KichThuocMauSac;
//import com.poly.duanbangiay.entity.KichThuocMauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KichThuocMauSacRepository extends JpaRepository<KichThuocMauSac,Long> {
}
