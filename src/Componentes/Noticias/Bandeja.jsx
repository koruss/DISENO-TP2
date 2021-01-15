import React, { Component } from 'react'
import Header from '../General/Header';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button'


class Bandeja extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        noticias:[]

    }

    render() {
        return (
            <div>
                <Header></Header>
                <div id="center-section">
                    <div className="spacing-base">
                        <div class="border">
                            <div class="box-container">

                            </div>

                        </div>

                    </div>


                </div>
            </div>

        )
    }
}

export default Bandeja;