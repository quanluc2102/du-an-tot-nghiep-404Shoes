package com.example.datn404shoes.DTO;

import lombok.Data;

@Data
public class SearchDTO {
    private String searchString;

    // Các phương thức getter và setter

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }
}
