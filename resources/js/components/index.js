import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import Inicio from './Inicio';
import Home from './pages/Home';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';


// ReactDOM.render(
  
//     <React.StrictMode>
//         <Inicio/>
//     </React.StrictMode>,

//     document.getElementById('root')
// );

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Inicio></Inicio>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();