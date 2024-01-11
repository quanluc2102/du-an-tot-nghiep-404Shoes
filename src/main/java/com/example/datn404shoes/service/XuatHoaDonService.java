package com.example.datn404shoes.service;

import com.itextpdf.text.Document;
import jakarta.servlet.http.HttpServletResponse;

public interface XuatHoaDonService {
    Document OrderPdfExport(Long id, HttpServletResponse response);
}
