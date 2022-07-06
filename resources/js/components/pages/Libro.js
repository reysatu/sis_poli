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
import LibroService from "../service/LibroService";

const Libro = () => {
    console.log('Entrando a libros');
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
    let emptyLibro = {
        id: null,
        descripcion:'',
        idseccion: null,
        estado: 'A',
    };

     // reportes
     const getPdf = async () => {
        const response =  await LibroService.getPdf(globalFilter);
        const url = window.URL.createObjectURL(new Blob([response.data ], { type: "application/pdf" }));
        window.open(url, "_blank");
    }

    // fin reportes

    const [checkboxValue, setCheckboxValue] = useState([]);

    const [products, setProducts] = useState(null);//borrar
    const [libros, setLibros] = useState(null);///lista de los perfiles
    
    const [libroDialog, setLibroDialog] = useState(false);//cabecera del modal
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteLibroDialog, setDeleteLibroDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [libro, setLibro] = useState(emptyLibro);//estado de los  campos del perfil
    const [selectedProducts, setSelectedProducts] = useState(null);//BORRAR
    const [selectedLibros, setSelectedLibros] = useState(null);// AUN NO SE

    const [titleLibro, setTitleLibro]=useState(''); // nuevo
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        async function fetchDataLibro() {
            const res = await LibroService.list();
                setLibros(res.data)
            } 
            fetchDataLibro();  
    }, [libro]);
    const crear = async (data) => {
       
        const res = await LibroService.create(data);
    
    }

    const update = async (id,data)=> {
       
        const res = await LibroService.update(id,data);
    
    }
    const eliminar = async (id)=> {
       
        const res = await LibroService.eliminar(id);
    
    }
    
   
    const openNew = () => {
        setLibro(emptyLibro);
        setSubmitted(false);
        setLibroDialog(true);
        var estate_libro='A';
        setCheckboxValue([estate_libro]);
        setTitleLibro('Nuevo Libro');
    }

    const hideDialog = () => {
        setSubmitted(false);
        setLibroDialog(false);
    }

    const hideDeleteLibroDialog = () => {
        setDeleteLibroDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveLibro = () => {
        setSubmitted(true);

        if (libro.descripcion.trim()) {
            let _libros = [...libros];
            let _libro = { ...libro };
            if (libro.id) { 
                console.log("ingreso vehi");
                // const index = findIndexById(libro.id);
                // _libros[index] = _libro;
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Libro modificado', life: 3000 });
                console.log(libro.id,"libro actual ");
                update(libro.id,_libro);
            }
            else {
                 _libro.id = "";
                // _libros.push(_libro);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Libro Creado', life: 3000 });
                crear(_libro);
            }
            setCheckboxValue([]);
            setLibros(_libros);
            setLibroDialog(false);
            setLibro(emptyLibro);
        }
    }
   

    const editLibro = (libro) =>  {
         setLibro({ ...libro });
        setLibroDialog(true);
        let _libro = { ...libro};
        var estate_libro=_libro["estado"];

        setCheckboxValue([estate_libro]);
        setTitleLibro('Editar Libro')
    }


    

    const confirmDeleteLibro = (libro) => {
        setLibro(libro);
        setDeleteLibroDialog(true);

    }


    const deleteSelectedProducts = () => {
        let _libros = products.filter(val => !selectedProducts.includes(val));
        setLibros(_libros);
        setDeleteLibroDialog(false);
        setSelectedLibros(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

 const deleteLibro = () => {
        eliminar(libro.id);
        let _libros = libros.filter(val => val.id !== libro.id);
        setLibros(_libros);
        setDeleteLibroDialog(false);
        setLibro(emptyLibro);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'libro Elimiminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].id === id) {
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
      
        let _libro = { ...libro};
        
        _libro[`${name}`] = val;
       
        setLibro(_libro);

       
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
            var state_libro='I';
            console.log(selectedValue);
            if (e.checked){
                console.log("agagaggagaaga");
                state_libro='A';
            }
           
            
            let _libro = { ...libro};
            _libro["estado"] = state_libro ;
            setLibro(_libro);
          
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



// ----------------------------------------------------------------



const descripcionBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Libro</span>
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



// ----------------------------------------------------------------



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editLibro(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteLibro(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Libro</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

  
    const libroDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveLibro} />
        </>
    );

    const deleteLibroDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteLibroDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteLibro} />
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

                    <DataTable ref={dt} value={libros} selection={selectedLibros} onSelectionChange={(e) => setSelectedLibros(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} armas"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="descripcion" header="Libro" sortable body={descripcionBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                       
                        

                        <Column field="status_description" header="Estado" sortable body={estadoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}>
                        </Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={libroDialog} style={{ width: '450px' }} header={titleLibro} modal className="p-fluid" footer={libroDialogFooter} onHide={hideDialog}>
                        
                    <div className="field">
                            <label htmlFor="descripcion">Libro</label>
                            <InputText id="descripcion" value={libro.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required autoFocus className={classNames({ 'p-invalid': submitted && !libro.descripcion })} />
                            {submitted && !libro.descripcion && <small className="p-invalid">descripcion es requerido.</small>}
                        </div>


                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                           
                            <Checkbox inputId="checkOption1" name="estado" value='A' checked={checkboxValue.indexOf('A') !== -1} onChange={onCheckboxChange} />  
                           </div>
                           {submitted && !libro.estado && <small className="p-invalid">Estado es requerido.</small>}
                        </div>
                    </Dialog>

                   

                    <Dialog visible={deleteLibroDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteLibroDialogFooter} onHide={hideDeleteLibroDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {libro && <span>Estás seguro de que quieres eliminar el libro<b>{libro.descripcion}</b>?</span>}
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

export default React.memo(Libro, comparisonFn);