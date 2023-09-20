package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hoa_don_khuyen_mai")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HoaDonKhuyenMai {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id", nullable = true)
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "khuyen_mai_id", referencedColumnName = "id", nullable = true)
    private KhuyenMai khuyenMai;

}
