import React,{ Component } from 'react'
import './ConsultarCompGrupo.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Nav,NavDropdown} from 'react-bootstrap';

class ConsultarComposicionGrupo extends Component{
    state = {
        idMovimiento:"",
        idUsuario:"",
        info:[],
        grupos:[],
        selectedGrupo: [],
        pointerNull:'none'

    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });



/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 


    limpiarGrupo(){
        this.state.selectedGrupo = []
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeGrupo = selectedGrupo => {
        const seleccionado=this.state.info.find(element=> element._id==selectedGrupo._id)
        this.setState(
            {selectedGrupo:seleccionado}     
        );
    };
/* Esta funcion se ejecuta automaticamente,
obtiene todas las zonas y las gurada en la ventana*/
    componentDidMount() {
        this.obtenerCodigoMovimiento();
    }

    obtenerCodigoMovimiento(){
        let arreglo = [];
        let respuesta;
        axios.post('/getSesion',{}).then((res) =>{
            console.log(res);
            axios.post("/composicionGrupo", {
                idUsuario:res.data.id_persona,
                tipoUsuario:res.data.tipo
            }).then(data =>{
                respuesta= data.data;
                this.setState({
                    info:respuesta})
                respuesta.forEach(grupo=>{
                    console.log(grupo)
                    arreglo.push({
                        label:grupo.nombre,
                        value:grupo.nombre,
                        _id:grupo._id
                    })
                })
            })
            this.setState({
                
                grupos:arreglo,
                idMovimiento:res.data.id_movimiento,
                idUsuario:res.data.id_persona
            })
        })
    }

    
/* Se encarga de renderizar el html */ 
render() {
    return (
        <div>
        <Header></Header>
        <main className = "container">
                <div id="center-section">
                    <div class="form-group" class="spacing-base">
                        <label for="grupo">Seleccione el grupo:</label>
                        <Select components={makeAnimated} name="grupo" onChange={this.handleChangeGrupo} 
                        options={this.state.grupos} classNamePrefix="select"/>
                    </div>
                </div>
                <button>
                    <Link to = {{ pathname:'/consultarGrupoResult', data:this.state.selectedGrupo }}>Consultar</Link>
                </button>
        </main>
    </div>    
    )
};

}

export default ConsultarComposicionGrupo;