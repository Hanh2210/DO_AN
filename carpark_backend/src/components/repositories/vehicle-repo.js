const Errors = require("../../constants/error-constant");
const { query } = require("../../utils/query");
const { Vehicle } = require("../models/vehicle");

const VehicleRepository = {
    insertVehicle: async (vehicle) => {
        const statement = `INSERT INTO tbl_vehicle(id_user, type, lincense_plate, color, vehicle_brand, status)
            VALUES (?, ?, ?, ?, ?, ?)`;
    
        return await query(statement, [vehicle.idUser, vehicle.type, vehicle.lincensePlate, vehicle.color, vehicle.vehicleBrand, vehicle.status])
            .then(result => result.insertId)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    searchVehicle: async (searchKeyWord = '', page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT * FROM tbl_vehicle 
            WHERE tbl_vehicle.type LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.lincense_plate LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.color LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.vehicle_brand LIKE CONCAT('%', ?, '%')
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord, recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(vehicle => new Vehicle(vehicle.id, vehicle.id_user, vehicle.type,
                    vehicle.lincense_plate, vehicle.color, vehicle.vehicle_brand, vehicle.status));
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalVehicles: async (searchKeyWord = '') => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_vehicle 
            WHERE tbl_vehicle.type LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.lincense_plate LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.color LIKE CONCAT('%', ?, '%')
                OR tbl_vehicle.vehicle_brand LIKE CONCAT('%', ?, '%')`;

        return await query(statement, [searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getByUserId: async (userId) => {
        const statement = `SELECT * FROM tbl_vehicle WHERE tbl_vehicle.id_user = ? AND tbl_vehicle.status = 1`;

        return await query(statement, userId)
            .then(results => {
                return results.map(vehicle => new Vehicle(vehicle.id, vehicle.id_user, vehicle.type,
                    vehicle.lincense_plate, vehicle.color, vehicle.vehicle_brand, vehicle.status));
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getById: async (id) => {
        const statement = `SELECT * FROM tbl_vehicle WHERE tbl_vehicle.id = ?`;

        return await query(statement, id)
            .then(results => {
                return results.map(vehicle => new Vehicle(vehicle.id, vehicle.id_user, vehicle.type,
                    vehicle.lincense_plate, vehicle.color, vehicle.vehicle_brand, vehicle.status));
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    updateVehicle: async function (vehicle) {
        const tempVehicle = await this.getById(vehicle.id).then(rs => rs[0]);

        const statement = `UPDATE tbl_vehicle SET tbl_vehicle.id_user = ?, tbl_vehicle.type = ?, tbl_vehicle.lincense_plate = ?, tbl_vehicle.color = ?, tbl_vehicle.vehicle_brand = ?, tbl_vehicle.status = ?`
        
        const params = [];

        if(vehicle.idUser) params.push(vehicle.idUser)
        else params.push(tempVehicle.name);

        if(vehicle.type) params.push(vehicle.type)
        else params.push(tempVehicle.type);

        if(vehicle.lincensePlate) params.push(vehicle.lincensePlate)
        else params.push(tempVehicle.lincensePlate);

        if(vehicle.color) params.push(vehicle.color)
        else params.push(tempVehicle.phonenumber);

        if(vehicle.vehicleBrand) params.push(vehicle.vehicleBrand)
        else params.push(tempVehicle.vehicleBrand);

        if(vehicle.status) params.push(vehicle.status)
        else params.push(tempVehicle.status);
        
        return await query(statement, params)
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    deleteVehicle: async (id) => {
        const statement = `UPDATE tbl_vehicle SET tbl_vehicle.status = 0 WHERE tbl_vehicle.id = ?`;

        return await query(statement, id)
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    }
};

module.exports = VehicleRepository;