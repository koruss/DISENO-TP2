import React, { Component } from 'react'
import '../../Componentes/General/Utils.css'
import Header from '../General/Header';
import Tree from 'react-hierarchy-tree-graph';
import axios from 'axios';
import '../General/Utils.css'
import PopUp from '../General/PopUp'

const fs = require('fs');

class TreeContainer extends React.PureComponent {
    state = {
        state: false,
        seen: false,
        id: 0,
        arbol2: [{ name: "", children: [] }],
        arbol: [{ name: "", children: [] }],
        zonas: [],
        ramas: [],
        grupos: [],
        selectedNode:null,
        id_movimiento: "",
        // treeData: [
        //     {
        //         name: 'Ejemplo',

        //         children: [
        //             {
        //                 id: "1",
        //                 name: 'Level 2: A',
        //                 children: [
        //                     {
        //                         id: "2",
        //                         name: 'level 2 : a',

        //                     },
        //                     {
        //                         name: 'level 2 : b',
        //                         id: "3"
        //                     }
        //                 ]
        //             },
        //             {
        //                 name: 'Level 2: B',
        //                 id: "4"
        //             },
        //         ],
        //     },
        // ],

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
            height: "100vh",
            border: "5px solid #333"
        }


    }

    onClick = (nodeData, e) => {
        //console.log(nodeData);
        this.setState({
            seen: !this.state.seen,
            selectedNode:nodeData
        })
        //alert(nodeData.name,nodeData.id);
    }



    

    btnClick = (e) => {
        var self = this;
        self.setState({
            arbol2: this.state.arbol
        })
        this.armarArbol();
    }

    translate() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 4
            }
        });
    }

    armarArbol() {
        //let arbol = this.state.arbol;
        let zonas = this.state.zonas;
        let ramas = this.state.ramas;
        let grupos = this.state.grupos;
        zonas.forEach(zona => {
            let arregloRamas = [];
            zona.children.forEach(rama => {
                let arregloGrupo = []
                const ramaExacta = ramas.find(ramita => ramita.id == rama)
                ramaExacta.children.forEach(grupo => {
                    const grupoOriginal = grupos.find(element => element.id == grupo)
                    console.log(grupoOriginal)
                    arregloGrupo.push({ name: grupoOriginal.name, id: grupoOriginal.id, children: [] })
                })
                arregloRamas.push({ name: ramaExacta.name, id: ramaExacta.id, children: arregloGrupo })
            })
            this.state.arbol[0].children.push({ name: zona.name, id: zona.id, children: arregloRamas })
        })

    }
    



    componentDidMount() {
        axios.post("/getSesion",{}).then(res =>{
            this.state.id_movimiento = res.data.id_movimiento
            this.state.arbol[0].name=res.data.nombre_movimiento
            this.state.arbol2[0].name=res.data.nombre_movimiento
            this.render()
        })
        this.translate()
        let arreglo = [];
        let arreglo2 = [];
        let arreglo3 = [];
        var self = this;
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zona => {
                if(zona.idMovimiento == this.state.id_movimiento){
                    arreglo.push({
                        id: zona._id,
                        children: zona.children,
                        name: zona.nombre
                    })
                }
            })
        })
        axios.post("/allRama", {}).then(res => {
            const respuesta2 = res.data;
            respuesta2.forEach(rama => {
                if(rama.idMovimiento == this.state.id_movimiento){
                    arreglo2.push({
                        id: rama._id,
                        children: rama.children,
                        name: rama.nombre
                    })
                }
            })

        })
        axios.post("/allGrupos", {}).then(res => {
            const respuesta3 = res.data;
            respuesta3.forEach(grupo => {
                if(grupo.idMovimiento == this.state.id_movimiento){
                    arreglo3.push({
                        id: grupo._id,
                        children: grupo.children,
                        name: grupo.nombre
                    })
                }
            })
        })
        this.setState({
            zonas: arreglo,
            ramas: arreglo2,
            grupos: arreglo3
        })
        this.armarArbol();

    }

    render() {
        return (
            <div>
                <Header></Header>
                <div style={{ width: "8%", margin: "auto", "margin-top": "15px", "margin-bottom": "15px" }}>
                    <button type="button" class="btn btn-dark" onClick={this.btnClick}>Cargar Jerarquía</button>

                </div>
                <div>
                    {this.state.seen ?<PopUp onClick={this.onClick} data={this.state.selectedNode}/>:null}
                </div>
                <div style={this.state.style} ref={tc => (this.treeContainer = tc)}>
                    <Tree
                        visible={false}
                        onClick={this.onClick}
                        data={this.state.arbol2}
                        nodeSvgShape={this.state.svgSquare}
                        orientation={"vertical"}
                        collapsible={false}
                        translate={this.state.translate}
                    />
                </div>


            </div>

        )
    };
}
export default TreeContainer;