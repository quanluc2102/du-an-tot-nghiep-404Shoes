package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.SanPham;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.request.SanPhamUserCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRespository extends JpaRepository<SanPham,Long> {
    @Query(value = "select sp.id,MIN(spct.don_gia),MAX(spct.don_gia),SUM(hdct.so_luong) from san_pham sp join san_pham_chi_tiet spct on sp.id=spct.san_pham_id \n" +
            "join hoa_don_chi_tiet hdct on hdct.san_pham_chi_tiet_id=spct.id\n" +
            "GROUP BY sp.id\n" +
            "order by SUM(hdct.so_luong) desc",nativeQuery = true)
    Page<SanPhamUserCustom> findAllKhoangGia(Pageable pageable);
}
