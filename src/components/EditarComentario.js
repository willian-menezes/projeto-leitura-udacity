import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavItem, Button, Dropdown} from 'react-materialize'
import { callEditarComentario, callCarregarComentario } from '../actions'
import { connect } from 'react-redux'

class EditarComentario extends Component {
  state = {
    autor: '',
    corpo: ''
  }

  componentDidMount() {
    this.props.callCarregarComentario(this.props.match.params.id)

    let comentario = this.props.comentario.comentario

    this.setState({
      autor: comentario.author,
      corpo: comentario.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let comentario = nextProps.comentario.comentario

    if(comentario.deleted) {
      this.props.history.push('/erro404')
    }

    this.setState({
      autor: comentario.author,
      corpo: comentario.body
    })
  }

  handleEditarComentario = (e) => {
    e.preventDefault()

    let comentario = {
      id: this.props.match.params.id,
      parentId: this.props.comentario.comentario.parentId,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
    }

    this.props.callEditarComentario(comentario)

    this.props.history.push('/postagens/' + this.props.comentario.comentario.parentId)
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <main>
        <section style={{ 'padding':'40px' }} className="main-content">
          <form className="post-form" onSubmit={this.handleEditarComentario}>
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

const mapStateToProps = ({ comentario }) => ({
  comentario
})

export default connect(mapStateToProps,
  {
    callCarregarComentario,
    callEditarComentario
  }
)(EditarComentario)
