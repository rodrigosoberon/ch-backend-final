import {addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../config.js'

export default class ContenedorFirebase {
    constructor(pCollection) {
        this.collectionName = pCollection;
    }

    async getAll(){
        try{
            const data = await getDocs(collection(db, this.collectionName));
            return data.docs.map(doc => doc.data())
        }
        catch (err){
            console.log(err)
        }
    }

    async getById(id){
        try{
            const document = await getDoc(doc(db, this.collectionName,id))
            return [document.data()]
        }catch(err){
            console.log(err)
        }
    }

    async save(object){
        try{
            await addDoc(collection(db, this.collectionName), object)
        }catch (err){
            console.log(err)
        }
    }

    async updateById(id, fields){
        try {
            await updateDoc(doc(db, this.collectionName, id), fields)
        }catch (err) {
            console.log(err)
        }
    }

    async deleteById(id){
        try {
            await deleteDoc(doc(db, this.collectionName, id))
        }catch (err) {
            console.log(err)
        }
    }

    async addProduct(cartId, product){
        try {
            await updateDoc(doc(db, this.collectionName, cartId),{productos: arrayUnion(product)})
        }catch (err) {
            console.log(err)
        }
    }

    async removeProduct(cartId, productId){
        try{
            const document = (await getDoc(doc(db, this.collectionName, cartId))).data()
            let productDelete = {}
            document.productos.forEach(product => {
                if(product.id == productId){
                    productDelete = product
                }
            })
            await updateDoc(doc(db, this.collectionName, cartId),{productos: arrayRemove(productDelete)})
        }catch (err) {
            console.log(err)
        }
    }
}