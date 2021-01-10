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
        petitorias: Array,
    }

   
   /* esta funcion se encarga de recibir la info del componente y lo setea en un  state*/
   
    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    componentWillMount() {
        this.obtenerAportes();
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
        const element = document.createElement("a");
        var prueba = []
        prueba.push("Reporte de aportes \n");

        prueba.push("\nPetitorias\n");
        for(var i = 0; i<this.state.petitorias.length; i++){
            const petitoria = this.state.petitorias[i];
            prueba.push("Nombre: "+petitoria.nombre+
            " Fecha: "+petitoria.fecha+" Detalle: "+
            petitoria.detalle+"\n");
        }

        prueba.push("\nAgradecimientos\n");
        for(var i = 0; i<this.state.agradecimientos.length; i++){
            const agradecimiento = this.state.agradecimientos[i];
            prueba.push("Nombre: "+agradecimiento.nombre+
            " Fecha: "+agradecimiento.fecha+" Detalle: "+
            agradecimiento.detalle+"\n");
        }

        prueba.push("\nOfrecimientos\n");
        for(var i = 0; i<this.state.ofrecimientos.length; i++){
            const ofrecimiento = this.state.ofrecimientos[i];
            prueba.push("Nombre: "+ofrecimiento.nombre+
            " Fecha: "+ofrecimiento.fecha+" Detalle: "+
            ofrecimiento.detalle+"\n");
        }

        const file = new Blob(prueba,    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "datos_Aportes.txt";
        document.body.appendChild(element);
        element.click();
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