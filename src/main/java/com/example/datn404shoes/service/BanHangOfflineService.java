package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;

import java.util.List;

public interface BanHangOfflineService {

    List<KhuyenMai> danhsachKM();

    KhuyenMai getOneByMa(String ma);

}
