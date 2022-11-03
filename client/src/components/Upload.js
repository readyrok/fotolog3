import React, { Fragment, useState } from 'react';
import FileUploader from './FileUploader';
import TextField from '@mui/material/TextField';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FileService from '../services/file.service';

const UploadFile = () => {
	const submitForm = () => {		
		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('description', description);
		formData.append('tag', tag);
		formData.append('uploader', JSON.parse(localStorage.getItem("user"))["username"]);
		FileService.upload(formData)
	};

    const [selectedFile, setSelectedFile] = useState(null);
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');

	return (
		<Fragment>
			<form onSubmit={submitForm}>
				<div>					
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        style={{ padding: "10px"}}
                        onChange={(e) => setDescription(e.target.value)}
                        />

                    <TextField
                        required
                        id="outlined-required"
                        label="Tags"
                        style={{ padding: "10px"}}
                        onChange={(e) => setTag(e.target.value)}
                        />					
				</div>
				<FileUploader
					onFileSelect={(file) => setSelectedFile(file)}
					onFileSelectError={(error) => {
						console.log(error);
						alert(error);
					}}
				/>
				<div style={{ padding: "10px", display: "inline-block" }}>
					<button>Upload</button>
				</div>				
			</form>
		</Fragment>
	);
};

export default UploadFile;