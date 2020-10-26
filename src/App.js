import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';

import './App.scss';

import AddCategory from './components/AddCategory'
import Categories from './components/Categories'
import TheSpecificCategory from './components/TheSpecificCategory'


class App extends Component {

  constructor () {
    super()

    this.state = {
      icons: [],
      categoryValue: 'ZADAJTE NÁZOV KATEGÓRIE',
      startCategoryValue: 'ZADAJTE NÁZOV KATEGÓRIE',
      isVissibleAdd: false,
      specificCategory: true,
      nameCategories: '',

      specificKey: '',
      keyCategories: '',

      api: 'http://api.programator.sk/'

    };
  }


  componentDidMount = () => {
        const api = this.state.api;

        fetch(`${api}gallery`, {  method: 'GET',
                                                    headers: {'Content-Type':'application/json'},
                                                    mode: 'cors',
                                                    cache: 'default'
                                                  })
        .then( res => res.json() )
        .then( data =>  this.getGalleries(data.galleries))
        .catch(this.showError)

                  /*const newCat = {
                    name: this.state.name,
                  };

                  const request = new Request(`${api}gallery/trapissa%3F` , {
                    method: 'DELETE',
                    body: JSON.stringify(newCat),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                fetch(request)
                  .then(res => res.json())
                  .then(resp => this.setState(state => {
                        return {
                            icons: [...state.icons, resp]
                        }
                }))*/
      };


  getGalleries = (data) => {
        const api = this.state.api;

        this.setState({
              icons: data
        })

        let iconsState = this.state.icons;

        iconsState.length && iconsState.map( i => i && fetch(`${api}gallery/` + i.path)
            .then(resp => resp.json() )
            .then(dat => this.addPhotoArrays(dat))
            .catch(this.showError)
          )
  }


  addPhotoArrays = (data) => {
        console.log(data);

        if (data.code === 404) {
          return
        } else {
          const countPhotos = data.images;
          this.setState( state => {
            return {
              icons: state.icons.map(i => i.path === data.gallery.path ? {...i, countPhotos} : i  )
          }
          })
        }

  }


  handleClickAdd = () => {
        this.setState({
          isVissibleAdd: true
        });
  }


  handleSubmit = event => {
        const api = this.state.api;

        event.preventDefault();

        if(this.state.name) {

          const newCat = {
              name: this.state.name,
          };

          const request = new Request(`${api}gallery`, {
              method: 'POST',
              body: JSON.stringify(newCat),
              headers: {
                'Content-Type': 'application/json'
            }
          })

            fetch(request)
              .then( res => res.json())
              .then( resp => this.setState( state => {
                              return{
                                  icons: [...state.icons, {...resp, countPhotos:[]}]
                              }
              }))

          this.setState( st => {
            return{
              categoryValue: this.state.startCategoryValue,
              isVissibleAdd: false,
              name: ''
            }
          })

        }
  }


  handleNameCat = event => {
        this.setState({
          categoryValue: event.target.value,
          name: event.target.value
        })
  };


  handleCloseAddCat = () => {
        this.setState({
          categoryValue: this.state.startCategoryValue,
          isVissibleAdd: false
        });
  }

  handleCloseAddCatOnClick = (e) => {
    if(e.target === e.currentTarget) {
      this.setState({
        categoryValue: this.state.startCategoryValue,
        isVissibleAdd: false
      });
    }
  }


  handleShowCategory = (data, name) => {

        this.setState({
          specificCategory: false,
          specificKey: data,
          nameCategories: name
        });

        const headerTextCategory = document.getElementsByClassName('category-header')[0];

        headerTextCategory.innerText = "⟵\xa0\xa0\xa0\xa0" + name;
        headerTextCategory.addEventListener('click', () => {
          this.setState({
            specificCategory: true,
          })
          headerTextCategory.innerText = "KATEGÓRIE";
        })
  }


  handleNewPic = (data) => {
        this.setState({
          specificKey: [...this.state.specificKey, data.name]
        })
  }


  handleUpdateState = data => {

    let n = data[0].fullpath.indexOf('/');
    let sameName = data[0].fullpath.substring(0, n);

    this.setState( state => {
        return{
          icons: state.icons.map( item => item.path === sameName ?
            {...item, countPhotos:data, image:data[0]} : item )
        }
    })
  }




  render() {

    const header =
        <header>
            <aside className="bckgr" id="change-bg" >
            </aside>

          <aside className="bckgr" id="previous-change-bg" >
            </aside>

            <div className="headers">
              <h4 className="fotogallery">FOTOGALÉRIA</h4>
              <NavLink to='/' exact className="category-header">KATEGÓRIE</NavLink>
            </div>
            <hr className="line"/>
        </header>



    const logoBart = <aside className="bart">
      <img src="./img/bart-sk.png" alt="bart.sk" />
    </aside>


    return (

      <div>
        {header}

        <section className="img-row group" >


          <Categories
              icons={this.state.icons}
              showCategory={this.handleShowCategory}
              handleClickAdd={this.handleClickAdd}
              api={this.state.api}
          />

          <Switch>
            <Route path='/category' exact render={ () =>
              <TheSpecificCategory
                  uniqueImgSrc={this.state.specificKey}
                  addNewPic={this.handleNewPic}
                  nameCategory={this.state.nameCategories}
                  onUpdateState={this.handleUpdateState}
                  api={this.state.api}
              />
            }/>
          </Switch>


            {this.state.isVissibleAdd &&
                <AddCategory
                  onNameCat={this.handleNameCat}
                  onCloseAddCat={this.handleCloseAddCat}
                  onHandleSubmit={this.handleSubmit}
                  catValue={this.state.categoryValue}
                  onAddNewCat={this.handleSubmit}
                  onCloseAddCatClick={this.handleCloseAddCatOnClick}/>
            }

            {logoBart}

        </section>

      </div>
    )
  }
}

export default App;


