const Errors = require("../../constants/error-constant");
const { query } = require("../../utils/query");
const { User } = require("../models/user");

const UserRepository = {
    insertUser: async (user) => {
        const statement = `INSERT INTO tbl_user(name, address, email, phonenumber, password, roles, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        return await query(statement, [user.name, user.address, user.email, user.phonenumber, user.password, user.roles, user.status])
            .then(result => result.insertId)
            .catch(err => console.log(err));
    },
    searchUser: async (searchKeyWord = '', page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT * FROM tbl_user 
            WHERE tbl_user.name LIKE CONCAT('%', ?, '%') 
                OR tbl_user.address LIKE CONCAT('%', ?, '%') 
                OR tbl_user.email LIKE CONCAT('%', ?, '%') 
                OR tbl_user.phonenumber LIKE CONCAT('%', ?, '%')  
                OR tbl_user.roles LIKE CONCAT('%', ?, '%') 
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord, recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(user => new User(user.id, user.name, user.address, user.email, user.phonenumber, user.password, user.roles, user.status));
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalUsers: async (searchKeyWord = '') => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_user 
        WHERE tbl_user.name LIKE CONCAT('%', ?, '%') 
            OR tbl_user.address LIKE CONCAT('%', ?, '%') 
            OR tbl_user.email LIKE CONCAT('%', ?, '%') 
            OR tbl_user.phonenumber LIKE CONCAT('%', ?, '%')  
            OR tbl_user.roles LIKE CONCAT('%', ?, '%')`;

        return await query(statement, [searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord, searchKeyWord])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getById: async (id) => {
        const statement = `SELECT * FROM tbl_user WHERE tbl_user.id = ?`;

        return await query(statement, id)
            .then(results => {
                return results.map(user => new User(user.id, user.name, user.address, user.email, user.phonenumber, user.password, user.roles, user.status));
            })
            .catch(err => console.log(err));
    },
    getByPhonenumber: async (phonenumber) => {
        const statement = `SELECT * FROM tbl_user WHERE tbl_user.phonenumber = ?`;

        return await query(statement, phonenumber)
            .then(results => {
                return results.map(user => new User(user.id, user.name, user.address, user.email, user.phonenumber, user.password, user.roles, user.status));
            })
            .catch(err => console.log(err));
    },
    updateUser: async function (user) {
        const tempUser = await this.getById(user.id).then(rs => rs[0]);
        
        const statement = `UPDATE tbl_user 
            SET tbl_user.name = ?, 
                tbl_user.address = ?, 
                tbl_user.email = ?, 
                tbl_user.phonenumber = ?, 
                tbl_user.password = ?, 
                tbl_user.roles = ?, 
                tbl_user.status = ?
            WHERE tbl_user.id = ?`
        const params = [];

        if(user.name) params.push(user.name)
        else params.push(tempUser.name);

        if(user.address) params.push(user.address)
        else params.push(tempUser.address);

        if(user.email) params.push(user.email)
        else params.push(tempUser.email);

        if(user.phonenumber) params.push(user.phonenumber)
        else params.push(tempUser.phonenumber);

        if(user.password) params.push(user.password)
        else params.push(tempUser.password);

        if(user.roles) params.push(user.roles)
        else params.push(tempUser.roles);

        if(user.status) params.push(user.status)
        else params.push(tempUser.status);
        
        params.push(user.id);

        return await query(statement, params)
            .then(result => result)
            .catch(err => console.log(err));
    },
};

module.exports = UserRepository;