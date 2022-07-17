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
    
    const typeComplaints = [
        { description: 'Denuncia', id: '1' },
        { description: 'Ocurrencia', id: '2' },
    
    ];
    const formalitys = [
        { description: 'Verbal', id: '1' },
        { description: 'Escrita', id: '2' },
    
    ];
    

    
   
    const [selectedDenunciante, setselectedDenunciante] = useState(null);
    
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);

   
    
    const [deleteDenuncianteDialog, setDeleteDenuncianteDialog] = useState(false);
    
    const [perfil, setPerfil] = useState(emptyPerfil);//estado de los  campos del perfil
    const [selectedPerfils, setSelectedPerfils] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    
    const toast = useRef(null);
    const dt = useRef(null);

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
    //modalidad
    useEffect(() => {
        async function fetchDataModality() {
            const res = await ModalityService.list();
                setListModalities(res.data)
            } 
            fetchDataModality();  
    }, []);
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

   
    const hideDeleteDenuncianteDialog = () => {
        setDeleteDenuncianteDialog(false);
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
    
    const onDenuncianteChange = (e) => {
        setselectedDenunciante(e.value)
    };
    // Denuncia modal
    const openNew = () => {
        setComplaintDialog(true);
        setTitleDenuncia('Nueva Denuncia');
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
 
 

    
   
    


    

   
    const confirmDeleteDenunciante = (denunciante) => {
        console.log(denunciante);
        setDenunciante(denunciante);
        setDeleteDenuncianteDialog(true);

    }
    
    
    
    const deleteDenunciante = () => {
        
        let _denunciantes = denunciantes.filter(val => val.idpersona !== denunciante.idpersona);
        setDenunciantes(_denunciantes);
        setDeleteDenuncianteDialog(false);
        setDenunciante([]);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Denunciante Elimiminado', life: 3000 });
    }

    
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    
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
                                <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
                            </div>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="address">Denunciado</label>
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                <AutoComplete  placeholder="Buscar Persona" id="dd"   value={selectedDenunciado} onChange={(e) => setselectedDenunciado(e.value)} suggestions={autoFilteredPerson} completeMethod={searchPerson} field="full_name" />
                                </span>
                                <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
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
                            <DataTable ref={dt} selection={selectedPerfils} onSelectionChange={(e) => setSelectedPerfils(e.value)}
                                dataKey="idperfil" className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                                globalFilter={globalFilter} emptyMessage="No perfils found."  responsiveLayout="scroll">
                                
                                <Column field="descripcion" header="Denunciado" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                               
                                <Column body={actionBodyTemplate}></Column>
                            </DataTable>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="address">Agraviado</label>
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                <AutoComplete  placeholder="Buscar Persona" id="dd"   value={selectedAutoValue} onChange={(e) => setSelectedAutoValue(e.value)} suggestions={autoFilteredPerson} completeMethod={searchPerson} field="full_name" />
                                </span>
                                <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
                            </div>
                        </div>
                    </div>
                    <div className="formgrid grid">
                            <div className="field col-4">
                                <label htmlFor="address">Arma</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete  placeholder="Buscar Arma" id="dd"   value={selectedArma} onChange={(e) => setselectedArma(e.value)} suggestions={autoFilteredArma} completeMethod={searchArma} field="full_name" />
                                    </span>
                                    <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                            <div className="field col-4">
                                <label htmlFor="address">Especie</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete  placeholder="Buscar Especie" id="dd"   value={selectedEspecie} onChange={(e) => setselectedEspecie(e.value)} suggestions={autoFilteredEspecie} completeMethod={searchEspecie} field="full_name" />
                                    </span>
                                    <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                            <div className="field col-4">
                                <label htmlFor="address">Vehiculo</label>
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <AutoComplete  placeholder="Buscar Vehículo" id="dd"   value={selectedVehiculo} onChange={(e) => setselectedVehiculo(e.value)} suggestions={autoFilteredVehiculo} completeMethod={searchVehiculo} field="full_name" />
                                    </span>
                                    <Button type="button" icon="pi pi-plus" className="p-button-secondary"  />
                                </div>
                            </div>
                    </div>
                       
                    </Dialog>

                    <Dialog visible={deleteDenuncianteDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteDenuncianteDialogFooter} onHide={hideDeleteDenuncianteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             <span>Estás seguro de que quieres eliminar el Denunciante?</span>
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