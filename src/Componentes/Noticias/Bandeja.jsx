import React, { Component } from 'react'
import Header from '../General/Header';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button';
import CardNoticia from './CardNoticia';


class Bandeja extends Component {
    constructor(props) {
        super(props);
        //this.state = {renderChild: true};
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }

    state = {
        noticias:[],
        // noticias: [{ render:true,noticia: "Esto es una noticia", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" }, ,
        // {render:true, noticia: "Esto es una noticia x2", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" },
        // { render:true,noticia: "Esto es una noticia x3", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" },
        // { render:true,noticia: "Esto es una noticia x4", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" }],
        style: {

        },
        session:null
    }

    componentDidMount() {
        axios.post("/getSesion", {}).then(res => {
            this.setState({
                session: res.data
            });
            this.obtenerNoticias(this.state.session.id_persona)   
        })
        
    }

    obtenerNoticias(_id){
        let arreglo=[];
        //console.log("respuesta");
        axios.post("/infoPersona",{_id:_id}).then(res =>{
            const noticias= res.data.noticias;
            console.log(noticias)
            noticias.forEach(element =>{
                console.log(element)
                if(element.isPendiente==true){
                    arreglo.push({
                        render:true,
                        _id:element._id,
                        noticia:element.noticia,
                        fecha:element.fecha,
                        autor:element.autor,
                        //procedencia:element.procedencia
                    })
                }
            })
            this.setState({
                noticias:arreglo
            })   
        })
    }



    



    handleChildUnmount(index,id){
        let noticias=this.state.noticias
        noticias[index].render=false
        this.setState({
            noticias:noticias
        })

        axios.post("/updateEstadoNoticia",{idNoticia:id,idUsuario:this.state.session.id_persona}).then(res=>{
            if(!res.data.success){
                alert(res.data.error);
            }
            else{
                alert("Eliminado de tus noticias :3")
            }

        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div id="center-section">
                    <div className="spacing-base">
                        <div class="border">
                            <div class="box-container">
                                {this.state.noticias.map((p, index) =>
                                    (this.state.noticias[index].render ? <CardNoticia index={"Noticia"} noticiaData={p} session={this.state.session} unmountMe={this.handleChildUnmount} index={index} />:null))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bandeja;