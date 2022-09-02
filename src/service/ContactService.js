import axios from 'axios';

export class ContactService{
    baseUrl = "http://localhost:8080/"
    async getAll(){
        const res = await axios.get(this.baseUrl + "users");
        return res.data;
    }

    async save(contact){    
        const res = await axios.post(this.baseUrl + "user", contact);
        return res.data;
    }

    async delete(id){
        const res = await axios.delete(this.baseUrl + "user/" + id);
        return res.data;
    }
}