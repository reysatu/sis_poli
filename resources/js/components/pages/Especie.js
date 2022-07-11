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
import { Checkbox } from 'primereact/checkbox'; 
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import EspecieService from "../service/EspecieService";

const Especie = () => {
    console.log('Entrando a especies');
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
    let emptyEspecie = {
        idespecie: null,
        especie: '',
        situacion: '',
        documento: '',
        estado: 'A',
       
    };

        // reportes
        const getPdf = async () => {
            const response =  await EspecieService.getPdf(globalFilter);
            const url = window.URL.createObjectURL(new Blob([response.data ], { type: "application/pdf" }));
            window.open(url, "_blank");
        }
    
        // fin reportes

    const [checkboxValue, setCheckboxValue] = useState([]);

    const [products, setProducts] = useState(null);//borrar
    const [especies, setEspecies] = useState(null);///lista de los perfiles
    
    const [especieDialog, setEspecieDialog] = useState(false);//cabecera del modal
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteEspecieDialog, setDeleteEspecieDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [especie, setEspecie] = useState(emptyEspecie);//estado de los  campos del perfil
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedEspecies, setSelectedEspecies] = useState(null);// AUN NO SE
    const [submitted, setSubmitted] = useState(false);
    const [titleEspecie, setTitleEspecie]=useState(''); // nuevo
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);
    useEffect(() => {
        async function fetchDataEspecie() {
            const res = await EspecieService.list();
                setEspecies(res.data)
            } 
            fetchDataEspecie();  
    }, [especie]);
    const crear = async (data) => {
       
        const res = await EspecieService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await EspecieService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await EspecieService.eliminar(id);
    
    }
  
    
   
    const openNew = () => {
        setEspecie(emptyEspecie);
        setSubmitted(false);
        setEspecieDialog(true);
        var estate_especie='A';
        setCheckboxValue([estate_especie]);
        setTitleEspecie('Nueva especie');
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEspecieDialog(false);
    }

    const hideDeleteEspecieDialog = () => {
        setDeleteEspecieDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
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
                update(especie.idespecie,_especie);
            }
            else {
                _especie.idespecie = "";
                // _especies.push(_especie);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil Creado', life: 3000 });
                crear(_especie);
            }
            setCheckboxValue([]);
            setEspecies(_especies);
            setEspecieDialog(false);
            setEspecie(emptyEspecie);
        }
    }
   
    const editEspecie = (especie) => {
        setEspecie({ ...especie });
        setEspecieDialog(true);

        let _especie = { ...especie};
        var estate_especie=_especie["estado"];

        setCheckboxValue([estate_especie]);
        setTitleEspecie('Editar especie');
    }


    

    const confirmDeleteEspecie = (especie) => {
        setEspecie(especie);
        setDeleteEspecieDialog(true);

    }
    const deleteSelectedProducts = () => {
        let _especies = products.filter(val => !selectedProducts.includes(val));
        setEspecies(_especies);
        setDeleteEspecieDialog(false);
        setSelectedEspecies(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const deleteEspecie = () => {
        eliminar(especie.idespecie);
        let _especies = especies.filter(val => val.idespecie !== especie.idespecie);
        setEspecies(_especies);
        setDeleteEspecieDialog(false);
        setEspecie(emptyEspecie);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Especie Elimiminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < especies.length; i++) {
            if (especies[i].idespecie === id) {
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
      
        let _especie = { ...especie};
        
        _especie[`${name}`] = val;
       
        setEspecie(_especie);

       
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
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={getPdf} />
            </React.Fragment>
        )
    }

  
    const especieBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo de Especie</span>
                {rowData.especie}
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
    const documentBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo documento</span>
                {rowData.documento}
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEspecie(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteEspecie(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Especies</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    const especieDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveEspecie} />
        </>
    );
    const deleteEspecieDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEspecieDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteEspecie} />
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

                    <DataTable ref={dt} value={especies} selection={selectedEspecies} onSelectionChange={(e) => setSelectedEspecies(e.value)}
                        dataKey="idespecie" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} perfiles"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="especie" header="Especies" sortable body={especieBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="situacion" header="Situacion" sortable body={situacionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="documento" header="Tipo documento" sortable body={documentBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column field="status_description" header="Estado" sortable body={estadoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}>
                        </Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={especieDialog} style={{ width: '450px' }} header={titleEspecie} modal className="p-fluid" footer={especieDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="especie">Especies</label>
                            <InputText id="especie" value={especie.especie} onChange={(e) => onInputChange(e, 'especie')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.especie })} />
                            {submitted && !especie.especie && <small className="p-invalid">Especie es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="situacion">Situación</label>
                            <InputText id="situacion" value={especie.situacion} onChange={(e) => onInputChange(e, 'situacion')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.situacion})} />
                            {submitted && !especie.situacion && <small className="p-invalid">Especie es requerido.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="documento">Tipo de documento</label>
                            <InputText id="documento" value={especie.documento} onChange={(e) => onInputChange(e, 'documento')} required autoFocus className={classNames({ 'p-invalid': submitted && !especie.documento})} />
                            {submitted && !especie.documento && <small className="p-invalid">Especie es requerido.</small>}
                        </div>

                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                           
                            <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChange} />  
                           </div>
                            {submitted && !especie.estado && <small className="p-invalid">Estado es requerido.</small>}
                        </div>
                    </Dialog>
                    

                    <Dialog visible={deleteEspecieDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteEspecieDialogFooter} onHide={hideDeleteEspecieDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {especie && <span>Estás seguro de que quieres eliminar el perfil<b>{especie.especie}</b>?</span>}
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

export default React.memo(Especie, comparisonFn);