package com.fotolog.server.controller;

import com.fotolog.server.model.FileEntity;
import com.fotolog.server.model.FileResponse;
import com.fotolog.server.service.FileService;
import com.fotolog.server.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/files")
public class FileController {

    private final FileService fileService;
    private final LikeService likeService;

    @Autowired
    public FileController(FileService fileService, LikeService likeService) {
        this.fileService = fileService;
        this.likeService = likeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,
                                         @RequestParam("uploader") String uploader,
                                         @RequestParam("description") String description,
                                         @RequestParam("tags") String tags) {
        try {
            System.out.println(file);
            fileService.save(file, uploader, description, tags);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public List<FileResponse> list() {
        return fileService.getAllFiles()
                .stream()
                .map(this::mapToFileResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{user}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public List<FileResponse> listAllByUploader(@PathVariable("user") String user) {
        System.out.println(user);
        return fileService.findAllFilesByUploader(user)
                .stream()
                .map(this::mapToFileResponse)
                .collect(Collectors.toList());
    }

    private FileResponse mapToFileResponse(FileEntity fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/photo/")
                .path(fileEntity.getId())
                .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setContentType(fileEntity.getContentType());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);
        fileResponse.setUploadDate(fileEntity.getUploadDate());
        fileResponse.setUploader(fileEntity.getUploader());
        fileResponse.setDescription(fileEntity.getDescription());
        fileResponse.setTags(fileEntity.getTags());

        return fileResponse;
    }

    @GetMapping("/photo/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") String id) {
        Optional<FileEntity> fileEntityOptional = fileService.getFile(id);

        if (fileEntityOptional.isEmpty()) {
            return ResponseEntity.notFound()
                    .build();
        }

        FileEntity fileEntity = fileEntityOptional.get();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getName() + "\"")
                .contentType(MediaType.valueOf(fileEntity.getContentType()))
                .body(fileEntity.getData());
    }

    @GetMapping("/like/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Long countLikesByPostId(@PathVariable("id") String id){
        return likeService.countLikesByPostId(id);
    }

    @GetMapping("/likes/{postId}/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public boolean isPostLiked(@PathVariable("postId")String postId, @PathVariable("userId") String userId){
        return likeService.isPostLiked(postId, userId);
    }

    @PostMapping("/likes/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void savePostLike(@PathVariable("id") String id){
        likeService.addPostLike(id);
    }

    @DeleteMapping("/likes/{postId}/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void deletePostLike(@PathVariable("postId") String postId, @PathVariable("userId") String userId){
        System.out.println("STARTED DELETE: ");
        likeService.deletePostLike(postId, userId);
    }
}
