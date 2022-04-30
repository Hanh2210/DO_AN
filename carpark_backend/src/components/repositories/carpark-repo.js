const Errors = require("../../constants/error-constant");
const { query } = require("../../utils/query");
const { CarPark } = require("../models/carpark");

const CarparkRepository = {
    insertCarpark: async (carpark) => {
        const statement = `INSERT INTO tbl_carpark(name, address, numberOfEmptySlots, totalSlots, price, longitude, latitude, openTime, closingTime, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        return await query(statement, [carpark.name, carpark.address, carpark.numberOfEmptySlots, carpark.totalSlots, carpark.price, carpark.longitude, carpark.latitude, carpark.openTime, carpark.closingTime, carpark.status])
            .then(result => result.insertId)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getById: async (id) => {
        const statement = `SELECT * FROM tbl_carpark WHERE tbl_carpark.id = ?`;

        return await query(statement, id)
            .then(results => {
                return results.map(carpark => new CarPark(carpark.id, carpark.name, carpark.address, carpark.numberOfEmptySlots, carpark.totalSlots, carpark.price, carpark.longitude, carpark.latitude, carpark.openTime, carpark.closingTime, carpark.status));
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    updateCarpark: async function (carpark) {
        const tempCarpark = await this.getById(carpark.id).then(rs => rs[0]);
        
        const statement = `UPDATE tbl_carpark 
            SET tbl_carpark.name = ?, 
                tbl_carpark.address = ?, 
                tbl_carpark.numberOfEmptySlots = ?, 
                tbl_carpark.totalSlots = ?, 
                tbl_carpark.price = ?,
                tbl_carpark.longitude = ?,
                tbl_carpark.latitude = ?,
                tbl_carpark.openTime = ?, 
                tbl_carpark.closingTime = ?, 
                tbl_carpark.status = ?
            WHERE tbl_carpark.id = ?`
        const params = [];

        if(carpark.name) params.push(carpark.name)
        else params.push(tempCarpark.name);

        if(carpark.address) params.push(carpark.address)
        else params.push(tempCarpark.address);

        if(carpark.numberOfEmptySlots) params.push(carpark.numberOfEmptySlots)
        else params.push(tempCarpark.numberOfEmptySlots);

        if(carpark.totalSlots) params.push(carpark.totalSlots)
        else params.push(tempCarpark.totalSlots);

        if(carpark.price) params.push(carpark.price)
        else params.push(tempCarpark.price);

        if(carpark.longitude) params.push(carpark.longitude)
        else params.push(tempCarpark.longitude);

        if(carpark.latitude) params.push(carpark.latitude)
        else params.push(tempCarpark.latitude);

        if(carpark.openTime) params.push(carpark.openTime)
        else params.push(tempCarpark.openTime);

        if(carpark.closingTime) params.push(carpark.closingTime)
        else params.push(tempCarpark.closingTime);

        if(carpark.status != undefined) params.push(carpark.status)
        else params.push(tempCarpark.status);

        params.push(carpark.id);
        
        return await query(statement, params)
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    searchCarpark: async (searchKeyWord = '', page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT * FROM tbl_carpark 
            WHERE tbl_carpark.name LIKE CONCAT('%', ?, '%')
                OR tbl_carpark.address LIKE CONCAT('%', ?, '%')
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [searchKeyWord, searchKeyWord, recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(carpark => new CarPark(carpark.id, carpark.name, carpark.address, carpark.numberOfEmptySlots, carpark.totalSlots, carpark.price, carpark.longitude, carpark.latitude, carpark.openTime, carpark.closingTime, carpark.status));
            }).catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalCarparks: async (searchKeyWord = '') => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_carpark 
            WHERE tbl_carpark.name LIKE CONCAT('%', ?, '%')
                OR tbl_carpark.address LIKE CONCAT('%', ?, '%')`;

        return await query(statement, [searchKeyWord, searchKeyWord])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    searchCarparkForUser: async (searchKeyWord, page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT * FROM tbl_carpark 
            WHERE
                tbl_carpark.status = 1
                AND 
                (
                    tbl_carpark.name LIKE CONCAT('%', ?, '%')
                    OR tbl_carpark.address LIKE CONCAT('%', ?, '%')
                )
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [searchKeyWord, searchKeyWord, recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(carpark => new CarPark(carpark.id, carpark.name, carpark.address, carpark.numberOfEmptySlots, carpark.totalSlots, carpark.price, carpark.longitude, carpark.latitude, carpark.openTime, carpark.closingTime, carpark.status));
            }).catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalCarparksForUser: async (searchKeyWord = '') => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_carpark 
            WHERE  
                tbl_carpark.status = 1
                AND 
                (
                    tbl_carpark.name LIKE CONCAT('%', ?, '%')
                    OR tbl_carpark.address LIKE CONCAT('%', ?, '%')
                )`;

        return await query(statement, [searchKeyWord, searchKeyWord])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
}

module.exports = CarparkRepository;