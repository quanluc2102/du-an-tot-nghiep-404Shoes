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
    @Query(value = "select sp.id,sp.ma_san_pham AS maSanPham,sp.anh_bia AS anhBia,sp.danh_muc AS danhMuc,dm.ten AS tenDanhMuc,sp.mo_ta AS moTa,sp.ten,sp.thuong_hieu AS thuongHieu,th.ten AS tenThuongHieu,sp.xuat_xu AS xuatXU,xx.ten AS tenXuatXu,MIN(spct.don_gia) AS min ,MAX(spct.don_gia) AS max,COALESCE(SUM(hdct.so_luong), 0) AS soLuongDaBan from san_pham sp \n" +
            "LEFT join san_pham_chi_tiet spct on sp.id=spct.san_pham_id\n" +
            "LEFT join hoa_don_chi_tiet hdct on hdct.san_pham_chi_tiet_id=spct.id\n" +
            "LEFT join danh_muc dm on dm.id=sp.danh_muc\n" +
            "LEFT join xuat_xu xx on xx.id=sp.xuat_xu\n" +
            "LEFT join thuong_hieu th on th.id=sp.thuong_hieu\n" +
            "GROUP BY sp.id,sp.ma_san_pham,sp.anh_bia,sp.danh_muc,sp.mo_ta,sp.ten,sp.thuong_hieu,sp.trang_thai,sp.xuat_xu,dm.ten,xx.ten,th.ten\n" +
            "order by SUM(hdct.so_luong) desc",nativeQuery = true)
    Page<SanPhamUserCustom> findAllKhoangGia(Pageable pageable);

}
