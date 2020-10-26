import React from 'react';

import style from './TheGallery.module.scss';

import close from '../img/gallery/Xzavriet.png';
import left from '../img/gallery/left.svg';
import right from '../img/gallery/right.svg';

const Gallery = (props) => {


    return(
        <div className={style.galleryOverlay}
             onKeyDown={props.onClick}>
            <div className={style.galleryContainer}>

                <img onClick={props.onClick}
                    className={style.galleryClose}
                    src={close}
                    alt="close"/>
                <img onClick={props.toLeft}
                     className={style.galleryLeft}
                     src={left}
                     alt="left"/>
                <img onClick={props.toRight}
                     className={style.galleryRight}
                     src={right}
                     alt="right"/>

                <img src={props.image} className={style.gallery} alt="galleryImage"/>

			</div>
		</div>
    )
}

export default Gallery;
