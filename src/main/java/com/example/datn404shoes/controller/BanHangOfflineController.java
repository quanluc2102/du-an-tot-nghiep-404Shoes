package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.*;
import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.ThanhToan;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.BanHangOfflineServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.repository.HoaDonChiTietRepository;
import com.example.datn404shoes.repository.ThanhToanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.HoaDonChiTiet;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ban_hang")
public class BanHangOfflineController {

    private final BanHangOfflineServiceImpl banHangOfflineService;

    private final SanPhamChiTietServiceimpl sanPhamChiTietService;

    private final HoaDonImpl hoaDon;

    private final HoaDonChiTietimpl hoaDonChiTietimpl;

    private final SanPhamChiTietRepository sanPhamChiTietRepository;

    private final HoaDonChiTietRepository hoaDonChiTietRepository;

    private final HoaDonRepository hoaDonRepository;

    private final TaiKhoanServiceimpl taiKhoanServiceimpl;

    private final ThanhToanRepository thanhToanRepository;

    private final KhuyenMaiRepository khuyenMaiRepository;

    @Autowired
    public BanHangOfflineController(BanHangOfflineServiceImpl banHangOfflineService,
                                    HoaDonImpl hoaDon,
                                    SanPhamChiTietServiceimpl sanPhamChiTietService,
                                    HoaDonChiTietimpl hoaDonChiTietimpl,
                                    SanPhamChiTietRepository sanPhamChiTietRepository,
                                    HoaDonChiTietRepository hoaDonChiTietRepository,
                                    HoaDonRepository hoaDonRepository,
                                    TaiKhoanServiceimpl taiKhoanServiceimpl,
                                    ThanhToanRepository thanhToanRepository,
                                    KhuyenMaiRepository khuyenMaiRepository){
        this.banHangOfflineService = banHangOfflineService;
        this.hoaDon = hoaDon;
        this.sanPhamChiTietService = sanPhamChiTietService;
        this.hoaDonChiTietimpl = hoaDonChiTietimpl;
        this.sanPhamChiTietRepository = sanPhamChiTietRepository;
        this.hoaDonChiTietRepository = hoaDonChiTietRepository;
        this.hoaDonRepository = hoaDonRepository;
        this.taiKhoanServiceimpl = taiKhoanServiceimpl;
        this.thanhToanRepository = thanhToanRepository;
        this.khuyenMaiRepository = khuyenMaiRepository;
    }

    @GetMapping("/danh_sach_km")
    public ResponseEntity<?> danhsachKM(){
       List<KhuyenMai> listKM = banHangOfflineService.danhsachKM();
       return ResponseEntity.ok(listKM);
    }

    @GetMapping("/{ma}")
    public ResponseEntity<?> getKhuyenMaiByMa(@PathVariable("ma") String ma){
        return ResponseEntity.ok(banHangOfflineService.getOneByMa(ma));
    }

    @GetMapping("/hienthiKH")
    public ResponseEntity<?> geKH(){
        return ResponseEntity.ok(taiKhoanServiceimpl.getNhanVienByQuyenId3());
    }

    @GetMapping("")
    public ResponseEntity<?> layDanhSachHoaDonCho(){
        List<HoaDon> danhSachHoaDonCho = banHangOfflineService.layDanhSachHoaDonCho();
        return ResponseEntity.ok(danhSachHoaDonCho);
    }

    @PostMapping("/create")
    public ResponseEntity<?> taoHoaDonTrong(){
        HoaDon hd = new HoaDon();
        HoaDon hoaDonMoi = hoaDon.add(hd);
        return ResponseEntity.ok(hoaDonMoi);
    }

    @PutMapping("/delete_hdct/{id}")
    public ResponseEntity<?> xoaHDCT(@PathVariable("id") Long id,
                                     @RequestBody DeleteHdctDTO deleteHdctDTO){
        List<HoaDonChiTiet> listHDCT = new ArrayList<>();
        if(id != null){
            HoaDonChiTiet hdct = hoaDonChiTietRepository.findById(id).get();
            SanPhamChiTiet spct = sanPhamChiTietService.getOne(hdct.getSanPhamChiTiet().getId());
            Integer soLuong = hdct.getSoLuong();
            spct.setSoLuong(spct.getSoLuong() + soLuong);
            sanPhamChiTietRepository.save(spct);
            banHangOfflineService.deleteHDCT(id);
            listHDCT = banHangOfflineService.layDanhSachHDCT(deleteHdctDTO.getHoaDonId());
            System.out.println(listHDCT);
        }else{
            ResponseEntity.badRequest();
        }
        return ResponseEntity.ok(listHDCT);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> xoaHoaDon(@PathVariable("id") Long id,
                                       @RequestBody DeleteHoaDonDTO deleteHoaDonDTO){


        List<HoaDonChiTiet> listHDCT = deleteHoaDonDTO.getListHoaDonChiTiet();
        if(listHDCT != null){
            for (HoaDonChiTiet x : deleteHoaDonDTO.getListHoaDonChiTiet()) {
                SanPhamChiTiet spct = sanPhamChiTietService.getOne(x.getSanPhamChiTiet().getId());

                Integer soLuong = x.getSoLuong();
                spct.setSoLuong(spct.getSoLuong() + soLuong);

                SanPhamChiTietRequest sanPhamChiTietRequest = new SanPhamChiTietRequest();
                sanPhamChiTietRequest.setDonGia((int) spct.getDonGia());
                sanPhamChiTietRequest.setAnh(spct.getAnh());
                sanPhamChiTietRequest.setMauSac(spct.getMauSac().getId());
                sanPhamChiTietRequest.setKichThuoc(spct.getKichThuoc().getId());
                sanPhamChiTietRequest.setSoLuong(spct.getSoLuong());
                sanPhamChiTietService.update(x.getSanPhamChiTiet().getId(), sanPhamChiTietRequest);

                banHangOfflineService.deleteHoaDonChiTiet(x.getId());
            }
        }
        hoaDon.delete(id);
        List<HoaDon> danhSachHoaDonCho = banHangOfflineService.layDanhSachHoaDonCho();
        return ResponseEntity.ok(danhSachHoaDonCho);
    }

    @PostMapping("/thanhToan/{id}")
    public ResponseEntity<?> thanhToanHoaDon(@PathVariable("id") Long id,
                                             @RequestBody ThanhToanDTO thanhToanDTO) {

        Optional<HoaDon> hoaDonOptional = hoaDonRepository.findById(id);

        if(hoaDonOptional.isPresent()){
            HoaDon hoaDon = hoaDonOptional.get();
            String ten = thanhToanDTO.getTen();
            String sdt = thanhToanDTO.getSdt();
            Long idKhachHang = thanhToanDTO.getTaiKhoanKhachHang();
            Float tongTien = thanhToanDTO.getTongTien();
            Float tienGiam = thanhToanDTO.getTienGiam();
            Float tongTienSauGiam = thanhToanDTO.getTongTienSauGiam();
            Float phiShip = thanhToanDTO.getPhiShip();
            Integer kieuHoaDon = thanhToanDTO.getKieuHoaDon();
            String tinhThanhPho = thanhToanDTO.getTinhThanhPho();
            String quanHuyen = thanhToanDTO.getQuanHuyen();
            String xaPhuongThiTran = thanhToanDTO.getXaPhuongThiTran();
            String diaChiCuThe = thanhToanDTO.getDiaChiCuThe();
            Long khuyenMai = thanhToanDTO.getKhuyenMai();
            Long thanhToan = thanhToanDTO.getThanhToan();
            String ghiChu = thanhToanDTO.getGhiChu();

            if(ten != null){
                hoaDon.setTen(ten);
            }

            if(sdt != null){
                hoaDon.setSdt(sdt);
            }

            if(tongTien != null){
                hoaDon.setTongTien(tongTien);
            }

            if(tienGiam != null){
                hoaDon.setTienGiam(tienGiam);
            }

            if(tongTienSauGiam != null){
                hoaDon.setTongTienSauGiam(tongTienSauGiam);
            }

            if(phiShip != null){
                hoaDon.setPhiShip(phiShip);
            }

            hoaDon.setKieuHoaDon(kieuHoaDon);

            hoaDon.setTrangThai(kieuHoaDon == 2 ? 4 : 0);

            if(tinhThanhPho != null){
                hoaDon.setTinhThanhPho(tinhThanhPho);
            }

            if(quanHuyen != null){
                hoaDon.setQuanHuyen(quanHuyen);
            }

            if(xaPhuongThiTran != null){
                hoaDon.setXaPhuongThiTran(xaPhuongThiTran);
            }

            if(diaChiCuThe != null){
                hoaDon.setDiaChiCuThe(diaChiCuThe);
            }

            if(ghiChu != null){
                hoaDon.setGhiChu(ghiChu);
            }

            if(idKhachHang != null){
                TaiKhoan taiKhoanKhachHang = taiKhoanServiceimpl.getOne(idKhachHang);
                hoaDon.setTaiKhoanKhachHang(taiKhoanKhachHang);
            }

            if(thanhToan != null){
                ThanhToan kieuThanhToan = thanhToanRepository.findById(thanhToan).get();
                hoaDon.setThanhToan(kieuThanhToan);
            }

            if(khuyenMai != null){
                Optional<KhuyenMai> khuyenMaiOptional = khuyenMaiRepository.findById(khuyenMai);
                if(khuyenMaiOptional.isPresent()){
                    KhuyenMai km = khuyenMaiOptional.get();
                    int soLuongKM = km.getSoLuong() - 1;
                    km.setSoLuong(soLuongKM);
                    hoaDon.setKhuyenMai(km);
                    khuyenMaiRepository.saveAndFlush(km);
                }
            }

            hoaDonRepository.saveAndFlush(hoaDon);

            List<HoaDon> danhSachHoaDonCho = banHangOfflineService.layDanhSachHoaDonCho();
            return ResponseEntity.ok(danhSachHoaDonCho);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update_soluong/{id}")
    public ResponseEntity<?> capNhatSoLuongHDCT(@PathVariable("id") Long id,
                                                @RequestBody UpdateSoLuongHdctDTO updateSoLuongHdctDTO) {
        Optional<HoaDonChiTiet> hoaDonChiTietOptional = hoaDonChiTietRepository.findById(id);

        if(hoaDonChiTietOptional.isPresent()){
            HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietOptional.get();
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(hoaDonChiTiet.getSanPhamChiTiet().getId()).get();

            Integer soLuongTrongSPCT = sanPhamChiTiet.getSoLuong();
            Integer soLuongTrongHDCT = hoaDonChiTiet.getSoLuong();

            if(soLuongTrongHDCT >= updateSoLuongHdctDTO.getSoLuongNhap()){
                int soLuongMoi = soLuongTrongHDCT - updateSoLuongHdctDTO.getSoLuongNhap();
                hoaDonChiTiet.setSoLuong(updateSoLuongHdctDTO.getSoLuongNhap());
                sanPhamChiTiet.setSoLuong(soLuongTrongSPCT + soLuongMoi);
                hoaDonChiTietRepository.save(hoaDonChiTiet);
                sanPhamChiTietRepository.save(sanPhamChiTiet);
            }else{
                int soLuongMoi = updateSoLuongHdctDTO.getSoLuongNhap() - soLuongTrongHDCT;
                hoaDonChiTiet.setSoLuong(updateSoLuongHdctDTO.getSoLuongNhap());
                sanPhamChiTiet.setSoLuong(soLuongTrongSPCT - soLuongMoi);
                hoaDonChiTietRepository.save(hoaDonChiTiet);
                sanPhamChiTietRepository.save(sanPhamChiTiet);
            }

            List<HoaDonChiTiet> danhSachHDCT = banHangOfflineService.layDanhSachHDCT(hoaDonChiTiet.getHd().getId());
            return ResponseEntity.ok(danhSachHDCT);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update_hdct/{id}")
    public ResponseEntity<?> capNhatSoLuongSP(@PathVariable("id") Long id,
                                              @RequestBody UpdateHoaDonChiTietDTO updateHoaDonChiTietDTO) {

        HoaDon hd = hoaDon.getOne(id);

        Long idCTSP = updateHoaDonChiTietDTO.getSanPhamChiTiet().getId();

        List<HoaDonChiTiet> listHDCT = banHangOfflineService.layDanhSachHDCT(id);

        if (listHDCT != null && !listHDCT.isEmpty()) {
            boolean foundIdCTSP = false;
            for (HoaDonChiTiet hdct : listHDCT) {
                if (hdct.getSanPhamChiTiet().getId() == idCTSP) {
                    SanPhamChiTiet spct = sanPhamChiTietService.getOne(idCTSP);
                    foundIdCTSP = true;
                    int soLuongHDCT = hdct.getSoLuong() + 1;
                    int soLuongCTSP = spct.getSoLuong() - 1;
                    hdct.setSoLuong(soLuongHDCT);
                    spct.setSoLuong(soLuongCTSP);
                    hdct.setHd(hd);
                    sanPhamChiTietRepository.save(spct);
                    hoaDonChiTietimpl.addNewHDCT(hdct);
                }
            }

            if (!foundIdCTSP) {
                SanPhamChiTiet spct = sanPhamChiTietService.getOne(idCTSP);
                if (spct != null) {
                    HoaDonChiTiet newHDCT = new HoaDonChiTiet();
                    newHDCT.setSanPhamChiTiet(spct);
                    newHDCT.setSoLuong(1);
                    newHDCT.setHd(hd);
                    int soLuongCTSP = spct.getSoLuong() - 1;
                    spct.setSoLuong(soLuongCTSP);
                    hoaDonChiTietimpl.addNewHDCT(newHDCT);
                }
            }
        } else {
            SanPhamChiTiet spct = sanPhamChiTietService.getOne(idCTSP);
            if (spct != null) {
                HoaDonChiTiet newHDCT = new HoaDonChiTiet();
                newHDCT.setSanPhamChiTiet(spct);
                newHDCT.setSoLuong(1);
                newHDCT.setHd(hd);
                int soLuongCTSP = spct.getSoLuong() - 1;
                spct.setSoLuong(soLuongCTSP);
                hoaDonChiTietimpl.addNewHDCT(newHDCT);
            }
        }
        List<HoaDonChiTiet> danhSachHDCT = banHangOfflineService.layDanhSachHDCT(id);
        return ResponseEntity.ok(danhSachHDCT);
    }

    @GetMapping("/spct/{id}")
    public ResponseEntity<?> layDanhSachSPTrongHD(@PathVariable("id") Long id){
        List<SanPhamChiTiet> danhSachSP = banHangOfflineService.layDanhSachSPCT(id);
        return ResponseEntity.ok(danhSachSP);
    }

    @GetMapping("/hdct/{id}")
    public ResponseEntity<?> layDanhSachHDCT(@PathVariable("id") Long id){
        List<HoaDonChiTiet> danhSachHDCT = banHangOfflineService.layDanhSachHDCT(id);
        return ResponseEntity.ok(danhSachHDCT);
    }

}
