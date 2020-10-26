import React, {Component} from 'react';
import Dropzone from 'react-dropzone';


import styles from './AddNewPhoto.module.scss'

import closeIcon from '../img/addphoto/Xzavriet.svg'
import addText from '../img/addphoto/pridat-fotky-text.svg'
import cameraPic from '../img/addphoto/camera.svg'
import addCategorybutton from '../img/addphoto/pridat-button.svg'


class AddNewPhotoOverlay extends Component {

    state = {
        isVissibleCount: false,
        selectedFiles: ''
    }



    handleGetNewPicture = event => {

        const {api} = this.props

        event.preventDefault();

        const formData = new FormData()
        formData.append('name', 'image');
        for (let i=0; i < event.target.files.length; i++) {
            formData.append(event.target.files[i].name, event.target.files[i]);
        }

        const name = this.props.nameCategory;

        fetch(`${api}gallery/` + name, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json() )
            .then(success => this.handleAddNewPicButton(success) )
            .catch(error => console.log(error)
            );
    }


    handleGetNewPictureDragDrop = data => {
        const { api } = this.props
        const formData = new FormData();

        for (let i = 0; i < data.length; i++) {
            formData.append(data[i].name, data[i]);
        }

        const name = this.props.nameCategory;

        fetch(`${api}gallery/` + name, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(success => this.handleAddNewPicButton(success))
            .catch(error => console.log(error));
    }



    handleAddNewPicButton = data => {
        this.setState({
            selectedFiles: data
        })
        this.props.onAddNewPicture(this.state.selectedFiles);
    }

    handleShowNewPic = () => {
       this.props.closeOverlayAdd();
    }

    onDrop = () => {
        console.log(this.state);
    }






    render() {

        return (
                <div className={styles.addPhoto}
                        >
                    <aside className={styles.addPhotoContainer}>
                        <img className={styles.addCloseIcon}
                            src={closeIcon}
                            alt="closeIcon"
                            onClick={this.props.closeOverlayAdd} />
                        <div className={styles.addPhotoLowerContainer}>
                            <img className={styles.addPhotoText} src={addText} alt="addText" />

                        <Dropzone onDrop={acceptedFiles => this.handleGetNewPictureDragDrop(acceptedFiles)} accept='image/*'>
                            {({ getRootProps }) => (

                                <div {...getRootProps()} className={styles.addPhotoSmallContainer}>

                                    <img className={styles.addPhotoCamera} src={cameraPic} alt="cameraIcon" />
                                    <p className={styles.addPhotoHere}>
                                        SEM PRESUŇTE FOTKY
                                            </p>
                                    <p className={styles.addPhotoOr}>
                                        alebo
                                    </p>
                                    <div className={styles.buttonWrap}>
                                        <label className={styles.button} htmlFor="upload">VYBERTE SÚBORY</label>
                                        <form encType="multipart/form-data"
                                              onSubmit={this.props.handleSubmit}>
                                            <input id="upload"
                                                type="file"
                                                multiple
                                                name="file"
                                                accept="image/*"
                                                onChange={this.handleGetNewPicture}
                                            />
                                        </form>
                                    </div>
                                </div>

                            )}
                        </Dropzone>

                            <img className={styles.addPhotoButton}
                                src={addCategorybutton}
                                alt="addButton"
                                onClick={this.handleShowNewPic}
                            />
                        </div>
                    </aside>
                </div>
        )
        }
}

export default AddNewPhotoOverlay;
