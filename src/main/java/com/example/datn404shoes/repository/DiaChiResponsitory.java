package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DiaChiResponsitory extends JpaRepository<DiaChi, UUID> {
    @Query(value = "select * from dia_chi dc where dc.thong_tin_nguoi_dung_id = :id",nativeQuery = true)

    Optional<DiaChi> findById(long id);
    List<DiaChi> findDiaChiByThongTinNguoiDungId(long id);

    @Query(value = "select dc.* from dia_chi dc \n" +
            "join tai_khoan tk on tk.thong_tin_nguoi_dung_id=dc.thong_tin_nguoi_dung_id\n" +
            "where tk.id=:id",nativeQuery = true)

    List<DiaChi> getDiaChiByTaiKhoan(long id);

    // Thêm phương thức để tìm kiếm địa chỉ theo id và thongTinNguoiDungId
    Optional<DiaChi> findByIdAndThongTinNguoiDungId(long id, long thongTinNguoiDungId);

    // Thêm phương thức để tìm kiếm địa chỉ theo id và taiKhoanId
//    @Query(value = "select dc.* from dia_chi dc " +
//            "join tai_khoan tk on tk.thong_tin_nguoi_dung_id=dc.thong_tin_nguoi_dung_id " +
//            "where dc.id = :id and tk.id = :taiKhoanId", nativeQuery = true)
//    Optional<DiaChi> findByIdAndTaiKhoanId(@Param("id") long id, @Param("taiKhoanId") long taiKhoanId);
}
