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
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox'; 
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import VehiculoService from "../service/VehiculoService";

const Vehiculo = () => { 
    console.log('Entrando a vehiculos');
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
    let emptyVehiculo = {
        idvehiculo: null,
        clase: '',
        situacion: '',
        marca: '',
        modelo:'',
        estado: 'I',
    };


    const [checkboxValue, setCheckboxValue] = useState([]);

    const [products, setProducts] = useState(null);//borrar
    const [vehiculos, setVehiculos] = useState(null);///lista de los perfiles
    
    const [vehiculoDialog, setVehiculoDialog] = useState(false);//cabecera del modal
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteVehiculoDialog, setDeleteVehiculoDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [vehiculo, setVehiculo] = useState(emptyVehiculo);//estado de los  campos del perfil
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedVehiculos, setSelectedVehiculos] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

 

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);
    
    useEffect(() => {
        async function fetchDataVehiculo() {
            const res = await VehiculoService.list();
                setVehiculos(res.data)
            } 
            fetchDataVehiculo();  
    }, [vehiculo]);
    const crear = async (data) => {
       
        const res = await VehiculoService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await VehiculoService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await VehiculoService.eliminar(id);
    
    }
  
    
   
    const openNew = () => {
        setVehiculo(emptyVehiculo);
        setSubmitted(false);
        setVehiculoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setVehiculoDialog(false);
    }

    const hideDeleteVehiculoDialog = () => {
        setDeleteVehiculoDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveVehiculo = () => {
        setSubmitted(true);
        
         if (vehiculo.clase.trim()) {
            let _vehiculos = [...vehiculos];
            let _vehiculo = { ...vehiculo };
            if (vehiculo.idvehiculo) { 
                console.log("ingreso vehi");
                const index = findIndexById(vehiculo.idvehiculo);
                _vehiculos[index] = _vehiculo;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Vehiculo modificado', life: 3000 });
                console.log(vehiculo.id,"vehiculo actual ");
                update(vehiculo.idvehiculo,_vehiculo);
            }
            else {
                _vehiculo.idvehiculo = "";
                _vehiculos.push(_vehiculo);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Vehiculo Creado', life: 3000 });
                crear(_vehiculo);
            }
            setVehiculos(_vehiculos);
            setVehiculoDialog(false);
            setVehiculo(emptyVehiculo);
        }
    }
   
    const editVehiculo = (vehiculo) => {
        setVehiculo({ ...vehiculo });
        setVehiculoDialog(true);
    }


    

    const confirmDeleteVehiculo = (vehiculo) => {
        setVehiculo(vehiculo);
        setDeleteVehiculoDialog(true);

    }
    const deleteSelectedProducts = () => {
        let _vehiculos = products.filter(val => !selectedProducts.includes(val));
        setVehiculos(_vehiculos);
        setDeleteVehiculoDialog(false);
        setSelectedVehiculos(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const deleteVehiculo = () => {
        eliminar(vehiculo.idvehiculo);
        let _vehiculos = vehiculos.filter(val => val.idvehiculo !== vehiculo.idvehiculo);
        setVehiculos(_vehiculos);
        setDeleteVehiculoDialog(false);
        setVehiculo(emptyVehiculo);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'vehiculo Elimiminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < vehiculos.length; i++) {
            if (vehiculos[i].idvehiculo === id) {
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

    // 


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
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">idvehiculo</span>
                {rowData.idvehiculo}
            </>
        );
    }



// ----------------------------------------------------------------



const claseBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">clase</span>
            {rowData.clase}
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
const marcaBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Marca</span>
            {rowData.marca}
        </>
    );
}
const modeloBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Modelo</span>
            {rowData.modelo}
        </>
    );
}
const estadoBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">estado</span>
            {rowData.estado}
        </>
    );
}

const descripcionBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">clase</span>
            {rowData.clase}
        </>
    );
}

// ----------------------------------------------------------------



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVehiculo(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteVehiculo(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar vehiculo</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    const vehiculoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveVehiculo} />
        </>
    );
    const deleteVehiculoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteVehiculoDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteVehiculo} />
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

                    <DataTable ref={dt} value={vehiculos} selection={selectedVehiculos} onSelectionChange={(e) => setSelectedVehiculos(e.value)}
                        dataKey=" idvehiculo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} vehiculos"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="clase" header="Clase Vehiculo" sortable body={claseBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="situacion" header="Situacion" sortable body={situacionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="marca" header="Marca" sortable body={marcaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                       
                        <Column field="modelo" header="Modelo" sortable body={modeloBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="estado" header="Estado" sortable body={estadoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={vehiculoDialog} style={{ width: '450px' }} header="Detalles de vehiculo" modal className="p-fluid" footer={vehiculoDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                            <label htmlFor="clase">Clase Vehiculo</label>
                            <InputText id="clase" value={vehiculo.clase} onChange={(e) => onInputChange(e, 'clase')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.clase })} />
                            {submitted && !vehiculo.clase && <small className="p-invalid">vehiculo es requerido.</small>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="situacion">Situación</label>
                            <InputText id="situacion" value={vehiculo.situacion} onChange={(e) => onInputChange(e, 'situacion')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.situacion })} />
                            {submitted && !vehiculo.situacion && <small className="p-invalid">vehiculo es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="marca">Marca</label>
                            <InputText id="marca" value={vehiculo.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.marca })} />
                            {submitted && !vehiculo.marca && <small className="p-invalid">vehiculo es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="modelo">Modelo</label>
                            <InputText id="modelo" value={vehiculo.modelo} onChange={(e) => onInputChange(e, 'modelo')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.modelo })} />
                            {submitted && !vehiculo.modelo && <small className="p-invalid">Modelo es requerido.</small>}
                        </div>

                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                           
                            <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChange} />  
                           </div>
                            {submitted && !vehiculo.estado && <small className="p-invalid">Estado es requerido.</small>}
                        </div>
                    </Dialog>

                   

                    <Dialog visible={deleteVehiculoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteVehiculoDialogFooter} onHide={hideDeleteVehiculoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {vehiculo && <span>Estás seguro de que quieres eliminar el vehiculo<b>{vehiculo.clase}</b>?</span>}
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

export default React.memo(Vehiculo, comparisonFn);