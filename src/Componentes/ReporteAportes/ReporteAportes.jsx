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
        id_persona: "",
        id_movimiento: ""
    }

   
   /* esta funcion se encarga de recibir la info del componente y lo setea en un  state*/
   
    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    componentWillMount() {
        this.obtenerAportes();
    }

    obtenerAportes(){
        axios.post('/getSesion',{}).then((res) =>{
            this.setState({
                id_persona:res.data.id_persona,
                id_movimiento:res.data.id_movimiento
            })
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


    limpiarBandeja = (e) => {
        axios.post('/getSesion',{}).then((res) =>{
            axios.post('/limpiarBandeja',{
                id_movimiento:res.data.id_movimiento
                }).then((res) =>{
                    if(!res.data.success){
                        alert(res.data.error);
                    }
                    else{
                        alert("Bandeja limpia");
                        this.obtenerAportes();
                    }
            })
        })
    }

    enviarReporteMes = (e) => {
        let date = new Date();
        let totalAportes = this.state.agradecimientos.length + this.state.petitorias.length
        + this.state.ofrecimientos.length;
        const mensaje = "En el mes: "+ date.getMonth()+1 +" se recibieron " + totalAportes + " aportes";
        axios.post("/CrearNoticia",{
            autorNombre: "Anonimo",
            autor_id: this.state.id_persona,
            noticia: mensaje,
            nivel: { _id: this.state.id_movimiento, etiqueta: "0"}
        }).then(res=>{
            if(!res.data.success){
                alert(res.data.error);
            }else{
                alert("Estadisticas enviadas correctamente")
            }
        })
        alert("Estadisticas enviadas correctamente")
    }

    enviarEstadisticas = (e) => {
        let date = new Date();
        let aportesAgradecimiento = this.state.agradecimientos.length + " aportes de agradecimiento";
        let aportesOfrecimiento = this.state.ofrecimientos.length + " aportes de ofrecimiento";
        let aportesPetitoria = this.state.petitorias.length + " aportes de petitoria";
        const mensaje = "En el mes: "+ date.getMonth()+1 +" se recibieron " + aportesAgradecimiento + ", "+ aportesOfrecimiento +
        " y " + aportesPetitoria;
        axios.post("/CrearNoticia",{
            autorNombre: "Anonimo",
            autor_id: this.state.id_persona,
            noticia: mensaje,
            nivel: { _id: this.state.id_movimiento, etiqueta: "0"}
        }).then(res=>{
            if(!res.data.success){
                alert(res.data.error);
            }else{
                alert("Estadisticas enviadas correctamente")
            }
        })
        alert("Estadisticas enviadas correctamente")
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
                <div className="label-wrapper">
                    <button type="button" class="btn btn-dark"  onClick={this.onClick}>Descargar datos</button>
                </div>
                <div className="label-wrapper"> 
                    <button type="button" class="btn btn-dark"  onClick={this.limpiarBandeja} position="float">Limpiar bandeja</button>
                </div>
                <div className="label-wrapper"> 
                    <button type="button" class="btn btn-dark"  onClick={this.enviarEstadisticas} position="float">Enviar estadisticas detalladas</button>
                </div>
                <div className="label-wrapper"> 
                    <button type="button" class="btn btn-dark"  onClick={this.enviarReporteMes} position="float">Enviar estadisticas por mes</button>
                </div>
        </main>
    </div>    
    )
};

}

export default ReporteAportes;