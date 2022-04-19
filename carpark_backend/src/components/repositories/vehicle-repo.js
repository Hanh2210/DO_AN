const { query } = require("../../utils/query");

const VehicleRepository = {
    insertVehicle: async (vehicle) => {
        const statement = `INSERT INTO tbl_vehicle(id_user, type, lincense_plate, color, vehicle_brand, status)
            VALUES (?, ?, ?, ?, ?, ?)`;
    
        return await query(statement, [vehicle.idUser, vehicle.type, vehicle.lincesePlate, vehicle.color, vehicle.vehicleBrand, vehicle.status])
            .then(result => result.insertId)
            .catch(err => console.log(err));
    },
    getById: async (id) => {
        const statement = `SELECT * FROM tbl_vehicle WHERE tbl_vehicle.id = ?`;

        return await query(statement, id)
            .then(result => result)
            .catch(err => console.log(err));
    },
    getByEmail: async (email) => {
        const statement = `SELECT * FROM tbl_user WHERE tbl_user.email = ?`;

        return await query(statement, email)
            .then(result => result)
            .catch(err => console.log(err));
    },
    updateVehicle: async function (vehicle) {
        const tempVehicle = await this.getById(vehicle.id).then(rs => rs[0]);

        const statement = `UPDATE tbl_vehicle SET tbl_vehicle.id_user = ?, tbl_vehicle.type = ?, tbl_vehicle.lincense_plate = ?, tbl_vehicle.color = ?, tbl_vehicle.vehicle_brand = ?, tbl_vehicle.status = ?`
        
        const params = [];

        if(vehicle.idUser) params.push(vehicle.idUser)
        else params.push(tempVehicle.name);

        if(vehicle.type) params.push(vehicle.type)
        else params.push(tempVehicle.type);

        if(vehicle.lincesePlate) params.push(vehicle.lincesePlate)
        else params.push(tempVehicle.lincesePlate);

        if(vehicle.color) params.push(vehicle.color)
        else params.push(tempVehicle.phonenumber);

        if(vehicle.vehicleBrand) params.push(vehicle.vehicleBrand)
        else params.push(tempVehicle.vehicleBrand);

        if(vehicle.status) params.push(vehicle.status)
        else params.push(tempVehicle.status);
        
        return await query(statement, params)
            .then(result => result)
            .catch(err => console.log(err));
    },
    
};

module.exports = UserRepository;