

module.exports = {
    /**
     * 
     * @param {string} nameModel
     * @param {string} pathModel  
     * @returns 
     * result == true -> ok
     * result == null -> null
     * result == false -> error
     */
    findAll: async function (pathModel, nameModel) {
        let model = require(`../model/models/${pathModel}/${nameModel}model`);
        let data = null;
        let arrData = null;
        let result = null;
        try {
            let dataModel = await model.findAll();
            arrData = JSON.parse(JSON.stringify(dataModel, null));

            if (arrData.length != 0) {
                data = arrData;
                result = true;
            } 

            return { result: result, data: data }
        } catch (error) {
            
            result = false;
            return { result: result, data: data }
        }
    }
}