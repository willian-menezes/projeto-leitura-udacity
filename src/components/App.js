import React, { Component } from 'react'
import '../index.css'
import {Navbar, NavItem, Button} from 'react-materialize'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CategoriasList from './CategoriasList'
import PostsList from './PostsList'
import CriarPostagem from './CriarPostagem'
import EditarPostagem from './EditarPostagem'
import EditarComentario from './EditarComentario'
import Post from './Post'
import Erro404 from './Erro404'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <Navbar brand='Postagens' right> </Navbar>
        </header>
        <Switch>
          <Route exact path='/' render={(props) => (
            <main>
              <CategoriasList {...props}/>
              <PostsList {...props}/>
            </main>
          )}/>
          <Route exact path='/erro404' component={Erro404}/>
          <Route exact path='/:categoria' render={(props) => (
            <main>
              <CategoriasList {...props}/>
              <PostsList {...props}/>
            </main>
          )}/>
          <Route exact path='/postagens/criar' component={CriarPostagem}/>
          <Route exact path='/:categoria/:id' component={Post}/>
          <Route exact path='/postagens/:id/editar' component={EditarPostagem}/>
          <Route exact path='/comentarios/:id/editar' component={EditarComentario}/>
          <Route component={Erro404} />
        </Switch>
      </div>
    );
  }
}

export default App;
