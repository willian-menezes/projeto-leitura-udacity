import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavItem, Button, Dropdown, Icon} from 'react-materialize'
import { callCarregarComentarios, callCriarComentario, callExcluirComentario, callVotar } from '../actions'
import { connect } from 'react-redux'
import Moment from 'moment'
import sortBy from 'sort-by'

class Comentarios extends Component {
  state = {
    ordem: 'voteScore'
  }

  componentDidMount() {
    this.props.callCarregarComentarios(this.props.id)
  }

  handleCriarComentario = (e) => {
    e.preventDefault()

    let comentario = {
      id: Date.now(),
      parentId: this.props.id,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
    }

    this.props.callCriarComentario(comentario)

    this.props.callCarregarComentarios(this.props.id)
  }

  handleExcluirComentario = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirComentario(id)
      this.props.callCarregarComentarios(this.props.id)
    }
    
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'comments')
  }

  render() {
    let comentarios = this.props.comentarios.comentarios

    comentarios.sort(sortBy(`-${this.state.ordem}`))

    return (
      <section style={{ 'padding':'40px' }} className="comentarios-wrapper">
        <ul>
          {comentarios !== undefined && comentarios.map((comentario) => (
            <li key={comentario.id} className="comentario">
              <div><b>{comentario.author} em {Moment.unix(comentario.timestamp/1000).format('DD/MM/YYYY')}:</b></div>
              <div className="comentario-body">
                {comentario.body}
              </div>
              <div className="comentario-footer">
                <div>
                  <Button className="btn-default" style={{'marginRight':'5px'}}><Link to={`/comentarios/${comentario.id}/editar`}>Editar</Link></Button>
                  <Button className="btn-default" onClick={() => this.handleExcluirComentario(comentario.id)}>Excluir</Button>
                </div>
                <div className="votes-wrapper">
                  <span>{comentario.voteScore} votos</span>
                  <span style={{ 'marginRight':'20px', 'color':'#2196F3', 'cursor': 'pointer' }} onClick={() => this.handleVotar(comentario.id, 'upVote')}><Icon small>thumb_up</Icon></span>
                  <span style={{ 'color':'#FF5722', 'cursor': 'pointer' }} onClick={() => this.handleVotar(comentario.id, 'downVote')}><Icon small>thumb_down</Icon></span>
                </div>
              </div>
              <hr/>
            </li>
          ))}
        </ul>
        <hr/>
        <form className="comentario-form" onSubmit={this.handleCriarComentario}>
          <div style={{'marginBottom':'10px'}}><b>Comentar</b></div>
          <input name="autor" type="text" placeholder="Autor" style={{'marginBottom':'10px'}} required/>
          <br/>
          <textarea name="corpo" placeholder="Corpo do comentário" required/>
          <br/>
          <Button className="btn-default">Comentar</Button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({ comentarios, comentario, ordem }) => ({
  comentarios,
  comentario,
  ordem
})

export default connect(mapStateToProps,
  {
    callCarregarComentarios,
    callCriarComentario,
    callExcluirComentario,
    callVotar
  }
)(Comentarios)
