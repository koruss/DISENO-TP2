import Axios from "axios";
import React, { Component } from "react";
import './PopUp.css'

// Clase encargada de la visualización header en todas las ventanas
// en la aplicación
class PopUp extends Component {
  state={
    data:null,
    miembros:[]
  }


    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
  handleYes = () =>{
    this.props.toggle();
    this.props.action();
  }

  handleClick = () => {
    this.props.onClick();
  };

  componentDidMount(){
    Axios.post("/nodeData",{idNodo:this.state.data.id}).then(res=>{
      console.log(res)
      this.setState({
        miembros:res.data.miembros

      })
    })
  }

  // En esta parte se hace el diseño del popup
  // y se llama a las funciones anteriores.
  render() {
    console.log("ASDASDASD")
    this.state.data=this.props.data
    return (    
      
      <div className="popUp">
          <div className="modal_content">
              <span className="close" onClick={this.handleClick}>&times;    </span>
              <h3>Miembros:</h3>
              <div>
           {this.state.miembros.map((p,index)=>
            (<h4>{"- "+p.nombre +" "+ p.apellido1 +" "+ p.apellido2}</h4>))
            } 
          </div>
          </div>

      </div>
    );
  }
}

export default PopUp