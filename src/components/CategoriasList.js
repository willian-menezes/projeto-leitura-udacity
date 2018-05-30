import React, { Component } from 'react'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'
import { callCarregarCategorias, selecionarCategoria, callCarregarPostagensPorCategoria, callCarregarPostagens } from '../actions'
import { connect } from 'react-redux'

class CategoriasList extends Component {

  componentDidMount() {
    this.props.callCarregarCategorias()
  }

  handleSelecionarCategoria = (categoria) => {

    this.props.selecionarCategoria(categoria)

    if(categoria == ""){
      this.props.callCarregarPostagens()
    }else{
      this.props.callCarregarPostagensPorCategoria(categoria)
    }

  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <section className="categorias-wrapper">
        <Dropdown trigger={
          <Button className="buttons-select select-categoria">Categorias</Button>
        }>
        <NavItem onClick={() => this.handleSelecionarCategoria('')}>Todas</NavItem>
        {categorias !== undefined && categorias.map((categoria) => (
          <NavItem key={categoria.name} onClick={() => this.handleSelecionarCategoria(categoria.name)}>{capitalize(categoria.name)}</NavItem>
        ))}
        </Dropdown>
      </section>
    )
  }
}

const mapStateToProps = ({ categoria, categorias }) => ({
  categoria,
  categorias
})

export default connect(mapStateToProps,
  {
    callCarregarCategorias,
    selecionarCategoria,
    callCarregarPostagensPorCategoria,
    callCarregarPostagens
  }
)(CategoriasList)
