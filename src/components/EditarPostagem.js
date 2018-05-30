import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavItem, Button, Dropdown} from 'react-materialize'
import { callCarregarCategorias, callEditarPostagem, callCarregarPostagem } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'

class EditarPostagem extends Component {
  state = {
    titulo: '',
    autor: '',
    categoria: '',
    corpo: ''
  }

  componentDidMount() {
    this.props.callCarregarCategorias()
    this.props.callCarregarPostagem(this.props.match.params.id)

    let postagem = this.props.postagem.postagem

    this.setState({
      titulo: postagem.title,
      autor: postagem.author,
      categoria: postagem.category,
      corpo: postagem.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let postagem = nextProps.postagem.postagem

    this.setState({
      titulo: postagem.title,
      autor: postagem.author,
      categoria: postagem.category,
      corpo: postagem.body
    })
  }

  handleEditarPostagem = (e) => {
    e.preventDefault()

    let postagem = {
      id: this.props.match.params.id,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
      title: e.target.titulo.value,
      category: e.target.categoria.value
    }

    this.props.callEditarPostagem(postagem)

    this.props.history.push('/')
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <main>
        <section style={{ 'padding':'40px' }} className="main-content">
          <form className="post-form" onSubmit={this.handleEditarPostagem}>
            <div className="form-group">
              <label>Título:</label>
              <input
                name="titulo"
                type="text"
                placeholder="Título"
                required
                value={this.state.titulo}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Autor:</label>
              <input
                name="autor"
                type="text"
                placeholder="Autor"
                required
                value={this.state.autor}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Categoria:</label>
              <select name="categoria" value={this.state.categoria} onChange={(e) => this.handleInput(e)}>
                <option value="">Selecione</option>
                {categorias !== undefined && categorias.map((categoria) => (
                  <option key={categoria.name} value={categoria.name}>{capitalize(categoria.name)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Corpo:</label>
              <textarea name="corpo" value={this.state.corpo} onChange={(e) => this.handleInput(e)}/>
            </div>
            <div className="form-group">
              <Button className="btn-default">Editar</Button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categorias, postagem }) => ({
  categorias,
  postagem
})

export default connect(mapStateToProps,
  {
    callCarregarCategorias,
    callEditarPostagem,
    callCarregarPostagem
  }
)(EditarPostagem)
