import React from 'react';

import '../App.scss';

import styles from './AddCategory.module.scss'

import closeIcon from '../../src/img/add-category/zavriet.svg'
import addCategorybutton from '../../src/img/add-category/pridat.svg'


const AddCategory = (props) => {

    return (
        <aside className={styles.formContainer}
                onClick={props.onCloseAddCatClick}>
            <div className={styles.fullViewAdd}>
                <img className={styles.close}
                    src={closeIcon}
                    alt="close"
                    onClick={props.onCloseAddCat} />
                <div className={styles.addCategory}>
                    <p className={styles.textAdd}>PRIDAŤ KATEGÓRIU</p>

                    <form onSubmit={props.onHandleSubmit}>
                        <input
                            className={styles.inputAdd}
                            type="text"
                            onChange={props.onNameCat}
                            placeholder={props.catValue}/>
                    </form>

                    <img className={styles.addButton}
                        src={addCategorybutton}
                        alt="addButton"
                        onClick={props.onAddNewCat}/>
                </div>
            </div>
        </aside>
    )
};

export default AddCategory
