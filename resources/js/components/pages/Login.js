import React, {useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import {Redirect, useLocation} from "react-router-dom";
import loginServices from "../service/LoginService";
import {  Link, useHistory } from 'react-router-dom';

import Home from "../pages/Home";
import Inicio from "../Inicio";
const initialAuth=null;
export default function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState(''); 
    const[error,setError]=useState(false); 
    const [redirect, setRedirect] = useState(initialAuth);
    const history = useHistory();
  
    const ingresar = async () => {
        const data = {
            email, password
        }
        const res = await loginServices.login(data);
    
        if (res.success) {
            window.localStorage.setItem(
                'logueo',JSON.stringify(res)
            );
          
            setRedirect(true);
        }
        else {
            setError(true);
        }
      } 

    if(redirect){
      
    return <Home />;
    }
    return (
     <div className='padre-div'>
         <div className='hijo-div'>
                        <div className="col-12  align-items-center justify-content-center">
                            <div className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="username" type="text"  onChange={e=>setEmail(e.target.value)}/>
                                        <label htmlFor="username">Usuario</label>
                                     </span>
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" type="password" onChange={e=>setPassword(e.target.value)}/>
                                        <label htmlFor="password">Contraseña</label>
                                    </span>
                                </div>
                                {error && <div><label>Credenciales incorrectas</label></div>}
                                <br/>
                                <Button label="Inicio" type="submit"  onClick={()=>ingresar()}></Button>
                            </div>
                        </div>
         </div>
     </div>
                                    
    )
  }
