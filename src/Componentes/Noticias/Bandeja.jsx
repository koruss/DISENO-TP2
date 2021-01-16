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
    }

    state = {
        noticias: [{ noticia: "Esto es una noticia", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" }, ,
        { noticia: "Esto es una noticia x2", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" },
        { noticia: "Esto es una noticia x3", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" },
        { noticia: "Esto es una noticia x4", isPendiente: true, autor: "Lombas el bromas", fecha: "15/10/1996", procedencia: "Rama: San Jose, Zona:San Jose" }],
        style: {

        }
    }


    componentDidMount() {
        axios.post("/getSesion", {}).then(res => {
            this.setState({
                session: res.data
            });

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
                                    (<CardNoticia index={"Noticia"} noticiaData={p} session={this.state.session} />))
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