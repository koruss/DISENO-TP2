import React, { Component } from "react";
import './PopUp.css'

// Clase encargada de la visualización header en todas las ventanas
// en la aplicación
class PopUp extends Component {


    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
  handleYes = () =>{
    this.props.toggle();
    this.props.action();
  }

  handleClick = () => {
    this.props.toggle();
  };

  // En esta parte se hace el diseño del popup
  // y se llama a las funciones anteriores.
  render() {
    return (    
      <div className="popUp">
          <div className="modal_content">
              <span className="close" onClick={this.handleClick}>&times;    </span>
              <h3>WARNING</h3>
      <label style={{margin:"5px"}}>{this.props.question}</label>
              <div className="popupBtn-container">
                <input type="button" className="popup-Btn" id="addBtn" onClick={this.handleYes}/>
                <label for="addBtn" className="addBtn">Yes</label>
                <input type="button" className="popup-Btn" id="deleteBtn" onClick={this.handleClick}/>
                <label for="deleteBtn" className="deleteBtn">No</label>
              </div>
          </div>
      </div>
    );
  }
}

export default PopUp