import React,{ Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import '../App.scss';

import addCategoryIcon from '../img/icons/add-category.svg';


class Categories extends Component {

    state = {
        isVissibleCount: false,
        photosCount: '',
    }


    handleVissibleCount = (data) => {
        this.setState({
            isVissibleCount: true,
            photosCount: data
        })
        var icons = Array.from(document.querySelectorAll('figure'));
        var bckgImg = document.getElementById('change-bg');
        var previousbckgImg = document.getElementById('previous-change-bg');


        function changeImages(data) {
            data.forEach(function (entry) {
                entry.addEventListener('mouseover', () => {
                    let hashSvg = entry.firstElementChild.src;
                    previousbckgImg.classList.add('scale-icon-down'); bckgImg.style.backgroundImage = 'url(' + hashSvg + ')';
                    bckgImg.classList.remove('scale-icon-down');
                    bckgImg.classList.add('scale-icon-up');
                });

                entry.addEventListener('mouseout', () => {
                    let hashSvg = entry.firstElementChild.src;
                    bckgImg.classList.remove('scale-icon-up');
                    previousbckgImg.style.backgroundImage = 'url(' + hashSvg + ')';
                    previousbckgImg.classList.remove('scale-icon-down');
                    previousbckgImg.classList.add('scale-icon-up');
                })
            });
        };
        changeImages(icons);
    }


    handleNotVissibleCount = (data) => {
        this.setState({
            isVissibleCount: false,
            photosCount: data
        })
    }



    render() {

        const {icons, showCategory, handleClickAdd, api} = this.props;

        const show = icons.length && icons.map( iconOne =>
            {
                return <Switch key={iconOne.name}>
                    <Route path='/' exact key={iconOne.name} render={() => <Link to='/category' key={iconOne.name}>
                        <figure
                            onClick={() => showCategory(iconOne.countPhotos, iconOne.name)}
                            onMouseEnter={() => this.handleVissibleCount(iconOne.countPhotos)}
                            onMouseLeave={() => this.handleNotVissibleCount(iconOne.countPhotos)}
                            key={iconOne.name}
                            className="icon-item">

                            <img src={iconOne.image &&
                                `${api}images/200x0/` + iconOne.image.fullpath}
                                alt={iconOne.name}
                                width="302"
                                className="img-size" />
                            <figcaption>{iconOne.name}
                                <br />

                                {this.state.isVissibleCount && this.state.photosCount && this.state.photosCount === iconOne.countPhotos && iconOne.countPhotos.length > 4 && <span><small>{iconOne.countPhotos.length.toString()} fotiek</small></span>}

                                {this.state.isVissibleCount && this.state.photosCount && this.state.photosCount === iconOne.countPhotos && iconOne.countPhotos.length > 0 && iconOne.countPhotos.length < 2 && <span><small>{iconOne.countPhotos.length.toString()} fotka</small></span>}

                                {this.state.isVissibleCount && this.state.photosCount && this.state.photosCount === iconOne.countPhotos && iconOne.countPhotos.length > 1 && iconOne.countPhotos.length < 5 && <span><small>{iconOne.countPhotos.length.toString()} fotky</small></span>}

                                {this.state.isVissibleCount && this.state.photosCount && this.state.photosCount === iconOne.countPhotos && !iconOne.countPhotos.length && <span><small>0 fotiek</small></span>}

                            </figcaption>
                        </figure>
                    </Link>} />
                </Switch>;
            }
            );

        const addCategory =
                <Route path='/' exact render={ () =>
                    <div className="icon-item add"
                         onClick={handleClickAdd}>
                        <img src={addCategoryIcon} alt="add" width="302" />
                    </div>}
                />


        return (
            <div>
                {show}
                {addCategory}
            </div>
        )};

};

export default Categories
