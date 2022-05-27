import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import UsuarioService from "../service/UsuarioService";
import PerfilService from "../service/PerfilService";
const Usuario = () => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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

    let emptyUsuario = {
        id: null,
        name: '',
        dni: '',
        apellido: '',
        usuarioCip: '',
        email: '',
        password: '',
        celular: '',
    };

    let todaUsuario = {
        id: null,
        name: 'tt',
        apellido: 'tt',
        usuarioCip: 'tt',
        email: 'tt',
        celular: '122',
    };

    const listboxValues = [
        { name: 'Seleccionar', code: '' },
        { name: 'Administrador', code: '1' },
        { name: 'Asimilado', code: '2' },
        { name: 'Efectivo', code: '3' },
        { name: 'Editor', code: '4' },
        { name: 'Postulante', code: '5' }
    ];
    let listperfiles;
    const [usuario, setUsuario] = useState(emptyUsuario);
    const [usuarios, setUsuarios] = useState(null);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [selectedUsuarios, setSelectedUsuarios] = useState(null);
    const [listboxValue, setListboxValue] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [listperfils, setListperfils] = useState(null);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        async function fetchDataUsuario() {
            const res = await UsuarioService.list();
            setUsuarios(res.data)
            } 
            fetchDataUsuario();  
    }, []);

    useEffect(() => {
        async function fetchDataPerfil() {
            const res = await PerfilService.list();
            setListperfils(res.data)
            } 
            fetchDataPerfil();  
    }, []);

    const crear = async (data) => {
       
        const res = await UsuarioService.create(data);
    
    }
    const update = async (id,data)=> {
        const res = await UsuarioService.update(id,data);
    }

    const eliminar = async (id)=> {
       
        const res = await UsuarioService.eliminar(id);
    
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    // console.log(listboxValues);
    // console.log("listboxValues");
    // console.log(listperfiles);
    // console.log("perfils");
    const openNew = () => {

        setUsuario(emptyUsuario);
        setPerfil(false);
        setSubmitted(false);
        setUsuarioDialog(true);
      
    }

    console.log(usuarios);
    console.log("usuarios");
    const hideDialog = () => {
        setPerfil(false);
        setSubmitted(false);
        setUsuarioDialog(false);
    }

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    // const savePerfil = () => {
    //     setSubmitted(true);
        
    //      if (perfil.descripcion.trim()) {
    //         let _usuarios = [...usuarios];
    //         let _usuario = { ...usuario };
    //         if (perfil.id) {
              
    //             // const index = findIndexById(perfil.id);
    //             // _usuarios[index] = _perfil;
    //             // toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil modificado', life: 3000 });
    //             // console.log(perfil.id,"perfil actual ");
    //             // update(perfil.idperfil,_perfil);
    //         }
    //         else {
    //             _usuario.id = "";
    //             _usuarios.push(_usuario);
    //             toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Perfil Creado', life: 3000 });
    //             crear(_perfil);
    //         }
           
    //     }
    // }
    const saveUsuario = () => {
        setSubmitted(true);
        console.log(product.name,"productos");
        if (usuario.name.trim()) {
            let _usuarios = [...usuarios];
            let _usuario = { ...usuario };
            if (usuario.id) {
                const index = findIndexById(usuario.id);
                _usuarios[index] = _usuario;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Modificado', life: 3000 });
                update(usuario.id,_usuario);

            }
            else {
                _usuario.id = "";
                _usuarios.push(_usuario);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Creado', life: 3000 });
                crear(_usuario);
                }

                setUsuarios(_usuarios);
                setUsuarioDialog(false);
                setUsuario(emptyUsuario);
        }
    }

    const editUsuario = (usuario) => {
        let arrayFilter = listperfils.filter(e => e.idperfil == usuario.idperfil);
        setPerfil(arrayFilter[0]);
        setUsuario({ ...usuario });
        setUsuarioDialog(true);
    }

    const confirmDeleteUsuario = (usuario) => {
        setUsuario(usuario);
        setDeleteUsuarioDialog(true);
    }

    const deleteUsuario = () => {
        eliminar(usuario.id);
        let _usuarios = usuarios.filter(val => val.id !== usuario.id);
        setUsuarios(_usuarios);
        setDeleteUsuarioDialog(false);
        setUsuario(emptyUsuario);
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Eliminado', life: 3000 });
        
    }

    
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val;

        setUsuario(_usuario);
    }
    const onInputSelect = (val,name) => {
        // console.log(val.idperfil);
        setPerfil(val); 
        console.log("perfil");
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val.idperfil;
        setUsuario(_usuario);
        
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
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

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.name}
            </>
        );
    }
    const apellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido</span>
                {rowData.apellido}
            </>
        );
    }
    const dniBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Dni</span>
                {rowData.dni}
            </>
        );
    }
    const usuarioCipBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Usuario CIP</span>
                {rowData.usuarioCip}
            </>
        );
    }

    const celularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Celular</span>
                {rowData.celular}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Correo</span>
                {rowData.email}
            </>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readonly cancel={false} />
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteUsuario(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Usuarios</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const usuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsuarioDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUsuario} />
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

                    <DataTable ref={dt} value={usuarios} selection={selectedUsuarios} onSelectionChange={(e) => setSelectedUsuarios(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} usuarios"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                     
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="apellido" header="Apellido" sortable body={apellidoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="dni" header="Dni" sortable body={dniBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="usuarioCip" header="Usuario CIP" sortable body={usuarioCipBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Correo" sortable body={emailBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="celular" header="Celular" sortable body={celularBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={usuarioDialog} style={{ width: '450px' }} header="Detalles de Usuario" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Perfil</label>
                            <Dropdown value={perfil} onChange={(e) => onInputSelect(e.value,'idperfil')} optionLabel="descripcion"  autoFocus options={listperfils} placeholder="Seleccionar"  required className={classNames({ 'p-invalid': submitted && !usuario.idperfil })}/>
                            {submitted && !usuario.idperfil && <small className="p-invalid">Perfil es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nombres</label>
                            <InputText id="name" value={usuario.name} onChange={(e) => onInputChange(e, 'name')} required  className={classNames({ 'p-invalid': submitted && !usuario.name })} />
                            {submitted && !usuario.name && <small className="p-invalid">Nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="apellido">Apellidos</label>
                            <InputText id="apellido" value={usuario.apellido} onChange={(e) => onInputChange(e, 'apellido')} required  className={classNames({ 'p-invalid': submitted && !usuario.apellido })}/>
                            {submitted && !usuario.apellido && <small className="p-invalid">Apellidos es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="dni">Dni</label>
                            <InputText id="dni" value={usuario.dni} onChange={(e) => onInputChange(e, 'dni')} required  className={classNames({ 'p-invalid': submitted && !usuario.dni })}/>
                            {submitted && !usuario.dni && <small className="p-invalid">Dni es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="usuarioCip">Usuario CIP</label>
                            <InputText id="usuarioCip" value={usuario.usuarioCip} onChange={(e) => onInputChange(e, 'usuarioCip')} required  className={classNames({ 'p-invalid': submitted && !usuario.usuarioCip })}/>
                            {submitted && !usuario.usuarioCip && <small className="p-invalid">Usuario es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={usuario.password} onChange={(e) => onInputChange(e, 'password')} required  className={classNames({ 'p-invalid': submitted && !usuario.password })}/>
                            {submitted && !usuario.password && <small className="p-invalid">Usuario es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Correo</label>
                            <InputText id="email" value={usuario.email} onChange={(e) => onInputChange(e, 'email')} required  className={classNames({ 'p-invalid': submitted && !usuario.email })}/>
                            {submitted && !usuario.email && <small className="p-invalid">Correo es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="celular">Celular</label>
                            <InputText id="celular" value={usuario.celular} onChange={(e) => onInputChange(e, 'celular')} required  className={classNames({ 'p-invalid': submitted && !usuario.name })}/>
                            {submitted && !usuario.celular && <small className="p-invalid">Celular es requerido.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && <span>Estás seguro de que quieres eliminar el usuario <b>{usuario.name}</b>?</span>}
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

export default React.memo(Usuario, comparisonFn);