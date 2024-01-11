package com.example.datn404shoes.service.serviceimpl;
import java.text.NumberFormat;
import java.util.Locale;
import com.example.datn404shoes.DTO.HoaDonChiTietDto;
import com.example.datn404shoes.DTO.XuatHoaDonDto;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.service.XuatHoaDonService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class XuatHoaDonServiceImpl implements XuatHoaDonService {
    @Autowired
    private HoaDonRepository hoaDonRepository;
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    private static BaseFont times;

    static {
        try {
            times = BaseFont.createFont("src/main/resources/font/times.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static Font titleFont = new Font(times, 16, Font.BOLDITALIC);
    private static Font subTitleFont = new Font(times, 13, Font.BOLDITALIC);
    private static Font contentFont = new Font(times, 10, Font.NORMAL);
    private static Font headerTableFont = new Font(times, 9, Font.BOLDITALIC);
    private static Font contentTableFont = new Font(times, 10, Font.NORMAL);
    private static Font contenFooterFont = new Font(times, 11, Font.BOLDITALIC);

    private static Font contentNoteFont = new Font(times, 5, Font.NORMAL);

    public Document OrderPdfExport(Long id, HttpServletResponse response) {
        XuatHoaDonDto hoaDonPdf = hoaDonRepository.getHoaDonByhoaDonId(id).orElseThrow();
        List<HoaDonChiTietDto> hoaDonChiTietPdf = hoaDonChiTietRepository.getListOrderPdf(id);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        Document document = new Document(PageSize.A6, 20, 10, 0, 0);
        try {
            // Tạo đối tượng PdfWriter
            File file = new File("./ccccc.pdf");


            if (!file.exists()) {
                file.createNewFile();
            }
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

            try {
                PdfWriter.getInstance(document, response.getOutputStream());
            } catch (DocumentException | IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Get pdf document fail");
            }

            // Mở file để thực hiện ghi
            document.open();
            // Thêm nội dung sử dụng add function
//            String logoPath = "src/main/resources/static/PoloStore.png";
//            Image logoImage = Image.getInstance(logoPath);
//
//            logoImage.scaleToFit(150, 150); // Thay đổi kích thước logo nếu cần thiết
//            logoImage.setAlignment(Element.ALIGN_CENTER); // Thiết lập vị trí logo trên tra
//            document.add(logoImage);


            Paragraph addressShop = new Paragraph("Địa chỉ shop : Tòa nhà 404 404 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội", contentFont);

            document.add(addressShop);
            Paragraph phoneShop = new Paragraph("Số điện thoại shop : 0332041852", contentFont);

            document.add(phoneShop);

            Paragraph email = new Paragraph("Email : 404shopshoes@gmail.com", contentFont);

            document.add(email);

            Paragraph order = new Paragraph("Hoá đơn thanh toán", subTitleFont);
            order.setAlignment(Element.ALIGN_CENTER);
            document.add(order);

            Paragraph customer = new Paragraph("Khách hàng: " + hoaDonPdf.getTen(), contentFont);
            document.add(customer);

            Paragraph customerAddress = new Paragraph("Địa chỉ: " + hoaDonPdf.getDiaChiCuThe(), contentFont);
            document.add(customerAddress);

            String phoneNumber = hoaDonPdf.getSdt();
            if (phoneNumber != null && !phoneNumber.equals("0")) {
                Paragraph phoneNumberParagraph = new Paragraph("Số điện thoại: " + phoneNumber, contentFont);
                document.add(phoneNumberParagraph);
            }

            Paragraph date = new Paragraph("Ngày: " + formattedDateTime + "                             Mã hoá đơn: " + hoaDonPdf.getMaHoaDon(), contentFont);
            document.add(date);

            float[] columnWidths = {150f, 50f, 100f, 100f};
            PdfPTable table = new PdfPTable(4);
            table.setTotalWidth(400f);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);
            table.setHorizontalAlignment(Element.ALIGN_LEFT);
            table.setWidthPercentage(100);
            table.setWidths(columnWidths);

            addDataToTable(table, 0, "Sản phẩm", "Số lượng", "Đơn giá", "Thành tiền");
            for (HoaDonChiTietDto orderDetail : hoaDonChiTietPdf) {
                double totalPrice = orderDetail.getSoLuong() * orderDetail.getGiaBan();
                addDataToTable(
                        table,
                        1,
                        orderDetail.getTen(),
                        String.valueOf(orderDetail.getSoLuong()),
                        String.valueOf(orderDetail.getGiaBan()),
                        String.valueOf(totalPrice)
                );
            }

            document.add(table);

            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

            Float shipCost = hoaDonPdf.getPhiShip();
            if (shipCost != null && shipCost != 0) {
                String formattedShipCost = currencyFormat.format(shipCost);
                Paragraph fee = new Paragraph("Phí ship:          " + formattedShipCost, contentFont);
                fee.setIndentationLeft(150f);
                document.add(fee);
            }

            String formattedTienGiam = currencyFormat.format(hoaDonPdf.getTienGiam());
            Paragraph tiengiam = new Paragraph("Số tiền giảm:        " + formattedTienGiam, contentFont);
            tiengiam.setIndentationLeft(150f);
            document.add(tiengiam);

            String formattedTongTienSauGiam = currencyFormat.format(hoaDonPdf.getTongTienSauGiam());
            Paragraph totalPrice = new Paragraph("Tổng tiền:        " + formattedTongTienSauGiam, contentFont);
            totalPrice.setIndentationLeft(150f);
            document.add(totalPrice);

            String formattedTotalPriceAfter = currencyFormat.format(hoaDonPdf.getTongTienSauGiam() + hoaDonPdf.getPhiShip());
            Paragraph totalPriceAfter = new Paragraph("Tổng thu:          " + formattedTotalPriceAfter, contentFont);
            totalPriceAfter.setIndentationLeft(150f);
            document.add(totalPriceAfter);

            Paragraph footer = new Paragraph("Cảm ơn bạn đã tin tưởng và ủng hộ cửa hàng !", contenFooterFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            footer.setPaddingTop(25f);
            document.add(footer);

            // Đóng File
            //response
//            Path path = Paths.get(pdfFile.getURI());
//            byte[] data = Files.readAllBytes(path);

            return document;
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            document.close();
        }
        return null;
    }

    private static void addDataToTable(PdfPTable table, int type, String... rowData) {
        if (type == 0) {
            for (String data : rowData) {
                // Tạo một ô mới trong bảng
                PdfPCell cell = createHeaderCell(data);
                // Thêm ô vào bảng
                table.addCell(cell);
            }
        } else {
            for (String data : rowData) {
                // Tạo một ô mới trong bảng
                PdfPCell cell = createCell(data);
                // Thêm ô vào bảng
                table.addCell(cell);
            }
        }

    }

    private static PdfPCell createCell(String content) {
        PdfPCell cell = new PdfPCell(new Paragraph(content, contentTableFont));

        // Đặt kiểu viền là dashed (đường gạch nối) và đặt kích thước gạch nối
        cell.setBorder(PdfPCell.TOP);
        cell.setBorderColorTop(BaseColor.BLACK);
        cell.setBorderWidthBottom(0.2f);
        cell.setBorderWidthTop(0f);
        cell.setBorderWidth(0f); // Đặt viền left và right thành 0 để loại bỏ chúng
        cell.setVerticalAlignment(PdfPCell.ALIGN_MIDDLE);

        cell.setMinimumHeight(20);
        return cell;
    }

    private static PdfPCell createHeaderCell(String content) {
        PdfPCell cell = new PdfPCell(new Paragraph(content, headerTableFont));

        // Đặt kiểu viền là dashed (đường gạch nối) và đặt kích thước gạch nối
        cell.setBorder(PdfPCell.TOP);
        cell.setBorderColorTop(BaseColor.BLACK);
        cell.setBorderWidthBottom(0.2f);
        cell.setBorderWidthTop(0f);
        cell.setBorderWidth(0f); // Đặt viền left và right thành 0 để loại bỏ chúng
        cell.setVerticalAlignment(PdfPCell.ALIGN_MIDDLE);

        cell.setMinimumHeight(30);
        return cell;
    }
}
