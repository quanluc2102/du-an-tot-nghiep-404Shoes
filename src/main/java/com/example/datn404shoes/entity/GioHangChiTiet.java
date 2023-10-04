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
    private GioHang gh;
    @ManyToOne
    @JoinColumn(name = "san_pham_id",
    referencedColumnName = "id",
    nullable = true)
    private SanPham sp;
    @Column(name = "so_luong")
    private int soLuong;
}
