package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "san_pham_danh_muc")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id", nullable = true)
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "danh_muc_id", referencedColumnName = "id", nullable = true)
    private DanhMuc danhMuc;


}
