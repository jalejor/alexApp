const store = require('../../../store/mysql');
const auth = require('../auth');

const {nanoid} = require('nanoid')

const TABLE = 'users';

module.exports = function(injecteStore){
    let store = injecteStore;
    if(!store){
        store = require('../../../store/mysql');
    }
    
    function list(){
        return store.list(TABLE);
    }

    function get(id){
        return store.get(TABLE,id);
    }

    async function upsert(body){
        const user = {
            name: body.name,
            username : body.username,
        }

        if(body.id){
            user.id = body.id
        }else{
            user.id = nanoid();
        }
        
        if(body.password || body.username){
            console.log(body)
            await auth.upsert({
                id: user.id,
                username : user.username,
                password : body.password
            });
        }
        return store.upsert(TABLE,user);
    }

    function remove(id){
        return store.remove(TABLE,id);
    }

    return{
        list,
        get,
        upsert,
        remove,
    }
}
