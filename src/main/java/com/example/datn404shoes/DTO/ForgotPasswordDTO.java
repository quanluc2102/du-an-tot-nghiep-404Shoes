package com.example.datn404shoes.DTO;

import lombok.Data;

@Data
public class ForgotPasswordDTO {

    private String email;

    // Các phương thức getter và setter

    public String getSearchString() {
        return email;
    }

    public void setSearchString(String email) {
        this.email = email;
    }
}
