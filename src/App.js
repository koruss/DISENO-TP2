import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import './App.css';
import './Componentes/General/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Componentes/General/Header';
import Login from './Componentes/Login/Login';
import CrearGrupo from './Componentes/Paginas/CrearGrupo';
import CrearRama from './Componentes/Paginas/CrearRama';
import CrearZona from './Componentes/Paginas/CrearZona';
import RegistroMiembro from './Componentes/RegistroMiembro/RegistroMiembro';
import TrasladarMiembro from './Componentes/TrasladarMiembro/TrasladarMiembro';
import TreeContainer from './Componentes/Tree/TreeContainer';
import CambiarNombreGrupo from './Componentes/CambiarNombreGrupo/CambiarNombreGrupo';
import ConsultaMiembroXElemento from './Componentes/Consultas/miembrosXelemento';
import AfiliacionMiembros from './Componentes/AfiliacionMiembros/AfiliacionMiembros';
import AsignacionMiembros from './Componentes/AsignacionMiembros/AsignacionMiembros';
import ConsultaGruposRolesXMiembro from './Componentes/GrupoRolesXMiembro/GrupoRolesXMiembro';
import ConsultaCompGrupo from './Componentes/ConsultarComposicionGrupo/ConsultarCompGrupo';
import ConsultarGrupoResult from './Componentes/ConsultarComposicionGrupo/ConsultarGrupoResult';
import VentanaAsesor from './Componentes/VentanaAsesor/VentanaAsesor';
import VentanaMiembro from './Componentes/VentanaMiembro/VentanaMiembro';
import VentanaJefe from './Componentes/VentanaJefe/VentanaJefe';
import arbolEstructural from './Componentes/Tree/TreeContainer';
import contacto from './Componentes/Contacto/Contacto';
import PosiblesMonitores from './Componentes/PosiblesMonitores/PosiblesMonitores';
import SignUp from './Componentes/SignUp/SignUp';

//Funcion para establecer las rutas de la aplicacion con su respectivo componente
function App() {
    return (
    <Router>
      <div>
        <Switch>   
          {/*                     Funcionalidades                  */} 
          <Route exact path="/" component={Login}/>;
          <Route path="/ventanaAsesor" component={VentanaAsesor}/> 
          <Route path="/ventanaMiembro" component={VentanaMiembro}/> 
          <Route path="/ventanaJefe" component={VentanaJefe}/> 
          <Route path="/login" component={Login}/> 
          <Route path="/SignUp" component={SignUp}/> 
          <Route path="/registroMiembro" component={RegistroMiembro}/> 
          <Route path="/trasladoMiembro" component={TrasladarMiembro}/> 
          <Route path="/creacionZona" component={CrearZona}/> 
          <Route path="/creacionRama" component={CrearRama}/> 
          <Route path="/creacionGrupo" component={CrearGrupo}/> 
          <Route path="/cambiarNombreGrupo" component={CambiarNombreGrupo}/> 
          <Route path="/arbolEstructural" component={TreeContainer}/> 
          <Route path="/contacto" component={contacto}/> 
          <Route path="/PosiblesMonitores" component={PosiblesMonitores}/> 
                    
          
          <Route path="/afiliacionMiembros" component={AfiliacionMiembros}/>
          <Route path="/asignacionMiembros" component={AsignacionMiembros}/>


          {/*                       Consultas             */}
          <Route path="/consultarGrupoResult" component={ConsultarGrupoResult}/>
          <Route path="/consultaMiembrosPorElemento" component={ConsultaMiembroXElemento}/> 
          <Route path="/consultaGruposPorMiembro" component={ConsultaGruposRolesXMiembro}/> 
          <Route path="/consultaComposicionGrupo" component={ConsultaCompGrupo}/>
          <Route path="/arbolEstructural" component={arbolEstructural}/>
           

          {/*                        Creacion de estructuras */}
          <Route path="/crearGrupo" component={CrearGrupo}/> 
          <Route path="/crearZona" component={CrearZona}/> 
          <Route path="/crearRama" component={CrearRama}/> 
        </Switch>
      </div>
    </Router>
    );
  }
export default App;
