package com.example.datn404shoes.repository;


//import com.poly.duanbangiay.entity.TaiKhoan;
import com.example.datn404shoes.entity.TaiKhoan;
//import com.example.datn404shoes.request.TaiKhoanCustome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    TaiKhoan findByEmail(String email);


//    @Query(value = "SELECT * FROM tai_khoan WHERE thong_tin_nguoi_dung_id = id;",nativeQuery = true)
//    public List<TaiKhoan> getAllTaiKhoan(@Param("id") long id);

    @Query("SELECT tk.anh,ttn.CCCD,ttn.ten,ttn.ngaySinh,ttn.gioiTinh,dc.tinhThanhPho,dc.quanHuyen,dc.xaPhuongThiTran,dc.diaChiCuThe,ttn.sdt,tk.email,tk.password " +
            "FROM ThongTinNguoiDung ttn " +
            "JOIN DiaChi dc ON ttn.id = dc.thongTinNguoiDung.id " +
            "JOIN TaiKhoan tk ON ttn.id = tk.thongTinNguoiDung.id " +
            "WHERE tk.id = :id")
    List<Object[]> findUserDetailsById(@Param("id") Long id);

    @Query("SELECT ttn.ten,ttn.ngaySinh,ttn.sdt,tk.email,tk.password " +
            "FROM ThongTinNguoiDung ttn " +
            "JOIN TaiKhoan tk ON ttn.id = tk.thongTinNguoiDung.id " +
            "WHERE tk.id = :id")
    List<Object[]> findUserDetailsKHById(@Param("id") Long id);



}
