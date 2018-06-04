import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { callCarregarPostagens, callCarregarPostagensPorCategoria, callExcluirPostagem, selecionarOrdem, callVotar } from '../actions'
import Moment from 'moment'
import sortBy from 'sort-by'
import moment from 'moment'
import { Card, CardTitle, Icon, NavItem, Dropdown, Button } from 'react-materialize'

class PostsList extends Component {
  state = {
    ordem: 'voteScore'
  }

  componentDidMount() {
    let categoria = this.props.match.params.categoria

    this.loadPosts(categoria);
  }

  componentWillReceiveProps(nextProps) {

    let oldCategoria = this.props.match.params.categoria;
    let newCategoria = nextProps.match.params.categoria;

    if(newCategoria != oldCategoria){
      this.loadPosts(newCategoria)
    }

    let ordem = nextProps.ordem.ordem

    this.setState({
      ordem: ordem
    })
  }

  loadPosts = (categoria) => {
    if(categoria === undefined) {
      this.props.callCarregarPostagens()
    } else {
      this.props.callCarregarPostagensPorCategoria(categoria)
    }
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirPostagem(id)
    }
  }

  handleSelecionarOrdem = (ordem) => {
    this.props.selecionarOrdem(ordem)
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'posts')
  }

  goToPage = (rote) => {
    this.props.history.push(rote)
  }

  render() {
    let postagens = this.props.postagens.postagens

    postagens.sort(sortBy(`-${this.state.ordem}`))

    return (
      <section style={{ 'padding':'40px' }} className="posts-table-wrapper">

        <Button floating large className='more-btn add-new-post ' waves='light' icon='add' onClick={() => this.goToPage("/postagens/criar")} />

        <Dropdown trigger={
          <Button className="buttons-select select-order">ordenar-por</Button>
        }>
          <NavItem onClick={() => this.handleSelecionarOrdem('voteScore')}>Votos</NavItem>
          <NavItem onClick={() => this.handleSelecionarOrdem('timestamp')}>Data</NavItem>
        </Dropdown>

        {postagens !== undefined && postagens.map((postagem) => (
          <Card
            key={postagem.id}
            title={[
              <span>{postagem.title}</span>,
              <span className="author"> - {postagem.author}</span>
            ]}
            style={{ 'position':'relative' }}
            actions={[
              <ul style={{ 'position':'relative' }}>
                <li className='actions-post'><b>Score:</b> {postagem.voteScore}</li>
                <li style={{ 'marginLeft':'68px', 'color':'#2196F3' }} className='actions-post' onClick={() => this.handleVotar(postagem.id, 'upVote')}><Icon small>thumb_up</Icon></li>
                <li style={{ 'color':'#FF5722' }} className='actions-post' onClick={() => this.handleVotar(postagem.id, 'downVote')}><Icon small>thumb_down</Icon></li>
              </ul>,
              <Button floating fab='horizontal' icon='more_vert' className='more-btn' large>
                <Button floating icon='visibility' className='green' onClick={() => this.goToPage(`/${postagem.category}/${postagem.id}`)}>Ver</Button>
                <Button floating icon='mode_edit' className='blue' onClick={() => this.goToPage(`/postagens/${postagem.id}/editar`)}>Editar</Button>
                <Button floating icon='delete_forever' className='red' onClick={() => this.handleExcluirPostagem(postagem.id)}>Excluir</Button>
              </Button>
            ]}>
            {postagem.body}
            <span className="date-post"><b>{postagem.category}</b> - {moment(postagem.timestamp).format("DD/MM/YY HH:mm")}</span>
            <span className="date-post">{postagem.commentCount} Comments</span>
          </Card>
        ))}
      </section>
    )
  }
}

const mapStateToProps = ({ postagens, postagem, ordem }) => ({
  postagens,
  postagem,
  ordem
})

export default connect(
  mapStateToProps,
  {
    callCarregarPostagens,
    callCarregarPostagensPorCategoria,
    callExcluirPostagem,
    selecionarOrdem,
    callVotar
  }
)(PostsList)
