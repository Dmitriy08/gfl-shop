const Database = require('./DB');
const bcrypt = require('bcrypt');


const generateJwt = () => {

}

class UsersModel {
    isExists(userEmail, callback) {
        Database.query(
            'SELECT COUNT(id_user) as `exists` FROM users WHERE user_email=? LIMIT 1',
            [userEmail],
            result => {
                callback(result.msg[0].exists === 1);
            }
        );
    }

    register(userName, userEmail, userPassword, userPhone, callback) {
        if (!userName) {
            return callback({
                success: false,
                msg: 'User name is required',
            });
        }

        if (!userEmail) {
            return callback({
                success: false,
                msg: 'User email is required',
            });
        }

        if (!userPassword) {
            return callback({
                success: false,
                msg: 'User password is required',
            });
        }

        if (!userPhone) {
            return callback({
                success: false,
                msg: 'User phone is required',
            });
        }

        this.isExists(userEmail, async isExists => {
            if (isExists) {
                return callback({
                    success: false,
                    msg: 'User already exists',
                });
            }
            try {

                const hashPassword = await bcrypt.hash(userPassword, 5)
                const [status] = await Database.promise().execute('SELECT id_status FROM users_status WHERE status_name="USER" LIMIT 1');
                const {id_status} = status[0];

                Database.query("INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?)", [userName, userEmail, hashPassword, userPhone, +id_status], result => {

                        const {success, msg} = result;
                    console.log(msg)
                        if (!success) return callback(msg);
                        callback(result);
                    }
                );
            }catch (error){
                callback({ success: false, msg: JSON.stringify(error) });
            }
        });
    }

    async login(userEmail, userPassword, callback){
        if (!userEmail){
            return callback({
                success: false,
                msg: 'Username is required',
            });
        }

        if (!userPassword){
            return callback({
                success: false,
                msg: 'Password is required',
            });
        }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGltYTIyMjIzIiwiZW1haWwiOiJkaW1hMjMyIiwiaWF0IjoxNjIyOTg1NDAwLCJleHAiOjE2MjMwNzE4MDB9.3WV2qAEWExjyQx3cAdiMwW-LVgAT7QlgEzrPrAixMR8
        try{

            const [userInfo] = await Database.promise().execute(
                'SELECT user_name, user_email, user_password FROM users WHERE user_email=? LIMIT 1',
                [userEmail]
            );
            const {user_name, user_email, user_password} = userInfo[0];
            if(!user_email){
                return callback({
                    success: false,
                    msg: 'User doesn\'t exist'
                })
            }
            const comparePassword = bcrypt.compareSync(userPassword, user_password);
            console.log(comparePassword)
            if(!comparePassword){
                return callback({
                    success: false,
                    msg: 'Password is wrong'
                })
            }
            return callback({ success: true, msg: {name: user_name, email: user_email} });
        } catch (error) {
            callback({ success: false, msg: JSON.stringify(error) });
        }
    }
}

module.exports = new UsersModel();
