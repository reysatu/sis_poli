import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Calendar } from 'primereact/calendar';
import {InputMask} from 'primereact/inputmask';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import  PersonaService from "../service/PersonaService";


const Persona = () => {
    console.log('Entrando a Personas');
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
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

    const [products, setProducts] = useState(null);//borrar
    const [personaDialog, setPersonaDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deletePersonaDialog, setDeletePersonaDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const [product, setProduct] = useState(emptyProduct);
    const [persona, setPersona] = useState(emptyPersona);
    

    const [personas, setPersonas] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedPersonas, setSelectedPersonas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [titlePersona,setTitlePersona]=useState('');
    const toast = useRef(null);
    const dt = useRef(null);

 
    
    useEffect(() => {
        async function fetchDataPersona() {
            const res = await PersonaService.list();
            setPersonas(res.data)
            } 
            fetchDataPersona();  
    }, [persona]);

    const crear = async (data) => {
       
        const res = await PersonaService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await PersonaService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await PersonaService.eliminar(id);
    
    }
  
    
   
    const openNew = () => {
        setPersona(emptyPersona);
        setSubmitted(false);
        setPersonaDialog(true);
        setTitlePersona('Nueva Persona');
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPersonaDialog(false);
    }

    const hideDeletePersonaDialog = () => {
        setDeletePersonaDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const savePersona = () => {
        setSubmitted(true);
        console.log(product.name,"guardando personas");

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
   
    const editPersona = (persona) =>  {
       
        setPersona({ ...persona });
        setPersonaDialog(true);
        setTitlePersona('Editar Persona');
      
    }


    

    const confirmDeletePersona = (persona) => {
        setPersona(persona);
        setDeletePersonaDialog(true);
    }
    const deleteSelectedProducts = () => {
        let _personas = products.filter(val => !selectedProducts.includes(val));
        setPersonas(_personas);
        setDeletePersonaDialog(false);
        setSelectedPersonas(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const deletePersona = () => {
        eliminar(persona.idpersona);
        let _personas = personas.filter(val => val.idpersona !== persona.idpersona);
        setPersonas(_personas);
        setDeletePersonaDialog(false);
        setPersona(emptyPersona);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Persona Eliminado', life: 3000 });
        
    }

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


    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _persona = { ...persona};
        _persona[`${name}`] = val;

        setPersona(_persona);
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">idpersona</span>
                {rowData.idpersona}
            </>
        );
    }
    const dniBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">DNI</span>
                {rowData.dni}
            </>
        );
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombres</span>
                {rowData.nombre}
            </>
        );
    }
    
    const ap_paternoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido Paterno</span>
                {rowData.ap_paterno}
            </>
        );
    }

    const ap_maternoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido Materno</span>
                {rowData.ap_materno}
            </>
        );
    }

    const nacimientoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha de nacimiento</span>
                {rowData.nacimiento}
            </>
        );
    }

    const edadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Edad</span>
                {rowData.edad}
            </>
        );
    }

    const sexoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sexo</span>
                {rowData.sexo}
            </>
        );
    }

    const celularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Telef. Celular </span>
                {rowData.celular}
            </>
        );
    }

    const estado_civilBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado civil </span>
                {rowData.estado_civil}
            </>
        );
    }


    const situacionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Situación</span>
                {rowData.situacion}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
               <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPersona(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePersona(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Personas</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    const personaDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={savePersona} />
        </>
    );
    const deletePersonaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonaDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deletePersona} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={personas} selection={selectedPersonas} onSelectionChange={(e) => setSelectedPersonas(e.value)}
                        dataKey="idpersona" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} personas"
                        globalFilter={globalFilter} emptyMessage="" header={header} responsiveLayout="scroll"> 
                        
                        { /* checkbox  */ }
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="dni" header="DNI" sortable body={dniBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="nombre" header="Nombres" sortable body={nombreBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="ap_paterno" header="AP. Paterno" sortable body={ap_paternoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="ap_materno" header="AP: Materno" sortable body={ap_maternoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        {/* <Column field="nacimiento" header="Fech. Nacimiento" sortable body={nacimientoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}

                        <Column field="edad" header="edad" sortable body={edadBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="sexo" header="sexo" sortable body={sexoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="celular" header="celular" sortable body={celularBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="estado_civil" header="estado_civil" sortable body={estado_civilBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="situacion" header="situacion" sortable body={situacionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>


                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={personaDialog} style={{ width: '450px' }} header={titlePersona} modal className="p-fluid" footer={personaDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="dni">DNI</label>
                            <InputText id="dni" value={persona.dni} onChange={(e) => onInputChange(e, 'dni')} required  className={classNames({ 'p-invalid': submitted && !persona.dni })} />
                            {submitted && !persona.dni && <small className="p-invalid">Dni es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" value={persona.nombre} onChange={(e) => onInputChange(e, 'nombre')} required  className={classNames({ 'p-invalid': submitted && !persona.nombre })}/>
                            {submitted && !persona.nombre && <small className="p-invalid">Nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="ap_paterno">AP. Paterno</label>
                            <InputText id="ap_paterno" value={persona.ap_paterno} onChange={(e) => onInputChange(e, 'ap_paterno')} required  className={classNames({ 'p-invalid': submitted && !persona.ap_paterno })}/>
                            {submitted && !persona.ap_paterno && <small className="p-invalid">Apellido Paterno es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="ap_materno">AP. Materno</label>
                            <InputText id="ap_materno" value={persona.ap_materno} onChange={(e) => onInputChange(e, 'ap_materno')} required  className={classNames({ 'p-invalid': submitted && !persona.ap_materno })}/>
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
                            <InputText id="edad" value={persona.edad} onChange={(e) => onInputChange(e, 'edad')} required  className={classNames({ 'p-invalid': submitted && !persona.edad })}/>
                            {submitted && !persona.edad && <small className="p-invalid">edad es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="sexo">Sexo</label>
                            <InputText id="sexo" value={persona.sexo} onChange={(e) => onInputChange(e, 'sexo')} required  className={classNames({ 'p-invalid': submitted && !persona.sexo })}/>
                            {submitted && !persona.sexo && <small className="p-invalid">sexo es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="celular">Celular</label>
                            <InputText id="celular" value={persona.celular} onChange={(e) => onInputChange(e, 'celular')} required  className={classNames({ 'p-invalid': submitted && !persona.celular })}/>
                            {submitted && !persona.celular && <small className="p-invalid">celular es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="estado_civil">Estado Civil</label>
                            <InputText id="estado_civil" value={persona.estado_civil} onChange={(e) => onInputChange(e, 'estado_civil')} required  className={classNames({ 'p-invalid': submitted && !persona.sexo })}/>
                            {submitted && !persona.estado_civil && <small className="p-invalid">estado_civil es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="situacion">Situacion</label>
                            <InputText id="situacion" value={persona.situacion} onChange={(e) => onInputChange(e, 'situacion')} required  className={classNames({ 'p-invalid': submitted && !persona.situacion })}/>
                            {submitted && !persona.situacion && <small className="p-invalid">situacion es requerido.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePersonaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePersonaDialogFooter} onHide={hideDeletePersonaDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {persona && <span>Estás seguro de que quieres eliminar el usuario <b>{persona.nombre}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(Persona, comparisonFn);