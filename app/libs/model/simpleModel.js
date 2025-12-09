
let arrData = null;
let result = null;
let dataModel = null;

module.exports = {
    /**
     * 
     * @param {string} nameModel
     * @param {string} pathModel  
     * @param {object} optionQuery
     * @returns 
     * result == true -> ok
     * result == null -> null
     * result == false -> error
     */
    findAll: async function (pathModel, nameModel, optionQuery = null) {
        let data = null;
        let model = require(`../../model/models/${pathModel}/${nameModel}model`);
        try {
            optionQuery != null ? dataModel = await model.findAll(optionQuery) : dataModel = await model.findAll();

            arrData = JSON.parse(JSON.stringify(dataModel, null));
            
            if (arrData.length != 0) {                
                data = arrData;
                result = true;
            }else{
                result = null;
            }
           
            return { result: result, data: data }
        } catch (error) {
            console.log(error)
            result = false;
            return { result: result, data: data }
        }
    },
    create: async function (pathModel, nameModel, columnsValue) {
        let model = require(`../../model/models/${pathModel}/${nameModel}model`);
          try {
            //no futuro criar um loop para varias inserção de dados 
            await model.create(columnsValue);            
            result = true;
            return {result: result};
            
        } catch (error) {            
            result = false;
            return { result: result }
        }
    },
    /**
     * 
     * @param {string} pathModel 
     * @param {string} nameModel 
     * @param {object} optionQuery
     * 
     * 
     * @returns 
     */
    update: async function(pathModel, nameModel, optionQuery){
        let model = require(`../../model/models/${pathModel}/${nameModel}model`);
        let columnsValue = optionQuery.columnsValue;
        let where = optionQuery.where;
       
        try {
           
            await model.update(columnsValue, {where});            
            result = true;
            return {result: result};
            
        } catch (error) {
            console.log(error);            
            result = false;
            return { result: result }
        }
    }, 
    delete: async function(pathModel, nameModel, optionQuery){
        let model = require(`../../model/models/${pathModel}/${nameModel}model`);
        let where = optionQuery.where;
        try {           
            await model.destroy({where});            
            result = true;
            return {result: result};
            
        } catch (error) {
            console.log(error);            
            result = false;
            return { result: result }
        }
    }


  
    
}