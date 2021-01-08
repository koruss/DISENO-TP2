import React,{ Component } from 'react'
import './ReporteAportes.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header';
import axios from 'axios';

class ReporteAportes extends Component{
/*El constructor de la clase */ 
    constructor(props){
        super(props);
    }

    state = {
        agradecimientos: Array,
        ofrecimientos: Array,
        petitorias: Array
    }

   
   /* esta funcion se encarga de recibir la info del componente y lo setea en un  state*/
   
    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    componentWillMount() {
        this.obtenerAportes();
        //this.obtenerAportes();
    }

    obtenerAportes(){
        axios.post('/getSesion',{}).then((res) =>{
            axios.post('/obtenerAportes',{
                id_movimiento:res.data.id_movimiento
                }).then((res) =>{
                this.setState({
                    agradecimientos:res.data.agradecimiento,
                    ofrecimientos:res.data.ofrecimiento,
                    petitorias:res.data.petitoria
                })
            })
        })
    }

    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        
    }



/* se encarga de renderizar el codigo html*/
render() {
    return (
        <div>
        <Header></Header>
        <main className = "container">
            <div  class="spacing-base"></div>
                <div id="center-section">
                    <h2>Reporte de aportes</h2>
                    <div class="form-group"  class="spacing-base">
                        <label for="agradecimiento">Aportes de agradecimiento: {this.state.agradecimientos.length}</label>
                    </div>
                    <div class="form-group"  class="spacing-base">
                        <label for="agradecimiento">Aportes de ofrecimiento: {this.state.ofrecimientos.length}</label>
                    </div>
                    <div class="form-group"  class="spacing-base">
                        <label for="agradecimiento">Aportes de petitoria: {this.state.petitorias.length}</label>
                    </div>
                </div>
                <div class="spacing-base">
                    <button type="button" class="btn btn-dark"  onClick={this.onClick}>Descargar datos</button>
                </div>
        </main>
    </div>    
    )
};

}

export default ReporteAportes;