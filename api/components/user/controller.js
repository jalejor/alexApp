const store = require('../../../store/dummy');
const auth = require('../auth');

const {nanoid} = require('nanoid')

const TABLE = 'user';

module.exports = function(injecteStore){
    let store = injecteStore;
    if(!store){
        store = require('../../../store/dummy');
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
            user.id = body.nanoid
        }else{
            user.id = nanoid();
        }
        
        if(body.password || body.username){
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
