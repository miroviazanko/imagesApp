import React, { Component } from 'react';

import '../App.scss';

import addPhoto from '../img/addphoto/addphoto.svg'
import TheGallery from './TheGallery'
import AddNewPhotoOverlay from './AddNewPhotoOverlay'




class TheSpecificCategories extends Component {

    state = {
        isVissibleAddSpecificPhoto: false,
        isVissibleGallery: false,

        galleryImage: '',
        imageIndex: '',

        selectedFiles: this.props.uniqueImgSrc,
        api: this.props.api
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
        document.addEventListener("keydown", this.HandleKeyCloseGallery, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
        document.removeEventListener("keydown", this.HandleKeyCloseGallery, false);
    }


    handleAddPhoto = () => {
        this.setState({
            isVissibleAddSpecificPhoto: true
        })
    }


    closeAddOverlay = () => {
        this.setState({
            isVissibleAddSpecificPhoto: false
        })
        this.props.onUpdateState(this.state.selectedFiles);
    }


    handleUniqueSrc = (data) => {

        const newPic = data.uploaded;

        this.setState( state => {
            return {
                selectedFiles: [...state.selectedFiles, ...newPic]
            }
        })

    }


    handleShowGallery = (data, index) => {
        this.setState({
            isVissibleGallery: true,
            galleryImage: `${this.state.api}images/640x0/` + data.fullpath,
            imageIndex: index
        })
    }


    handleCloseGallery = () => {
        this.setState({
            isVissibleGallery: false
        })
    }

    HandleKeyCloseGallery = (e) => {
        if (e.key === "Escape") {
            this.setState({
                isVissibleGallery: false
            })
        }
    }


    handleChangePhotoLeft = (data) => {

        if (this.state.imageIndex === 0) {
            this.setState({
                imageIndex: data.length - 1,
                galleryImage: data[data.length - 1].props.src.replace('200x0', '640x0')
            })
        }
        else {
            this.setState({
                imageIndex: this.state.imageIndex - 1,
                galleryImage: data[this.state.imageIndex - 1].props.src.replace('200x0', '640x0')
            })
        }
    }


    handleChangePhotoRight = (data) => {

        if (this.state.imageIndex === data.length - 1) {
            this.setState({
                imageIndex: 0,
                galleryImage: data[0].props.src.replace('200x0', '640x0')
            })
        }
        else{
            this.setState({
                imageIndex: this.state.imageIndex + 1,
                galleryImage: data[this.state.imageIndex + 1].props.src.replace('200x0', '640x0')
            })
        }
    }

    handleKeyPress = (e) => {
        if (e.key === "Escape") {
            this.closeAddOverlay()
        }
    }



    render() {

        const  uniqueImgSrc = this.state.selectedFiles;

        const addNewPhoto =
            <aside className="specific-category"
                   onClick={this.handleAddPhoto}>
                <img src={addPhoto}
                     className="add-photo"
                     alt="addPhoto" />
            </aside >

        const photoArray = uniqueImgSrc.length && uniqueImgSrc.map( (pho, index) =>
            <img src={`${this.state.api}images/200x0/` + pho.fullpath}
                 onClick={ () => this.handleShowGallery(pho, index)}
                 className="specific-category"
                 key={index}
                 alt="foto"
                 width="302"
                />

        );





        return (

                <div>
                    { photoArray }
                    { addNewPhoto }

                    {this.state.isVissibleAddSpecificPhoto ?
                        <AddNewPhotoOverlay
                            showOverlayAdd={this.handleAddPhoto}
                            closeOverlayAdd={this.closeAddOverlay}
                            handleAddNewButton={this.handleAddNewButon}
                            nameCategory={this.props.nameCategory}
                            onAddNewPicture={this.handleUniqueSrc}
                            api={this.state.api}
                            onKeyPress={this.handleKeyPress}
                        />: null}

                    {this.state.isVissibleGallery ?
                        <TheGallery
                            image={this.state.galleryImage}
                            onClick={this.handleCloseGallery}
                            toLeft={ () => this.handleChangePhotoLeft(photoArray)}
                            toRight={ () => this.handleChangePhotoRight(photoArray)}
                            onKeyPress={this.HandleKeyCloseGallery}
                        />: null
                    }
                </div>

        )

    }
}


export default TheSpecificCategories;

