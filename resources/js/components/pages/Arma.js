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
import ArmaService from "../service/ArmaService";

const Arma = () => {
    console.log('Entrando a armas');
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
    let emptyArma = {
        idarma: null,
        marca: '',
        modelo:'',
        anio_fabricacion:'',
    };

    const [products, setProducts] = useState(null);//borrar
    const [armas, setArmas] = useState(null);///lista de los perfiles
    
    const [armaDialog, setArmaDialog] = useState(false);//cabecera del modal
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteArmaDialog, setDeleteArmaDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [arma, setArma] = useState(emptyArma);//estado de los  campos del perfil
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedArmas, setSelectedArmas] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);
    useEffect(() => {
        async function fetchDataArma() {
            const res = await ArmaService.list();
                setArmas(res.data)
            } 
            fetchDataArma();  
    },[arma]);
    const crear = async (data) => {
       
        const res = await ArmaService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await ArmaService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await ArmaService.eliminar(id);
    
    }
  
    
   
    const openNew = () => {
        setArma(emptyArma);
        setSubmitted(false);
        setArmaDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setArmaDialog(false);
    }

    const hideDeleteArmaDialog = () => {
        setDeleteArmaDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveArma = () => {
        setSubmitted(true);
        
         if (arma.marca.trim()) {
            let _armas = [...armas];
            let _arma = { ...arma };
            if (arma.idarma) {
              
                const index = findIndexById(arma.idarma);
                _armas[index] = _arma;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma modificado', life: 3000 });
                console.log(arma.id,"arma actual ");
                update(arma.idarma,_arma);
            }
            else {
                _arma.idarma = "";
                _armas.push(_arma);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma Creado', life: 3000 });
                crear(_arma);
            }
            setArmas(_armas);
            setArmaDialog(false);
            setArma(emptyArma);
        }
    }
   
    const editArma = (arma) => {
        setArma({ ...arma });
        setArmaDialog(true);
    }


    

    const confirmDeleteArma = (arma) => {
        setArma(arma);
        setDeleteArmaDialog(true);

    }
    const deleteSelectedProducts = () => {
        let _armas = products.filter(val => !selectedProducts.includes(val));
        setArmas(_armas);
        setDeleteArmaDialog(false);
        setSelectedArmas(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const deleteArma = () => {
        eliminar(arma.idarma);
        let _armas = armas.filter(val => val.idarma !== arma.idarma);
        setArmas(_armas);
        setDeleteArmaDialog(false);
        setArma(emptyArma);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Arma Elimiminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < armas.length; i++) {
            if (armas[i].idarma === id) {
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
      
        let _arma = { ...arma};
        
        _arma[`${name}`] = val;
       
        setArma(_arma);

       
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
                <span className="p-column-title">idarma</span>
                {rowData.idarma}
            </>
        );
    }
    const descripcionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">marca</span>
                {rowData.marca}
            </>
        );
    }


// ----------------------------------------------------------------

const codeBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Code</span>
            {rowData.code}
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
const anio_fabricacionBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Año de fabricación</span>
            {rowData.anio_fabricacion}
        </>
    );
}

// ----------------------------------------------------------------



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editArma(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteArma(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Armas</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    const armaDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveArma} />
        </>
    );
    const deleteArmaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteArmaDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteArma} />
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

                    <DataTable ref={dt} value={armas} selection={selectedArmas} onSelectionChange={(e) => setSelectedArmas(e.value)}
                        dataKey="idarma" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} armas"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="marca" header="Marca" sortable body={marcaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                       
                        <Column field="modelo" header="Modelo" sortable body={modeloBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="anio_fabricacion" header="Año de Fabricación" sortable body={anio_fabricacionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={armaDialog} style={{ width: '450px' }} header="Detalles de Arma" modal className="p-fluid" footer={armaDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                            <label htmlFor="marca">Marca</label>
                            <InputText id="marca" value={arma.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.marca })} />
                            {submitted && !arma.marca && <small className="p-invalid">Arma es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="modelo">Modelo</label>
                            <InputText id="modelo" value={arma.modelo} onChange={(e) => onInputChange(e, 'modelo')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.modelo })} />
                            {submitted && !arma.modelo && <small className="p-invalid">Arma es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="anio_fabricacion">Año de fabricación</label>
                            <InputText id="anio_fabricacion" value={arma.anio_fabricacion} onChange={(e) => onInputChange(e, 'anio_fabricacion')} required autoFocus className={classNames({ 'p-invalid': submitted && !arma.anio_fabricacion })} />
                            {submitted && !arma.anio_fabricacion && <small className="p-invalid">Arma es requerido.</small>}
                        </div>
                    </Dialog>

                   

                    <Dialog visible={deleteArmaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteArmaDialogFooter} onHide={hideDeleteArmaDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {arma && <span>Estás seguro de que quieres eliminar el arma<b>{arma.marca}</b>?</span>}
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

export default React.memo(Arma, comparisonFn);