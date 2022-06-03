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
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import PerfilService from "../service/PerfilService";

const Perfil = () => {
    console.log('Entrando a perfiles');
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
    let emptyPerfil = {
        idperfil: null,
        descripcion: '',
    };

    const [products, setProducts] = useState(null);//borrar
    const [perfils, setPerfils] = useState(null);///lista de los perfiles
    
    const [perfilDialog, setPerfilDialog] = useState(false);//cabecera del modal
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deletePerfilDialog, setDeletePerfilDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [perfil, setPerfil] = useState(emptyPerfil);//estado de los  campos del perfil
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedPerfils, setSelectedPerfils] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);
    useEffect(() => {
        async function fetchDataPerfil() {
            const res = await PerfilService.list();
                setPerfils(res.data)
            } 
            fetchDataPerfil();  
    }, [perfil]);
    const crear = async (data) => {
       
        const res = await PerfilService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await PerfilService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await PerfilService.eliminar(id);
    
    }
  
    
   
    const openNew = () => {
        setPerfil(emptyPerfil);
        setSubmitted(false);
        setPerfilDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilDialog(false);
    }

    const hideDeletePerfilDialog = () => {
        setDeletePerfilDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const savePerfil = () => {
        setSubmitted(true);
        
         if (perfil.descripcion.trim()) {
            let _perfils = [...perfils];
            let _perfil = { ...perfil };
            console.log("/////");
            console.log(perfil)
            console.log("//////")
            if (perfil.idperfil) {
                console.log("ingreso per");
                const index = findIndexById(perfil.idperfil);
                _perfils[index] = _perfil;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil modificado', life: 3000 });
                update(perfil.idperfil,_perfil);
            }
            else {
                console.log("ingreso crear");
                _perfil.idperfil = "";
                _perfils.push(_perfil);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil Creado', life: 3000 });
                crear(_perfil);
            }
            setPerfils(_perfils);
            setPerfilDialog(false);
            setPerfil(emptyPerfil);
        }
    }
   
    const editPerfil = (perfil) => {
       console.log(perfil);
       console.log("perfil");
        setPerfil({ ...perfil });
        setPerfilDialog(true);
      
    }


    

    const confirmDeletePerfil = (perfil) => {
        setPerfil(perfil);
        setDeletePerfilDialog(true);

    }
    const deleteSelectedProducts = () => {
        let _perfils = products.filter(val => !selectedProducts.includes(val));
        setPerfils(_perfils);
        setDeletePerfilDialog(false);
        setSelectedPerfils(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const deletePerfil = () => {
        eliminar(perfil.idperfil);
        let _perfils = perfils.filter(val => val.idperfil !== perfil.idperfil);
        setPerfils(_perfils);
        setDeletePerfilDialog(false);
        setPerfil(emptyPerfil);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil Elimiminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < perfils.length; i++) {
            if (perfils[i].idperfil === id) {
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
      
        let _perfil = { ...perfil};
        
        _perfil[`${name}`] = val;
       
        setPerfil(_perfil);

       
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
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">idperfil</span>
                {rowData.idperfil}
            </>
        );
    }
    const descripcionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">descripcion</span>
                {rowData.descripcion}
            </>
        );
    }
    


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPerfil(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePerfil(rowData)} />
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

  
    const perfilDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={savePerfil} />
        </>
    );
    const deletePerfilDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePerfilDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deletePerfil} />
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

                    <DataTable ref={dt} value={perfils} selection={selectedPerfils} onSelectionChange={(e) => setSelectedPerfils(e.value)}
                        dataKey="idperfil" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="descripcion" header="Perfil" sortable body={descripcionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={perfilDialog} style={{ width: '450px' }} header="Detalles de Perfil" modal className="p-fluid" footer={perfilDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="descripcion">Perfil</label>
                            <InputText id="descripcion" value={perfil.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required autoFocus className={classNames({ 'p-invalid': submitted && !perfil.descripcion })} />
                            {submitted && !perfil.descripcion && <small className="p-invalid">Perfil es requerido.</small>}
                        </div>
                    </Dialog>

                   

                    <Dialog visible={deletePerfilDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePerfilDialogFooter} onHide={hideDeletePerfilDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {perfil && <span>Estás seguro de que quieres eliminar el perfil<b>{perfil.descripcion}</b>?</span>}
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

export default React.memo(Perfil, comparisonFn);