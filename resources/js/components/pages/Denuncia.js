import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox'; 
import { PickList } from 'primereact/picklist';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import PerfilService from "../service/PerfilService";
import ModuleService from "../service/ModuleService";
import { AutoComplete } from 'primereact/autocomplete';
import {Calendar} from 'primereact/calendar';
import { CountryService } from '../service/CountryService';
import { NodeService } from '../service/NodeService';
import  PersonaService from "../service/PersonaService";
import  ArmaService from "../service/ArmaService";
import  EspecieService from "../service/EspecieService";
import  VehiculoService from "../service/VehiculoService";
import  SeccionService from "../service/SeccionService";
import  LibroService from "../service/LibroService";
import  ModalityService from "../service/ModalityService";
import { Dropdown } from 'primereact/dropdown';

const Denuncia = () => {
    let list_modalities;
    let emptyPerfil = {
        idperfil: null,
        descripcion: '',
        estado: 'A',
    };
    let empty_complaint = {
        id: null,
        idModalidad:'',
        idSecction:'',
        formalidad: '',
        fechaHecho: '',
        horaHecho: '',
        lugarHecho: '',
        direccionHecho: '',
        latitudHecho: '',
        altitudHecho: '',
        descripcion: '',
    };
    
    let emptyPersona = {
        idpersona: null,
        dni: '',
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        nacimiento: '',
        edad: '',
        sexo: '',
        celular: '',
        estado_civil: '',
        situacion: '',
    };

    let emptyArma = {
        idarma: null,
        marca: '',
        modelo:'',
        calibre:'',
        serie:'',
        estado: 'A',
    };

    let emptyEspecie = {
        idespecie: null,
        especie: '',
        documento: '',
        codigoDoc:'',
        situacion: '',
        estado: 'A',
    };

    let emptyVehiculo = {
        idvehiculo: null,
        clase: '',
        marca: '',
        modelo:'',
        placa:'',
        situacion: '',
        estado: 'A',
    };


    const typeComplaints = [
        { description: 'Denuncia', id: '1' },
        { description: 'Ocurrencia', id: '2' },
    
    ];
    const formalitys = [
        { description: 'Verbal', id: '1' },
        { description: 'Escrita', id: '2' },
    
    ];
    

    
   
    const [selectedDenunciante, setselectedDenunciante] = useState(null);
    // agraviado
    const [selectedAgraviado, setselectedAgraviado] = useState(null);

    
    
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);

   
    
    const [deleteDenuncianteDialog, setDeleteDenuncianteDialog] = useState(false);
    const [deleteDenunciadoDialog, setDeleteDenunciadoDialog] = useState(false);
    const [deleteAgraviadoDialog, setDeleteAgraviadoDialog] = useState(false);
    const [deleteArmaDialog, setDeleteArmaDialog] = useState(false);
    const [deleteEspecieDialog, setDeleteEspecieDialog] = useState(false);
    const [deleteVehiculoDialog, setDeleteVehiculoDialog] = useState(false);
    
    const [perfil, setPerfil] = useState(emptyPerfil);//estado de los  campos del perfil
    const [selectedPerfils, setSelectedPerfils] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

     const [checkboxValue, setCheckboxValue] = useState([]);

    
    const toast = useRef(null);
    const dt = useRef(null);
     // Denunciado
    const [selectedDenunciado, setselectedDenunciado] = useState(null);
   

    const [autoFilteredPerson, setAutoFilteredPerson] = useState([]);
    const [autoPersonValue, setAutoPersonValue] = useState(null);
    const [complaint, setComplaint] = useState(empty_complaint);
    
    const [listModalities, setListModalities] = useState(null);

    //modalidad
    const [modality, setModality] = useState(null);
    //tipo denuncia
    const [typeComplaint, setTypeComplaint] = useState(null);
    //formalidad
    const [formality, setFormality] = useState(null);
    // libro
    const [libro, setLibro] = useState(null);
    const [listLibros, setListLibros] = useState(null);
   // secction
    const [secction, setSecttion] = useState(null);
    const [listSecctios, setListSecctios] = useState(null);
    //Denuncia modal
    const [complaintDialog, setComplaintDialog]= useState(null);
   
    // Vehiculo
    const [selectedVehiculo, setselectedVehiculo] = useState(null);
    const [autoFilteredVehiculo, setAutoFilteredVehiculo] = useState([]);
    const [autoVehiculoValue, setAutoVehiculoValue] = useState(null);
    // Especie
    const [selectedEspecie, setselectedEspecie] = useState(null);
    const [autoFilteredEspecie, setAutoFilteredEspecie] = useState([]);
    const [autoEspecieValue, setAutoEspecieValue] = useState(null);
    // Arma  
    const [selectedArma, setselectedArma] = useState(null);
    const [autoFilteredArma, setAutoFilteredArma] = useState([]);
    const [autoArmaValue, setAutoArmaValue] = useState(null);
    const [titleDenuncia,setTitleDenuncia]=useState('');
    //Denunciante
    const [detailDenunciante, setDetailDenunciante] = useState(null);
    const [denunciantes, setDenunciantes] = useState([]);
    const [denunciante, setDenunciante] = useState([]);

    // Denunciado
    const [detailDenuncido, setDetailDenunciado] = useState(null);
    const [denunciados, setDenunciados] = useState([]);
    const [denunciado, setDenunciado] = useState([]);

    // Agraviado
    const [detailAgraviado, setDetailAgraviado] = useState(null);
    const [agraviados, setAgraviados] = useState([]);
    const [agraviado, setAgraviado] = useState([]);

    // Armas tabla
    const [detailArma, setDetailArma] = useState(null);
    const [armas, setArmas] = useState([]);
    const [arma, setArma] = useState(emptyArma);
    const [armaDialog, setArmaDialog] = useState(false);
    const [titleArma,setTitleArma]=useState('');

    // Especies tabla
    const [detailEspecie, setDetailEspecie] = useState(null);
    const [especies, setEspecies] = useState([]);
    const [especie, setEspecie] = useState(emptyEspecie);
    const [especieDialog, setEspecieDialog] = useState(false);
    const [titleEspecie,setTitleEspecie]=useState('');

    // Vehiculo tabla
    const [detailVehiculo, setDetailVehiculo] = useState(null);
    const [vehiculos, setVehiculos] = useState([]);
    const [vehiculo, setVehiculo] = useState(emptyArma);
    const [vehiculoDialog, setVehiculoDialog] = useState(false);
    const [titleVehiculo,setTitleVehiculo]=useState('');
    // Persona
    const [persona, setPersona] = useState(emptyPersona);
    const [personas, setPersonas] = useState(null);
    const [personaDialog, setPersonaDialog] = useState(false);
    const [titlePersona,setTitlePersona]=useState('');

    //modalidad
    useEffect(() => {
        async function fetchDataModality() {
            const res = await ModalityService.list();
                setListModalities(res.data)
            } 
            fetchDataModality();  
    }, []);
    // Persona
    useEffect(() => {
        async function fetchDataPersona() {
            const res = await PersonaService.list();
            setPersonas(res.data)
            } 
            fetchDataPersona();  
    }, [persona]);


    // Persona
    const crear = async (data) => {
       
        const res = await PersonaService.create(data);
    
    }
    const update = async (id,data)=> {
       
        const res = await PersonaService.update(id,data);
    
    }
    // Armas

    const crearArma = async (data) => {
       
        const res = await ArmaService.create(data);
    
    } 
    const updateArma = async (id,data)=> {
       
        const res = await ArmaService.update(id,data);
    
    }

    // Especies

    const crearEspecie = async (data) => {
       
        const res = await EspecieService.create(data);
    
    } 
    const updateEspecie = async (id,data)=> {
       
        const res = await EspecieService.update(id,data);
    
    }

    // Vehiculos
    const crearVehiculo = async (data) => {
       
        const res = await VehiculoService.create(data);
    
    } 
    const updateVehiculo = async (id,data)=> {
       
        const res = await VehiculoService.update(id,data);
    
    }


    //seccion
    useEffect(() => {
        async function fetchDataSection() {
            const res = await SeccionService.list();
            setListSecctios(res.data)
               
            } 
            fetchDataSection();  
    }, []);
     // libro
    useEffect(() => {
        async function fetchDataLibros() {
            const res = await LibroService.list();
            setListLibros(res.data)
               
            } 
            fetchDataLibros();  
    }, []);
    
    // Vehiculo
    useEffect(() => {
        async function fetchDataVehiculo() {
                const result = await VehiculoService.getVehiculoSearch();
                setAutoVehiculoValue(result.data);
            } 
            fetchDataVehiculo();  
    }, []);
    
    // Especie
    useEffect(() => {
        async function fetchDataEspecie() {
                const result = await EspecieService.getEspecieSearch();
                setAutoEspecieValue(result.data);
            } 
            fetchDataEspecie();  
    }, []);
    // Arma
    useEffect(() => {
        async function fetchDataArma() {
                const result = await ArmaService.getArmaSearch();
                setAutoArmaValue(result.data);
            } 
            fetchDataArma();  
    }, []);

    // Persona
    useEffect(() => {
        async function fetchDataPersonas() {
                const result = await PersonaService.getPersonaSearch();
                setAutoPersonValue(result.data);
            } 
            fetchDataPersonas();  
    }, []);

   

    const searchPerson = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredPerson([...autoPersonValue]);
            }
            else {
                setAutoFilteredPerson(autoPersonValue.filter((person) => {
                    return person.full_name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    };

    const searchArma = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredArma([...autoArmaValue]);
            }
            else {
                setAutoFilteredArma(autoArmaValue.filter((person) => {
                    return person.full_name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    };

    // Nueva Persona
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < personas.length; i++) {
            if (personas[i].idpersona === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const savePersona = () => {
        setSubmitted(true);
        if (persona.nombre.trim()) {
            let _personas = [...personas];
            let _persona = { ...persona };
            if (persona.idpersona) {
                const index = findIndexById(persona.idpersona);
                _personas[index] = _persona;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Modificado', life: 3000 });
                update(persona.idpersona,_persona);

            }
            else {
                _persona.idpersona = "";
                _personas.push(_persona);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Creado', life: 3000 });
                crear(_persona);
            }
            setPersonas(_personas);
                setPersonaDialog(false);
                setPersona(emptyPersona);
        }
    }

    const saveArma = () => {
        setSubmitted(true);
        
         if (arma.marca.trim()) {
            let _armas = [...armas];
            console.log(_armas);
            console.log("armas");
            let _arma = { ...arma };
            if (arma.idarma) {
              
                // const index = findIndexById(arma.idarma);
                // _armas[index] = _arma;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma modificado', life: 3000 });
                console.log(arma.id,"arma actual ");
                updateArma(arma.idarma,_arma);
            }
            else {
                _arma.idarma = "";
                // _armas.push(_arma);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma Creado', life: 3000 });
                crearArma(_arma);
            }
            setArmas(_armas);
            setArmaDialog(false);
            setArma(emptyArma);
        }
    }

    const saveEspecie = () => {
        setSubmitted(true);
        
         if (especie.especie.trim()) {
            let _especies = [...especies];
            let _especie = { ...especie};
            if (especie.idespecie) {
              
                // const index = findIndexById(especie.idespecie);
                // _especies[index] = _especie;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Especie modificado', life: 3000 });
                console.log(especie.id,"Especie actual ");
                updateEspecie(especie.idespecie,_especie);
            }
            else {
                _especie.idespecie = "";
                // _especies.push(_especie);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil Creado', life: 3000 });
                crearEspecie(_especie);
            }
            setEspecies(_especies);
            setEspecieDialog(false);
            setEspecie(emptyEspecie);
        }
    }

    const saveVehiculo = () => {
        setSubmitted(true);

        if (vehiculo.clase.trim()) {
            let _vehiculos = [...vehiculos];
            let _vehiculo = { ...vehiculo };
            if (vehiculo.idvehiculo) { 
                console.log("ingreso vehi");
                // const index = findIndexById(vehiculo.idvehiculo);
                // _vehiculos[index] = _vehiculo;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Vehiculo modificado', life: 3000 });
                console.log(vehiculo.id,"vehiculo actual ");
                updateVehiculo(vehiculo.idvehiculo,_vehiculo);
            }
            else {
                 _vehiculo.idvehiculo = "";
                // _vehiculos.push(_vehiculo);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Vehiculo Creado', life: 3000 });
                crearVehiculo(_vehiculo);
            }
            setVehiculos(_vehiculos);
            setVehiculoDialog(false);
            setVehiculo(emptyVehiculo);
        }
    }

    const searchEspecie = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredEspecie([...autoEspecieValue]);
            }
            else {
                setAutoFilteredEspecie(autoEspecieValue.filter((person) => {
                    return person.full_name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    };

    const searchVehiculo = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredVehiculo([...autoVehiculoValue]);
            }
            else {
                setAutoFilteredVehiculo(autoVehiculoValue.filter((person) => {
                    return person.full_name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPersonaDialog(false);
        setArmaDialog(false);
        setEspecieDialog(false);
        setVehiculoDialog(false);
    }
   
    const hideDeleteDenuncianteDialog = () => {
        setDeleteDenuncianteDialog(false);
    }

    const hideDeleteDenunciadoDialog = () => {
        setDeleteDenunciadoDialog(false);
    }
    const hideDeleteAgraviadoDialog = () => {
        setDeleteAgraviadoDialog(false);
    }
    const hideDeleteArmaDialog = () => {
        setDeleteArmaDialog(false);
    }
    const hideDeleteEspecieDialog = () => {
        setDeleteEspecieDialog(false);
    }
    const hideDeleteVehiculoDialog = () => {
        setDeleteVehiculoDialog(false);
    }

    const onInputSelectModality = (val,name) => {
        setModality(val)
    }
    const onInputSelecTypeComplaint = (val,name) => {
        setTypeComplaint(val)
    }
    const onInputSelectSecction = (val,name) => {
        setSecttion(val)
        
    }
    const onInputSelectLibro = (val,name) => {
        setLibro(val)
        
    }
    const onInputSelectFormality = (val,name) => {
        setFormality(val)
    }
    // Denunciante
    const onDenuncianteChange = (e) => {
        setselectedDenunciante(e.value)
    };
    // Denunciado
    const onDenunciadoChange = (e) => {
        setselectedDenunciado(e.value)
    };
    // Agraviado
    const onAgraviadoChange = (e) => {
        setselectedAgraviado(e.value)
    };
    // Arma 
    const onArmaChange = (e) => {
        setselectedArma(e.value)
    };
    // Especie
    const onEspecieChange = (e) => {
        setselectedEspecie(e.value)
    };
    // Vehiculo
    const onVehiculoChange = (e) => {
        setselectedVehiculo(e.value)
    };

    // Denuncia modal
    const openNew = () => {
        setComplaintDialog(true);
        setTitleDenuncia('Nueva Denuncia');
    }

     // Modal Nueva Persona
    const openNewPerson = () => {
        setPersona(emptyPersona);
        setSubmitted(false);
        setPersonaDialog(true);
        setTitlePersona('Nueva Persona');
    }

    // Nuevo Arma
    const openNewArma = () => {
        setArma(emptyArma);
        setSubmitted(false);
        setArmaDialog(true);
        var estate_arma='A';
        setCheckboxValue([estate_arma]);
        setTitleArma('Nueva Arma');
    }

    // Nueva Especie
   
    const openNewEspecie = () => {
        setEspecie(emptyEspecie);
        setSubmitted(false);
        setEspecieDialog(true);
        var estate_especie='A';
        setCheckboxValue([estate_especie]);
        setTitleEspecie('Nueva especie');
    }
    const openNewVehiculo = () => {
        setVehiculo(emptyVehiculo);
        setSubmitted(false);
        setVehiculoDialog(true);
        var estate_vehiculo='A';
        setCheckboxValue([estate_vehiculo]);
        setTitleVehiculo('Nuevo Vehiculo');
    }

    const hideComplaintDialog = () => {
        setComplaintDialog(false);
    }
    const complaintDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideComplaintDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text"  />
        </>
    );

    const personaDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={savePersona} />
        </>
    );
    const armaDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveArma} />
        </>
    );
    const especieDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveEspecie} />
        </>
    );
    const vehiculoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveVehiculo} />
        </>
    );
 
 
    const confirmDeleteDenunciante = (denunciante) => {
        console.log(denunciante);
        setDenunciante(denunciante);
        setDeleteDenuncianteDialog(true);

    }
    const confirmDeleteDenunciado = (denunciado) => {
        console.log(denunciado);
        setDenunciado(denunciado);
        setDeleteDenunciadoDialog(true);

    }
    const confirmDeleteAgraviado = (agraviado) => {
        console.log(agraviado);
        setAgraviado(agraviado);
        setDeleteAgraviadoDialog(true);

    }
    const confirmDeleteArma = (arma) => {
        console.log(arma);
        setArma(arma);
        setDeleteArmaDialog(true);

    }
    const confirmDeleteEspecie = (especie) => {
        console.log(especie);
        setEspecie(especie);
        setDeleteEspecieDialog(true);

    }
    const confirmDeleteVehiculo = (vehiculo) => {
        console.log(vehiculo);
        setVehiculo(vehiculo);
        setDeleteVehiculoDialog(true);

    }
    
    
    
    const deleteDenunciante = () => {
        let _denunciantes = denunciantes.filter(val => val.idpersona !== denunciante.idpersona);
        setDenunciantes(_denunciantes);
        setDeleteDenuncianteDialog(false);
        setDenunciante([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Denunciante Elimiminado', life: 3000 });
    }

    const deleteDenunciado = () => {
        let _denunciados = denunciados.filter(val => val.idpersona !== denunciado.idpersona);
        setDenunciados(_denunciados);
        setDeleteDenunciadoDialog(false);
        setDenunciado([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Denunciado Elimiminado', life: 3000 });
    }
    const deleteAgraviado = () => {
        let _agraviados = agraviados.filter(val => val.idpersona !== agraviado.idpersona);
        setAgraviados(_agraviados);
        setDeleteAgraviadoDialog(false);
        setAgraviado([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Agraviado Elimiminado', life: 3000 });
    }

    const deleteArma = () => {
        let _armas = armas.filter(val => val.idpersona !== arma.idpersona);
        setArmas(_armas);
        setDeleteArmaDialog(false);
        setArma([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma Elimiminado', life: 3000 });
    }
    const deleteEspecie = () => {
        let _especies = especies.filter(val => val.idespecie !== especie.idespecie);
        setEspecies(_especies);
        setDeleteEspecieDialog(false);
        setEspecie([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Especie Elimiminado', life: 3000 });
    }
    const deleteVehiculo = () => {
        let _vehiculos = vehiculos.filter(val => val.idvehiculo !== vehiculo.idvehiculo);
        setVehiculos(_vehiculos);
        setDeleteVehiculoDialog(false);
        setVehiculo([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Vehiculo Elimiminado', life: 3000 });
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    // Persona Input
    const onInputChangePerson = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _persona = { ...persona};
        _persona[`${name}`] = val;

        setPersona(_persona);
    }

    // Arma Input
    const onInputChangeArma = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _arma = { ...arma};
        _arma[`${name}`] = val;

        setArma(_arma);
    }

    // Especie Input

    const onInputChangeEspecie = (e, name) => {
        const val = (e.target && e.target.value) || '';
      
        let _especie = { ...especie};
        
        _especie[`${name}`] = val;
       
        setEspecie(_especie);
    }
    // Vehiculo Input
    const onInputChangeVehiculo = (e, name) => {
        const val = (e.target && e.target.value) || '';
      
        let _vehiculo = { ...vehiculo};
        
        _vehiculo[`${name}`] = val;
       
        setVehiculo(_vehiculo);
    }
    // Estadoo
    const onCheckboxChange = (e) => {
        setCheckboxValue([]);
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);
       
        setCheckboxValue(selectedValue);
        var state_arma='I';
        console.log(selectedValue);
        if (e.checked){
            console.log("agagaggagaaga");
            state_arma='A';
        }
       
        
        let _arma = { ...arma };
        _arma["estado"] = state_arma ;
        setArma(_arma);
      
    };

    // Estadoo Especie
    const onCheckboxChangeEspecie = (e) => {
        setCheckboxValue([]);
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);
       
        setCheckboxValue(selectedValue);
        var state_especie='I';
        console.log(selectedValue);
        if (e.checked){
            console.log("agagaggagaaga");
            state_especie='A';
        }
       
        
        let _especie = { ...especie };
        _especie["estado"] = state_especie ;
        setEspecie(_especie);
      
    };
    const onCheckboxChangeVehiculo = (e) => {
        setCheckboxValue([]);
            let selectedValue = [...checkboxValue];
            if (e.checked)
                selectedValue.push(e.value);
            else
                selectedValue.splice(selectedValue.indexOf(e.value), 1);
           
            setCheckboxValue(selectedValue);
            var state_vehiculo='I';
            console.log(selectedValue);
            if (e.checked){
                console.log("agagaggagaaga");
                state_vehiculo='A';
            }
           
            
            let _vehiculo = { ...vehiculo};
            _vehiculo["estado"] = state_vehiculo ;
            setVehiculo(_vehiculo);
      
    };

    
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    
  
    const validarCampoUnico=(id,obj,key)=>{
       
        let flag=false;
        Object.entries(obj).forEach(([item, value]) => {
            let id_obj=value[key]
            if(id_obj===id){
                flag=true
            }
          });

        return flag
    }
    
    
    const handleKeyUpDenunciante = (e) => {
        if (e.key === 'Enter') {
            if(selectedDenunciante!=null && selectedDenunciante.idpersona){
                let key='idpersona';
                let campo_unico=validarCampoUnico(selectedDenunciante.idpersona,denunciantes,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la persona', life: 3000 });
                }else{
                    let _denunciantes = [...denunciantes];
                    let _selectedDenunciante = { ...selectedDenunciante };
                    _denunciantes.push(_selectedDenunciante);
                    setDenunciantes(_denunciantes);
                    setselectedDenunciante(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una persona', life: 3000 });
            }
            
        }
      };

    // Denunciado
    const handleKeyUpdenounced = (e) => {
        if (e.key === 'Enter') {
            if(selectedDenunciado!=null && selectedDenunciado.idpersona){
                let key='idpersona';
                let campo_unico=validarCampoUnico(selectedDenunciado.idpersona,denunciados,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la persona', life: 3000 });
                }else{
                    let _denunciados = [...denunciados ];
                    let _selectedDenunciado = { ...selectedDenunciado };
                    _denunciados.push(_selectedDenunciado);
                    setDenunciados(_denunciados);
                    setselectedDenunciado(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una persona', life: 3000 });
            }
        }
      };

    //   Agraviado

    const   handleKeyUpAgraviado = (e) => {
        if (e.key === 'Enter') {
            if(selectedAgraviado!=null && selectedAgraviado.idpersona){
                let key='idpersona';
                let campo_unico=validarCampoUnico(selectedAgraviado.idpersona,agraviados,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la persona', life: 3000 });
                }else{
                    let _agraviados = [...agraviados];
                    let _selectedAgraviado = { ...selectedAgraviado };
                    _agraviados.push(_selectedAgraviado);
                    setAgraviados(_agraviados);
                    setselectedAgraviado(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una persona', life: 3000 });
            }
            
        }
      };

    //   Armas
    const   handleKeyUpArma = (e) => {
        if (e.key === 'Enter') {
            if(selectedArma!=null && selectedArma.idarma){
                let key='idpersona';
                let campo_unico=validarCampoUnico(selectedArma.idarma,armas,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la persona', life: 3000 });
                }else{
                    let _armas = [...armas];
                    let _selectedArma = { ...selectedArma };
                    _armas.push(_selectedArma);
                    setArmas(_armas);
                    setselectedArma(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una persona', life: 3000 });
            }
            
        }
      };

      //   Especie
    const   handleKeyUpEspecie = (e) => {
        if (e.key === 'Enter') {
            if(selectedEspecie!=null && selectedEspecie.idespecie){
                let key='idespecie';
                let campo_unico=validarCampoUnico(selectedEspecie.idespecie,especies,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la especie', life: 3000 });
                }else{
                    let _especies = [...especies];
                    let _selectedEspecie = { ...selectedEspecie };
                    _especies.push(_selectedEspecie);
                    setEspecies(_especies);
                    setselectedEspecie(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una especie', life: 3000 });
            }
            
        }
      };

    //   Vehiculo
    
    const   handleKeyUpVehiculo = (e) => {
        if (e.key === 'Enter') {
            if(selectedVehiculo!=null && selectedVehiculo.idvehiculo){
                let key='idvehiculo';
                let campo_unico=validarCampoUnico(selectedVehiculo.idvehiculo,vehiculos,key)
                if(campo_unico==true){
                    toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Ya se agregó la especie', life: 3000 });
                }else{
                    let _vehiculos = [...vehiculos];
                    let _selectedVehiculo = { ...selectedVehiculo };
                    _vehiculos.push(_selectedVehiculo);
                    setVehiculos(_vehiculos);
                    setselectedVehiculo(null);
                }
            }else{
                toast.current.show({ severity: 'warn', summary: 'informa', detail: 'Escoger una especie', life: 3000 });
            }
            
        }
      };

    const descripcionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">descripcion</span>
                {rowData.descripcion}
            </>
        );
    }
    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">status_description</span>
                {rowData.status_description}
            </>
        );
    }
    


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePerfil(rowData)} />
            </div>
        );
    }
    const actionBodyDenunciante = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteDenunciante(rowData)} />
            </div>
        );
    }
    const actionBodyDenunciado = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteDenunciado(rowData)} />
            </div>
        );
    }
    const actionBodyAgraviado = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteAgraviado(rowData)} />
            </div>
        );
    }
    const actionBodyArma = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteArma(rowData)} />
            </div>
        );
    }
    const actionBodyEspecie = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteEspecie(rowData)} />
            </div>
        );
    }
    const actionBodyVehiculo = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteVehiculo(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Perfiles</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    
    const deleteDenuncianteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDenuncianteDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteDenunciante} />
        </>
    );
    const deleteDenunciadoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDenunciadoDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteDenunciado} />
        </>
    );
    const deleteAgraviadoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAgraviadoDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteAgraviado} />
        </>
    );
    const deleteArmaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteArmaDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteArma} />
        </>
    );
    const deleteEspecieDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEspecieDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteEspecie} />
        </>
    );
    const deleteVehiculoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteVehiculoDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteVehiculo} />
        </>
    );
 

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt}  selection={selectedPerfils} onSelectionChange={(e) => setSelectedPerfils(e.value)}
                        dataKey="idperfil" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                        globalFilter={globalFilter} emptyMessage="No perfils found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="descripcion" header="Perfil" sortable body={descripcionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="status_description" header="Estado" sortable body={estadoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}>
                        </Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    {/* Modal denunciante */}
                    <Dialog visible={complaintDialog} style={{ width: '80%',height:'100%' }} header={titleDenuncia} modal className="p-fluid" footer={complaintDialogFooter} onHide={hideComplaintDialog}>
                    <div className="formgrid grid">
                            <div className="field col-3">
                                <label htmlFor="descripcion">Modalidad</label>
                                <Dropdown value={modality} onChange={(e) => onInputSelectModality(e.value,'idperfil')} optionLabel="descripcion"  autoFocus options={listModalities} placeholder="Seleccionar"  required className={classNames({ 'p-invalid': submitted && !complaint.idSecction })}/>
                                {submitted && !complaint.idSecction && <small className="p-invalid">Modalidad es requerido.</small>}
                         </div>
                            <div className="field col-3 ">
                                <label htmlFor="descripcion">Tipo Denuncia</label>
                                <Dropdown value={typeComplaint} onChange={(e) => onInputSelecTypeComplaint(e.value)} options={typeComplaints} optionLabel="description" placeholder="Seleccionar" />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            <div className="field col-3 ">
                                <label htmlFor="descripcion">Sección</label>
                                <Dropdown  value={secction} onChange={(e) => onInputSelectSecction(e.value, 'idperfil') } optionLabel="descripcion"  autoFocus options={listSecctios} placeholder="Seleccionar"  required className={classNames({ 'p-invalid': submitted && !complaint.idModalidad })}/>
                                {submitted && !complaint.idModalidad && <small className="p-invalid">Modalidad es requerido.</small>}
                            </div>
                            <div className="field col-3 ">
                            <label htmlFor="descripcion">Libro</label>
                                <Dropdown  value={libro} onChange={(e) => onInputSelectLibro(e.value, 'idperfil') } optionLabel="descripcion"  autoFocus options={listLibros} placeholder="Seleccionar"  required className={classNames({ 'p-invalid': submitted && !complaint.idModalidad })}/>
                                {submitted && !complaint.idModalidad && <small className="p-invalid">Modalidad es requerido.</small>}
                            </div>
                    </div>
                    <div className="formgrid grid">
                            <div className="field col-3">
                                <label htmlFor="descripcion">Formalidad</label>
                                <Dropdown  optionLabel="description" value={formality}  onChange={(e) => onInputSelectFormality(e.value, 'idperfil') }  placeholder="Seleccionar"  options={formalitys}  />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            
                            <div className="field col-2 ">
                                <label htmlFor="descripcion">Fecha Hecho</label>
                                <InputText type="date"  id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            <div className="field col-2 ">
                                <label htmlFor="descripcion">Hora Hecho</label>
                                <InputText type="time"  id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            <div className="field col-5">
                                <label htmlFor="descripcion">Lugar Hecho</label>
                                <InputText id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                    </div>
                    <div className="formgrid grid">
                            <div className="field col-5">
                                <label htmlFor="descripcion">Dirección Hecho</label>
                                <InputText id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            <div className="field col-2 ">
                                <label htmlFor="descripcion">&nbsp;</label>
                                <Button label="mapa" icon="pi pi-search" className="p-button-info mr-2 mb-2" />
                            </div>
                            <div className="field col-2 ">
                                <label htmlFor="descripcion">Latitud Hecho</label>
                                <InputText id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            <div className="field col-2 ">
                                <label htmlFor="descripcion">Altitud Hecho</label>
                                <InputText id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required  className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                                {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                            </div>
                            
                    </div>
                    <div className="formgrid grid">
                            <div className="field col-12">
                            <label htmlFor="address">Descripción del Hecho</label>
                            <InputTextarea id="address" rows="4" />
                            </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="descripcion">Denunciante</label>
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                <AutoComplete    onKeyUp={handleKeyUpDenunciante} placeholder="Buscar Persona" id="dd"   value={selectedDenunciante} onChange={onDenuncianteChange}  suggestions={autoFilteredPerson} completeMethod={searchPerson} field="full_name" />
                                </span>
                                <Button onClick={openNewPerson} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                            </div>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="address">Denunciado</label>
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                <AutoComplete  onKeyUp={handleKeyUpdenounced}  placeholder="Buscar Persona" id="dd"   value={selectedDenunciado} onChange={onDenunciadoChange} suggestions={autoFilteredPerson} completeMethod={searchPerson} field="full_name" />
                                </span>
                                <Button onClick={openNewPerson} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                            </div>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <DataTable value={denunciantes} 
                                dataKey="idDenunciante"  className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Denunciantes vacio."  responsiveLayout="scroll">
                                <Column field="full_name" header="Denunciante" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                                <Column body={actionBodyDenunciante}></Column>
                            </DataTable>
                        </div>
                        <div className="field col-6">
                            <DataTable ref={dt} value={denunciados}
                                dataKey="idDenunciado" className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Denunciados vacio."  responsiveLayout="scroll">
                                
                                <Column field="full_name" header="Denunciado" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                               
                                <Column body={actionBodyDenunciado}></Column>
                            </DataTable>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="address">Agraviado</label>
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                <AutoComplete   onKeyUp={handleKeyUpAgraviado} placeholder="Buscar Persona" id="dd"   value={selectedAgraviado} onChange={onAgraviadoChange} suggestions={autoFilteredPerson} completeMethod={searchPerson} field="full_name" />
                                </span>
                                <Button  onClick={openNewPerson} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                            </div>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <DataTable ref={dt} value={agraviados}
                                dataKey="idAgraviado" className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Agraviados vacio."  responsiveLayout="scroll">
                                
                                <Column field="full_name" header="Agraviados" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                               
                                <Column body={actionBodyAgraviado}></Column>
                            </DataTable>
                            </div>
                    </div>
                    <div className="formgrid grid">
                            <div className="field col-4">
                                <label htmlFor="arma">Arma</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete   onKeyUp={handleKeyUpArma} placeholder="Buscar Arma" id="dd"   value={selectedArma} onChange={onArmaChange} suggestions={autoFilteredArma} completeMethod={searchArma} field="full_name" />
                                    </span>
                                    <Button  onClick={openNewArma} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                            <div className="field col-4">
                                <label htmlFor="address">Especie</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete onKeyUp={handleKeyUpEspecie} placeholder="Buscar Especie" id="dd"   value={selectedEspecie} onChange={onEspecieChange} suggestions={autoFilteredEspecie} completeMethod={searchEspecie} field="full_name" />
                                    </span>
                                    <Button onClick={openNewEspecie} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                            <div className="field col-4">
                                <label htmlFor="address">Vehiculo</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete onKeyUp={handleKeyUpVehiculo} placeholder="Buscar Vehículo" id="dd"   value={selectedVehiculo} onChange={onVehiculoChange} suggestions={autoFilteredVehiculo} completeMethod={searchVehiculo} field="full_name" />
                                    </span>
                                    <Button  onClick={openNewVehiculo} type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <DataTable value={armas} 
                                dataKey="idArma"  className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Armas vacio."  responsiveLayout="scroll">
                                <Column field="full_name" header="Armas" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                                <Column body={actionBodyArma}></Column>
                            </DataTable>
                        </div>
                        <div className="field col-4">
                            <DataTable ref={dt} value={especies}
                                dataKey="idEspecie" className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Especies vacio."  responsiveLayout="scroll">
                                
                                <Column field="full_name" header="Especies" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                               
                                <Column body={actionBodyEspecie}></Column>
                            </DataTable>
                        </div>
                        <div className="field col-4">
                            <DataTable ref={dt} value={vehiculos}
                                dataKey="idVehiculo" className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="Vehiculos vacio."  responsiveLayout="scroll">
                                
                                <Column field="full_name" header="Vehiculos" headerStyle={{ width: '80%', minWidth: '10rem' }}></Column>
                               
                                <Column body={actionBodyVehiculo}></Column>
                            </DataTable>
                        </div>
                    </div>
                    </Dialog>
                    {/* Persona Modal */}
                    <Dialog visible={personaDialog} style={{ width: '450px' }} header={titlePersona} modal className="p-fluid" footer={personaDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="dni">DNI</label>
                            <InputText id="dni" value={persona.dni} onChange={(e) => onInputChangePerson(e, 'dni')} required  className={classNames({ 'p-invalid': submitted && !persona.dni })} />
                            {submitted && !persona.dni && <small className="p-invalid">Dni es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" value={persona.nombre} onChange={(e) => onInputChangePerson(e, 'nombre')} required  className={classNames({ 'p-invalid': submitted && !persona.nombre })}/>
                            {submitted && !persona.nombre && <small className="p-invalid">Nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="ap_paterno">AP. Paterno</label>
                            <InputText id="ap_paterno" value={persona.ap_paterno} onChange={(e) => onInputChangePerson(e, 'ap_paterno')} required  className={classNames({ 'p-invalid': submitted && !persona.ap_paterno })}/>
                            {submitted && !persona.ap_paterno && <small className="p-invalid">Apellido Paterno es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="ap_materno">AP. Materno</label>
                            <InputText id="ap_materno" value={persona.ap_materno} onChange={(e) => onInputChangePerson(e, 'ap_materno')} required  className={classNames({ 'p-invalid': submitted && !persona.ap_materno })}/>
                            {submitted && !persona.ap_materno && <small className="p-invalid">Usuario es requerido.</small>}
                        </div>
                        {/* <div className="field">
                            <label htmlFor="nacimiento">Fech.Nacimiento</label>
                           
                            <div className="field">
                                <InputMask id="nacimiento" mask="dd/mm/aaaa" value={persona.nacimiento} onChange={(e) => setPersona(personas)} className="p-invalid"/>
                            </div>
                            {submitted && !persona.nacimiento && <small className="p-invalid">Usuario es requerido.</small>}
                        </div> */}
                        <div className="field">
                            <label htmlFor="edad">Edad</label>
                            <InputText id="edad" value={persona.edad} onChange={(e) => onInputChangePerson(e, 'edad')} required  className={classNames({ 'p-invalid': submitted && !persona.edad })}/>
                            {submitted && !persona.edad && <small className="p-invalid">edad es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="sexo">Sexo</label>
                            <InputText id="sexo" value={persona.sexo} onChange={(e) => onInputChangePerson(e, 'sexo')} required  className={classNames({ 'p-invalid': submitted && !persona.sexo })}/>
                            {submitted && !persona.sexo && <small className="p-invalid">sexo es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="celular">Celular</label>
                            <InputText id="celular" value={persona.celular} onChange={(e) => onInputChangePerson(e, 'celular')} required  className={classNames({ 'p-invalid': submitted && !persona.celular })}/>
                            {submitted && !persona.celular && <small className="p-invalid">celular es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="estado_civil">Estado Civil</label>
                            <InputText id="estado_civil" value={persona.estado_civil} onChange={(e) => onInputChangePerson(e, 'estado_civil')} required  className={classNames({ 'p-invalid': submitted && !persona.sexo })}/>
                            {submitted && !persona.estado_civil && <small className="p-invalid">estado_civil es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="situacion">Situacion</label>
                            <InputText id="situacion" value={persona.situacion} onChange={(e) => onInputChangePerson(e, 'situacion')} required  className={classNames({ 'p-invalid': submitted && !persona.situacion })}/>
                            {submitted && !persona.situacion && <small className="p-invalid">situacion es requerido.</small>}
                        </div>
                    </Dialog>

                     {/* Modal Arma */}
                    <Dialog visible={armaDialog} style={{ width: '450px' }} header={titleArma} modal className="p-fluid" footer={armaDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                            <label htmlFor="marca">Marca</label>
                            <InputText id="marca" value={arma.marca} onChange={(e) => onInputChangeArma(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.marca })} />
                            {submitted && !arma.marca && <small className="p-invalid">Arma es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="modelo">Modelo</label>
                            <InputText id="modelo" value={arma.modelo} onChange={(e) => onInputChangeArma(e, 'modelo')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.modelo })} />
                            {submitted && !arma.modelo && <small className="p-invalid">Arma es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="calibre">Calibre</label>
                            <InputText id="calibre" value={arma.calibre} onChange={(e) => onInputChangeArma(e, 'calibre')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.calibre })} />
                            {submitted && !arma.calibre && <small className="p-invalid">Arma es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="serie">Serie</label>
                            <InputText id="serie" value={arma.serie} onChange={(e) => onInputChangeArma(e, 'serie')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.serie })} />
                            {submitted && !arma.serie && <small className="p-invalid">Serie es requerido.</small>}
                        </div>
                        <label htmlFor="estado">Estado</label>
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                           
                            <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChange} />  
                           </div>
                            {submitted && !arma.estado && <small className="p-invalid">Estado es requerido.</small>}
                        </div>
                    </Dialog>

                    {/* Modal especie */}

                    <Dialog visible={especieDialog} style={{ width: '450px' }} header={titleEspecie} modal className="p-fluid" footer={especieDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="especie">Especies</label>
                            <InputText id="especie" value={especie.especie} onChange={(e) => onInputChangeEspecie(e, 'especie')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.especie })} />
                            {submitted && !especie.especie && <small className="p-invalid">Especie es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="documento">Tipo de documento</label>
                            <InputText id="documento" value={especie.documento} onChange={(e) => onInputChangeEspecie(e, 'documento')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.documento})} />
                            {submitted && !especie.documento && <small className="p-invalid">Tipo de documento es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="codigoDoc">Codigo documento</label>
                            <InputText id="codigoDoc" value={especie.codigoDoc} onChange={(e) => onInputChangeEspecie(e, 'codigoDoc')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.codigoDoc})} />
                            {submitted && !especie.codigoDoc && <small className="p-invalid">Codigo Documento es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="situacion">Situación</label>
                            <InputText id="situacion" value={especie.situacion} onChange={(e) => onInputChangeEspecie(e, 'situacion')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.situacion})} />
                            {submitted && !especie.situacion && <small className="p-invalid">Especie es requerido.</small>}
                        </div>

                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                           
                            <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChangeEspecie} />  
                           </div>
                            {submitted && !especie.estado && <small className="p-invalid">Estado es requerido.</small>}
                        </div>
                    </Dialog>

                    {/* Vehiculo Modal */}

                    <Dialog visible={vehiculoDialog} style={{ width: '450px' }} header={titleVehiculo} modal className="p-fluid" footer={vehiculoDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                                <label htmlFor="clase">Clase Vehiculo</label>
                                <InputText id="clase" value={vehiculo.clase} onChange={(e) => onInputChangeVehiculo(e, 'clase')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.clase })} />
                                {submitted && !vehiculo.clase && <small className="p-invalid">vehiculo es requerido.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="marca">Marca</label>
                                <InputText id="marca" value={vehiculo.marca} onChange={(e) => onInputChangeVehiculo(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.marca })} />
                                {submitted && !vehiculo.marca && <small className="p-invalid">marca es requerido.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="modelo">Modelo</label>
                                <InputText id="modelo" value={vehiculo.modelo} onChange={(e) => onInputChangeVehiculo(e, 'modelo')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.modelo })} />
                                {submitted && !vehiculo.modelo && <small className="p-invalid">Modelo es requerido.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="placa">Placa</label>
                                <InputText id="placa" value={vehiculo.placa} onChange={(e) => onInputChangeVehiculo(e, 'placa')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.placa })} />
                                {submitted && !vehiculo.placa && <small className="p-invalid">Placa es requerido.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="situacion">Situación</label>
                                <InputText id="situacion" value={vehiculo.situacion} onChange={(e) => onInputChangeVehiculo(e, 'situacion')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.situacion })} />
                                {submitted && !vehiculo.situacion && <small className="p-invalid">vehiculo es requerido.</small>}
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="field-checkbox">
                               
                                <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChangeVehiculo} />  
                               </div>
                               {submitted && !vehiculo.estado && <small className="p-invalid">Estado es requerido.</small>}
                            </div>
                        </Dialog>
    
                       
    
                        <Dialog visible={deleteVehiculoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteVehiculoDialogFooter} onHide={hideDeleteVehiculoDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {vehiculo && <span>¿Estás seguro de que quieres eliminar el vehiculo<b>{vehiculo.clase}</b>?</span>}
                            </div>
                        </Dialog>
    
                    <Dialog visible={deleteDenuncianteDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteDenuncianteDialogFooter} onHide={hideDeleteDenuncianteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar el Denunciante?</span>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteDenunciadoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteDenunciadoDialogFooter} onHide={hideDeleteDenunciadoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar al Denunciado?</span>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteAgraviadoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAgraviadoDialogFooter} onHide={hideDeleteAgraviadoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar al Agraviado?</span>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteArmaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteArmaDialogFooter} onHide={hideDeleteArmaDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar al Arma?</span>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteEspecieDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteEspecieDialogFooter} onHide={hideDeleteEspecieDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar la especie?</span>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteVehiculoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteVehiculoDialogFooter} onHide={hideDeleteVehiculoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>¿Estás seguro de que quieres eliminar el vehiculo?</span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Denuncia, comparisonFn);