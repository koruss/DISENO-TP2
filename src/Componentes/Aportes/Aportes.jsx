import React,{ Component } from 'react'
import './Aportes.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header';
import axios from 'axios';

class Aportes extends Component{
/*El constructor de la clase */ 
    constructor(props){
        super(props);
        this.detalleRef=React.createRef();
        this.tipoRef=React.createRef();
        this.codigo_movimientoRef=React.createRef();
    }

    state = {
        tipos:[{value:"Petitoria", label:"Petitoria"}, {value:"Agradecimiento", label:"Agradecimiento"}, {value:"Ofrecimiento", label:"Ofrecimiento"}],
        detalle:"",
        selectedTipo: [],
        codigo_movimiento: ""
    }

   
   /* esta funcion se encarga de recibir la info del componente y lo setea en un  state*/
   
    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    componentWillMount() {
        this.obtenerCodigoMovimiento();
    }

    obtenerCodigoMovimiento(){
        axios.post('/getSesion',{}).then((res) =>{
            this.setState({
                codigo_movimiento:res.data.id_movimiento
            })
        })
    }

    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.detalle != "" && this.state.selectedTipo.length != 0){
            let today = new Date().toLocaleDateString()
            axios.post("/enviarAporte",{
                tipo:this.state.selectedTipo,
                detalle:this.state.detalle,
                id_movimiento:this.state.codigo_movimiento,
                fecha:today
            }).then(res =>{
                if(!res.data.success){
                    alert(res.data.err);
                }
                else{
                    alert("Peticion enviada correctamente");
                    this.detalleRef.current.value="";
                    this.setState({
                        selectedTipo:[]
                    })
                }
            })
        }
        else{
            alert("Ingrese todos los datos")
        }
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeTipo = selectedTipo => {
        this.setState(
            { selectedTipo },     
        );
    };

/* se encarga de renderizar el codigo html*/
render() {
    return (
        <div>
        <Header></Header>
        <main className = "container">
                <div id="center-section">
                    <h2>Enviar un aporte</h2>
                    <div class="form-group">
                        <label for="zona">Seleccione el tipo del aporte:</label>
                        <Select components={makeAnimated} name="tipo" onChange={this.handleChangeTipo} 
                        value={this.state.selectedTipo} options={this.state.tipos} classNamePrefix="select"/>
                    </div>
                </div>
                <div  id="center-section">
                        <label for="detalles" >Detalles:</label>
                        <textarea ref={this.detalleRef} name="detalle" onChange={this.onChange}  rows="10" cols="50"/>
                </div>
                <div class="spacing-base">
                    <button type="button" class="btn btn-dark"  onClick={this.onClick}>Enviar</button>
                </div>
        </main>
    </div>    
    )
};

}

export default Aportes;