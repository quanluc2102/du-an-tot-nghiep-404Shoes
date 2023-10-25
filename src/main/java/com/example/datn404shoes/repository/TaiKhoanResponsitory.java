package com.example.datn404shoes.repository;


//import com.poly.duanbangiay.entity.TaiKhoan;
import com.example.datn404shoes.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanResponsitory extends JpaRepository<TaiKhoan,Long> {

    @Query("SELECT tk FROM TaiKhoan tk " +
            "INNER JOIN PhanQuyen pq ON tk.id = pq.taiKhoan.id " +
            "INNER JOIN Quyen q ON pq.quyen.id = q.id " +
            "WHERE q.id = 1")
    List<TaiKhoan> findNhanVienByQuyenId1();

    @Query("SELECT tk FROM TaiKhoan tk " +
            "INNER JOIN PhanQuyen pq ON tk.id = pq.taiKhoan.id " +
            "INNER JOIN Quyen q ON pq.quyen.id = q.id " +
            "WHERE q.id = 2")
    List<TaiKhoan> findNhanVienByQuyenId2();

    @Query("SELECT tk FROM TaiKhoan tk " +
            "INNER JOIN PhanQuyen pq ON tk.id = pq.taiKhoan.id " +
            "INNER JOIN Quyen q ON pq.quyen.id = q.id " +
            "WHERE q.id = 3")
    List<TaiKhoan> findNhanVienByQuyenId3();

    @Query("SELECT tk FROM TaiKhoan tk " +
            "INNER JOIN PhanQuyen pq ON tk.id = pq.taiKhoan.id " +
            "INNER JOIN Quyen q ON pq.quyen.id = q.id " +
            "WHERE q.id = 4")
    List<TaiKhoan> findNhanVienByQuyenId4();

}
