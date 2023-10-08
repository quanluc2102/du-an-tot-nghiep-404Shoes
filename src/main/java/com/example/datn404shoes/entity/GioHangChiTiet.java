package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gio_hang_chi_tiet", schema = "dbo", catalog = "ShopShoe")
@Builder
public class GioHangChiTiet {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "gio_hang_id",
    referencedColumnName = "id",
    nullable = false)
    private GioHang gioHangId;
    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id",
    referencedColumnName = "id",
    nullable = true)
    private SanPhamChiTiet sanPhamChiTietId;
    @Column(name = "so_luong")
    private int soLuong;
}
