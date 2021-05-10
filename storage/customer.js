
export async function getCustomer(req){

    const ObjectID = req.mongo.ObjectID;

    return await req.mongo.db.collection('customers').findOne({_id: new ObjectID(req.params.id)});
}

export async function createCustomer(req){
    
    return await req.mongo.db.collection('customers').insertOne(req.payload);
    
}

export async function deleteCustomer(req){

    const customer = getCustomer(req);

    if(customer){

        const ObjectID = req.mongo.ObjectID;

        return await req.mongo.db.collection('customers').deleteOne({_id: new ObjectID(req.params.id)});
    }else{
        //TODO
    }

}

export async function updateCustomer(req){

    const customer = getCustomer(req);

    if(customer){

        const ObjectID = req.mongo.ObjectID;

    }else{
        //TODO
    }


}