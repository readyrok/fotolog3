package com.fotolog.server.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FileResponse {
    private String id;
    private String description;
    private String name;
    private LocalDate uploadDate;
    private Long size;
    private String url;
    private String contentType;
    private String uploader;
    private String tags;
}
