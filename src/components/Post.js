import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavItem, Button, Dropdown, Icon} from 'react-materialize'
import { callCarregarPostagem, callCarregarComentarios, callExcluirPostagem, callVotar } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import Moment from 'moment'
import Comentarios from './Comentarios'

class Post extends Component {
  componentDidMount() {
    this.props.callCarregarPostagem(this.props.match.params.id)
    this.props.callCarregarComentarios(this.props.match.params.id)
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirPostagem(id)

      this.props.history.push('/')
    }
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'posts', true)
  }

  render() {
    let postagem = this.props.postagem.postagem
    let comentarios = this.props.comentarios.comentarios

    if (postagem.error || postagem.deleted) {
      this.props.history.push('/erro404');
    }

    return (
      <main>
        <section style={{ 'padding':'40px' }} className="post-wrapper">
          <div className="post-header">
            <div>
              <h3>{postagem.title}</h3>
              <span className="small">
                Por {postagem.author} em {Moment.unix(postagem.timestamp/1000).format('DD/MM/YYYY')}
              </span>
              <Link className="categoria-item" to="#">
                {postagem.category !== undefined && capitalize(postagem.category)}
              </Link>
            </div>
            <div className="votes-wrapper">
              <span>{comentarios.length} comentarios | </span>
              <span>{postagem.voteScore} votos</span>
              <span style={{ 'marginRight':'20px', 'color':'#2196F3', 'cursor': 'pointer' }} onClick={() => this.handleVotar(postagem.id, 'upVote')}><Icon small>thumb_up</Icon></span>
              <span style={{ 'color':'#FF5722', 'cursor': 'pointer' }} onClick={() => this.handleVotar(postagem.id, 'downVote')}><Icon small>thumb_down</Icon></span>
            </div>
          </div>
          <hr/>
          <div className="post-body">
            {postagem.body}
          </div>
          <div>
            <Button className="btn-default" style={{ 'marginRight':'5px' }}><Link to={`/postagens/${postagem.id}/editar`}>Editar</Link></Button>
            <Button className="btn-default" onClick={() => this.handleExcluirPostagem(postagem.id)}>Excluir</Button>
          </div>
          <hr/>
        </section>
        <Comentarios id={this.props.match.params.id}/>
      </main>
    )
  }
}

const mapStateToProps = ({ postagem, comentarios }) => ({
  postagem,
  comentarios
})

export default connect(mapStateToProps,
  {
    callCarregarPostagem,
    callCarregarComentarios,
    callExcluirPostagem,
    callVotar
  }
)(Post)
