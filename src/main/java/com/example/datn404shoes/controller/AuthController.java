package com.example.datn404shoes.controller;

import com.example.datn404shoes.DTO.UserCredentials;
import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.request.UserInfoResponse;
import com.example.datn404shoes.service.serviceimpl.DiaChiServiceimpl;
import com.example.datn404shoes.service.serviceimpl.PhanQuyenServiceimpl;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;


@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private TaiKhoanServiceimpl taiKhoanServiceimpl;
    @Autowired
    private PhanQuyenServiceimpl phanQuyenServiceimpl;
//    @Autowired
//    private DiaChiServiceimpl diaChiServiceimpl;
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Key bí mật, nên được lưu trữ an toàn

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserCredentials credentials) {
        // Kiểm tra tài khoản và mật khẩu, trả về token nếu đúng
        if (isValidNhanVien(credentials)) {
            String token = generateToken(credentials.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    private boolean isValidNhanVien(UserCredentials credentials) {
        TaiKhoan taiKhoan = taiKhoanServiceimpl.getOneByEmail(credentials.getEmail());

        // Kiểm tra nếu tài khoản không tồn tại
        if (taiKhoan == null) {
            return false;
        }

        for (PhanQuyen phanQuyen : phanQuyenServiceimpl.getAll()) {
            // Kiểm tra nếu tài khoản có quyền là nhân viên (quyền có id là 1)
            if (phanQuyen.getTaiKhoan().getId() == taiKhoan.getId() && phanQuyen.getQuyen().getId() == 1 || phanQuyen.getQuyen().getId() == 2) {
                return credentials.getEmail().equals(taiKhoan.getEmail()) && credentials.getPassword().equals(taiKhoan.getPassword());
            }
        }

        // Nếu không có phân quyền nào cho tài khoản là nhân viên
        return false;
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoResponse> getUserInfo(HttpServletRequest request) {
        try {
            // Lấy thông tin người dùng từ token hoặc phương thức xác thực của bạn
            String userEmail = extractUserEmailFromToken(request);
            // Gọi service để lấy thông tin chi tiết của người dùng
            TaiKhoan userInfo = taiKhoanServiceimpl.getOneByEmail(userEmail);
            if (userInfo != null) {
                UserInfoResponse userInfoResponse = new UserInfoResponse();
                userInfoResponse.setId(userInfo.getId());
                userInfoResponse.setMaTaiKhoan(userInfo.getMaTaiKhoan());
                userInfoResponse.setEmail(userInfo.getEmail());
                userInfoResponse.setTen(userInfo.getThongTinNguoiDung().getTen());
                userInfoResponse.setAnh(userInfo.getAnh());
                userInfoResponse.setCccd(userInfo.getThongTinNguoiDung().getCCCD());
                userInfoResponse.setGioiTinh(userInfo.getThongTinNguoiDung().getGioiTinh());
                userInfoResponse.setNgaySinh(userInfo.getThongTinNguoiDung().getNgaySinh());
                userInfoResponse.setSdt(userInfo.getThongTinNguoiDung().getSdt());
                // Nếu có ThongTinNguoiDung, bạn có thể thêm các thông tin khác vào userInfoResponse
                return ResponseEntity.ok(userInfoResponse);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    // Phương thức giúp trích xuất email từ token trong tiêu đề "Authorization"
    protected String extractUserEmailFromToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.replace("Bearer ", "");

        // Giả sử bạn sử dụng thư viện JWT để giải mã token
        Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();

        return claims.getSubject();
    }

    @PostMapping("/loginKH")
    public ResponseEntity<String> loginKH(@RequestBody UserCredentials credentials) {
        // Kiểm tra tài khoản và mật khẩu, trả về token nếu đúng
        if (isValidKhachHang(credentials)) {
            String token = generateToken(credentials.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



    private boolean isValidKhachHang(UserCredentials credentials) {
        TaiKhoan taiKhoan = taiKhoanServiceimpl.getOneByEmail(credentials.getEmail());

        // Kiểm tra nếu tài khoản không tồn tại
        if (taiKhoan == null) {
            return false;
        }

        for (PhanQuyen phanQuyen : phanQuyenServiceimpl.getAll()) {
            // Kiểm tra nếu tài khoản có quyền là nhân viên (quyền có id là 1)
            if (phanQuyen.getTaiKhoan().getId() == taiKhoan.getId() && phanQuyen.getQuyen().getId() == 3) {
                return credentials.getEmail().equals(taiKhoan.getEmail()) && credentials.getPassword().equals(taiKhoan.getPassword());
            }
        }

        // Nếu không có phân quyền nào cho tài khoản là nhân viên
        return false;
    }


    private String generateToken(String username) {
        // Tạo và trả về token sử dụng thư viện JWT
        return Jwts.builder()
                .setSubject(username)
                .signWith(SECRET_KEY)
                .compact();
    }


//    @GetMapping("/info")
//    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
//        // Lấy thông tin người dùng từ token
//        System.out.println(request.getCookies());
//        String userEmail = extractUserEmailFromToken(request);
//
//        // Gọi service để lấy thông tin chi tiết của người dùng
//        TaiKhoan userInfo = taiKhoanServiceimpl.getOneByEmail(userEmail);
//
//        if (userInfo != null) {
//            return ResponseEntity.ok(userInfo);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//    }

}
