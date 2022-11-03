package com.fotolog.server.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "FILES")
@Getter
@Setter
@ToString
public class FileEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private String description;
    private LocalDate uploadDate;
    private String contentType;
    private Long size;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] data;
    private String uploader;
    //TODO tags
}
