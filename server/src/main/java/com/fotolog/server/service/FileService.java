package com.fotolog.server.service;

import com.fotolog.server.model.FileEntity;
import com.fotolog.server.repo.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {
    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void save(MultipartFile file, String uploader, String description) throws IOException {
        FileEntity fileEntity = new FileEntity();

        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setUploadDate(LocalDate.now());
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setUploader(uploader);
        fileEntity.setDescription(description);

        fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(String id) {
        return fileRepository.findById(id);
    }

    public List<FileEntity> findAllFilesByUploader(String uploader){
        return fileRepository.findAllByUploader(uploader);
    }
    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}
