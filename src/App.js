import React, { Component } from 'react';
import './App.css';
import { ContactService } from './service/ContactService';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      visible : false,
      contact: {
        id: null,
        name: null,
        cell: null,
        date_birth: null,
        date_create: null,
        date_delete: null
      },
      selectedContact : {

      }
    };

    this.items = [
      {
        label : 'Nuevo',
        icon : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];

    this.contactService = new ContactService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
          <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
      </div>
    );
  }

  componentDidMount(){
    this.contactService.getAll().then(data => this.setState({contacts: data}))
  }

  save(){
    this.contactService.save(this.state.contact).then(data => {
      this.setState({
        visible : false,
        contact: {
          id: null,
          name: null,
          cell: null,
          date_birth: null,
          date_create: null,
          date_delete: null
        }
      });
      console.log(this.contact)
      this.toast.show({severity: 'success', summary: 'Completado!', detail: 'Se ha guardado correctamente.'});
      this.contactService.getAll().then(data => this.setState({contacts: data}))
    })
  }
  
  delete(){
    if(window.confirm("¿Realmente desea eliminar el contacto?")) {
      this.contactService.delete(this.state.selectedContact.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Completado!', detail: 'Se eliminó correctamente.'});
        this.contactService.getAll().then(data => this.setState({contacts: data}))
      });
    }
  }

  render(){
    return (
      <div style={{width: '80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Contact List">
          <DataTable value={this.state.contacts} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedContact} onSelectionChange={e => this.setState({selectedContact: e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="cell" header="Cell-phone"></Column>
            <Column field="date_birth" header="Date Birth"></Column>
            <Column field="date_create" header="Date Create"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Create Contact" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <form id="usuario-form">
            <span className="p-float-label"> 
              <InputText style={{width: '100%'}} value={this.state.value} id="name" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                    let contact = Object.assign({}, prevState.contact);
                    contact.name = val;

                    return { contact };
                })}
              }/>
              <label htmlFor="name">Name</label>
            </span>
            <br/>
            <span className="p-float-label"> 
              <InputText style={{width: '100%'}} value={this.state.value} id="cell" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                    let contact = Object.assign({}, prevState.contact);
                    contact.cell = val;

                  return { contact };
              })}
            }/>
              <label htmlFor="cell">Cell-phone</label>
            </span>
            <br/>
            <span className="p-float-label"> 
              <InputText style={{width: '100%'}} value={this.state.value} id="date_birth" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                    let contact = Object.assign({}, prevState.contact);
                    contact.date_birth = val;

                  return { contact };
              })}
            }/>
              <label htmlFor="date_birth">Date Birth</label>
            </span>
            <br/>
            <span className="p-float-label"> 
              <InputText style={{width: '100%'}} value={this.state.value} id="date_delete" onChange={(e) => {
                  let val = e.target.value;
                  this.setState(prevState => {
                    let contact = Object.assign({}, prevState.contact);
                    contact.date_delete = val;

                  return { contact };
              })}
            }/>
              <label htmlFor="date_delete">Date Delete</label>
            </span>
          </form>   
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      contact: {
        id: null,
        name: null,
        cell: null,
        date_birth: null,
        date_create: null,
        date_delete: null
      }
    });
    document.getElementById('usuario-form').reset();
  }

  showEditDialog(){
    this.setState({
      visible : true,
      contact: {
        id: this.state.selectedContact.id,
        name: this.state.selectedContact.name,
        cell: this.state.selectedContact.cell,
        date_birth: this.state.selectedContact.date_birth,
        date_create: this.state.selectedContact.date_create,
        date_delete: this.state.selectedContact.date_delete
      }
    })
  }
}