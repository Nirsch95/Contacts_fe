import axios from 'axios';

export class ContactService{
    baseUrl = "http://localhost:8080/"
    async getAll(){
        const res = await axios.get(this.baseUrl + "users");
        return res.data;
    }

    async save(usuario){    
        const res = await axios.post(this.baseUrl + "user", usuario);
        return res.data;
    }

    async delete(id){
        const res = await axios.delete(this.baseUrl + "user/" + id);
        return res.data;
    }
}