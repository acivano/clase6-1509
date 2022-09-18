const fs = require('fs');
//const { setTimeout } = require('timers/promises');


class Contenedor {
    constructor (archivo){
        this.archivo = archivo;
    }

    async save(nuevoObjeto){
        try {
            let resultado = await fs.promises.readFile(this.archivo, 'utf-8')
            let obj = JSON.parse(resultado)
            let index = 0
            
            while ((obj[index] !== 'Empty' )&&  (index !== obj.length)) {
                index ++
            }
            obj[index] = {...nuevoObjeto, ...{id: index +1}}
            console.log(obj)

            await fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, 2))
            return index+1;

        } catch (error) {
            console.log(`Error en lectura: ${error}`)

        }

    }
    async getById(id){
        if (id > 0){
            try {
                let resultado = await fs.promises.readFile(this.archivo, 'utf-8')
                let obj = JSON.parse(resultado)
                console.log(obj[id-1])
                return obj[id-1]
            } catch (error) {
                console.log(`Error en lectura: ${error}`)
            }
        }
    }

    async getAll(){
        try {
            let resultado = await fs.promises.readFile(this.archivo, 'utf-8')
            let obj = JSON.parse(resultado)
            return obj
        } catch (error) {
            console.log(`Error en lectura: ${error}`)
        }
    }
    async quantityProduct(){
        try {
            let resultado = await fs.promises.readFile(this.archivo, 'utf-8')
            let obj = JSON.parse(resultado).length
            return obj
        } catch (error) {
            console.log(`Error en lectura: ${error}`)
        }
    }

    async deleteById(id){
        try {
            let resultado = await fs.promises.readFile(this.archivo, 'utf-8')
            let obj = JSON.parse(resultado)
            if (id <= obj.length && obj[id-1]!== 'Empty') {
                obj[id-1] = 'Empty'
                console.log(obj)
                await fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, 2))
            }
        } catch (error) {
            console.log(`Error en lectura: ${error}`)
        }
    }

    async deleteAll(){
        try {
            let obj =[]
            console.log(obj)
            await fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, 2))
        } catch (error) {
            console.log(`Error en lectura: ${error}`)
        }
    }
}
//
module.exports = Contenedor
//export {Contenedor}