import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  callCarregarCategorias, callCriarPostagem } from '../actions'
import { NavItem, Button, Dropdown} from 'react-materialize'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'

class CriarPostagem extends Component {
  componentDidMount() {
    this.props.callCarregarCategorias()
  }

  handleCriarPostagem = (e) => {
    e.preventDefault()

    let postagem = {
      id: Date.now(),
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
      title: e.target.titulo.value,
      category: e.target.categoria.value
    }

    this.props.callCriarPostagem(postagem)

    this.props.history.push('/')
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <main>
        <section style={{ 'padding':'40px' }} className="main-content">
          <form className="post-form" onSubmit={this.handleCriarPostagem}>
            <div className="form-group">
              <label>Título:</label>
              <input
                name="titulo"
                type="text"
                placeholder="Título"
                required
              />
            </div>
            <div className="form-group">
              <label>Autor:</label>
              <input
                name="autor"
                type="text"
                placeholder="Autor"
                required
              />
            </div>
            <div className="form-group">
              <label>Categoria:</label>

              <select name="categoria">
                <option value="">Selecione</option>
                {categorias !== undefined && categorias.map((categoria) => (
                  <option key={categoria.name} value={categoria.name}>{capitalize(categoria.name)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Corpo:</label>
              <textarea
                name="corpo"
              ></textarea>
            </div>
            <div className="form-group">
              <Button className="btn-default">Criar</Button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categorias }) => ({
  categorias
})

export default connect(mapStateToProps,
  {
    callCarregarCategorias,
    callCriarPostagem
  }
)(CriarPostagem)
