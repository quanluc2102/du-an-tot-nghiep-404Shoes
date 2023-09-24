package com.example.datn404shoes.helper;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.service.serviceimpl.KichThuocServiceImpl;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Component
public class KichThuocMauSacExcelSave {

    @Autowired
    MauSacServiceImpl mauSacService;

    @Autowired
    KichThuocServiceImpl kichThuocService;

    @Autowired
    SanPhamServiceimpl sanPhamService;
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"SoLuong", "TrangThai", "MauSac", "SanPham", "KichThuoc"};
    static String SHEET = "KichThuocMauSac";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public List<KichThuocMauSac> excelImport(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();
            List<KichThuocMauSac> kichThuocList = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                //bỏ qua header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                KichThuocMauSac kichThuocMauSac = new KichThuocMauSac();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            kichThuocMauSac.setSoLuong((int) currentCell.getNumericCellValue());
                            break;
                        case 1:
                            kichThuocMauSac.setTrangThai((int) currentCell.getNumericCellValue());
                            break;
                        case 2:
                            MauSac mauSac = mauSacService.findOne((long) currentCell.getNumericCellValue());
                            kichThuocMauSac.setMauSac(mauSac);
                            break;
                        case 3:
                            SanPham sanPham = sanPhamService.getOne((long) currentCell.getNumericCellValue());
                            kichThuocMauSac.setSanPham(sanPham);
                            break;
                        case 4:
                            KichThuoc kichThuoc = kichThuocService.findOne((long) currentCell.getNumericCellValue());
                            kichThuocMauSac.setKichThuoc(kichThuoc);
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                kichThuocList.add(kichThuocMauSac);
            }
            workbook.close();
            return kichThuocList;
        } catch (IOException e) {
            throw new RuntimeException("lỗi parse: " + e.getMessage());
        }
    }
}
