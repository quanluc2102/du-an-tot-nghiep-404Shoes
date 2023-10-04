package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity

@Table(name = "mau_sac")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MauSac {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Column(name = "gia_tri")
    private int giaTri;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private Boolean trangThai;


}
