const USER_ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

const USER_STATUS = {
    ACTIVE: 1,
    LOCK: 2,
    DELETED: 0
};

function User(id, name, address, email, phonenumber, password, roles, status) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phonenumber = phonenumber;
    this.password = password;
    this.roles = roles
    this.status = status;
};

module.exports = { User, USER_STATUS, USER_ROLE};