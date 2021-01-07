import React, { Component } from 'react'
import '../../Componentes/General/Utils.css'
import Header from '../General/Header';
import Tree from 'react-hierarchy-tree-graph';
import axios from 'axios';
import '../General/Utils.css'
const fs = require('fs');

class TreeContainer extends React.PureComponent {
    state = {
        aux: true,
        id: 0,
        arbol: [{ name: "Movilize", children: [] }],
        zonas: [],
        ramas: [],
        grupos: [],
        /*      treeData: [
                  {
                    name: 'Ejemplo',
      
                    children: [
                      {
                        name: 'Level 2: A',
                        id:1,
                        children:[
                            {
                                name:'level 2 : a',
                                id:35
                            },
                            {
                              name:'level 2 : b',
                              id:36
                            }
                        ]
                      },
                      {
                        name: 'Level 2: B',
                        attributes:{
                            id:2
                        },
                      },
                    ],
                  },
                ],*/

        svgSquare: {
            shape: 'rect',
            shapeProps: {
                width: 20,
                height: 20,
                x: -10,
                y: -10,
            }
        },

        style: {
            width: "100%",
            height: "100vh"
        }


    }

    onClick = (nodeData, e) => {
        console.log(nodeData.name);
        console.log(e);
        alert("Has clickeado un nodo nindo");
    }

    btnClick = (e) => {
        var self = this;
        this.armarArbol();
    }

    translate() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: 30,
            }
        });
    }

    armarArbol() {
        let arbol = this.state.arbol;
        let zonas = this.state.zonas;
        let ramas = this.state.ramas;
        let grupos = this.state.grupos;

        // zonas.forEach(zona=>{
        //     let arregloRamas=[];
        //     zona.children.forEach(idRama=>{
        //         const rama= ramas.find(element =>element.id==idRama)
        //         console.log(rama)
        //         arregloRamas.push(rama)
        //     })
        // })

        zonas.forEach(zona => {
            console.log("zona")
            console.log(zona)
            let arregloRamas = [];
            zona.children.forEach(rama => {//ingreso al arreglo de ramas que esta en el doc zona
                let arregloGrupo = []
                const ramaExacta = ramas.find(ramita => ramita.id == rama)//entro a todas las ramas y saco el que tnga match
                console.log(ramaExacta)
                ramaExacta.children.forEach(grupo => {
                    const grupoOriginal = grupos.find(element => element.id = grupo)
                    //                    if(grupoOriginal.monitores.length != 0){
                    //                       this.state.id=(this.state.id+1)
                    console.log("grupoOriginal")
                    console.log(grupoOriginal)
                    arregloGrupo.push({ name: grupoOriginal.name, id: grupoOriginal.id, children: [] })
                    //                   }                 
                })
                this.state.id = (this.state.id + 1)
                arregloRamas.push({ name: ramaExacta.name, id: ramaExacta.id, children: arregloGrupo })
            })
            this.state.id = (this.state.id + 1)
            this.state.arbol[0].children.push({ name: zona.name, id: zona, children: arregloRamas })
        })
        // ramas.forEach(rama=>{
        //     let nombreZona= rama.nombreZona;

        // })
        // for(var i=0; i<zonas.length;i++){
        //     console.log(zonas[i]);
        //     this.state.arbol[0].children.push({name:zonas[i].nombreZona,id:zonas[i]._id, children:[]})
        // }
        console.log(arbol)
    }




    componentDidMount() {
        let arreglo = [];
        let arreglo2 = [];
        let arreglo3 = [];
        var self = this;
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zona => {
                arreglo.push({
                    id: zona._id,
                    children: zona.children,
                    name: zona.nombre
                })
            })
        })
        axios.post("/allRama", {}).then(res => {
            const respuesta2 = res.data;
            respuesta2.forEach(rama => {
                arreglo2.push({
                    id: rama._id,
                    children: rama.children,
                    name: rama.nombre
                })
            })

        })
        axios.post("/allGrupos", {}).then(res => {
            const respuesta3 = res.data;
            respuesta3.forEach(grupo => {
                arreglo3.push({
                    id: grupo._id,
                    children: grupo.children,
                    name: grupo.nombre
                })
            })
        })

        this.setState({
            zonas: arreglo,
            ramas: arreglo2,
            grupos: arreglo3
        })

    }

    render() {
        return (
            <div>
                <Header></Header>
                <div style={{ width: "8%", margin: "auto", "margin-top": "15px", "margin-bottom": "15px" }}>
                    <button type="button" class="btn btn-dark" onClick={this.btnClick}>Cargar Jerarquía</button>

                </div>

                <div style={this.state.style} ref={tc => (this.treeContainer = tc)}>

                </div>

            </div>

        )
    };
}
export default TreeContainer;