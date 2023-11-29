package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.PhanQuyen;

import java.util.List;

public interface BanHangOfflineService {

    List<KhuyenMai> danhsachKM();

    KhuyenMai getOneByMa(String ma);

    List<PhanQuyen> getKH(Long id);

}
