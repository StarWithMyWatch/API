WatchService.default.getPhotosMan { (photosMen) in
    WatchService.default.getPhotosWoman(completion: { (photosWomen) in
        let next = AdminHomeViewController.newInstance(usersMan : photosMen, usersWoman : photosWomen)
        self.navigationController?.pushViewController(next, animated: true)
    })

}
outer.patch('/:id', verifyTokenAdmin, async (req, res, next) => {
const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
try {
await client.connect();
const db = client.db(dbName);
const col = db.collection('events');

const name = req.body.name;
const description = req.body.description;
const address = req.body.address;
const date = req.body.date;
const imageURL = req.body.imageURL;
const price = req.body.price;
const sub_only = req.body.sub_only;
const updatedAt = dateNow();
let eventResult = await col.find().toArray();
let resultForEach = 0;
let event;

eventResult.forEach((resForEach) => {
    if (resForEach._id.equals(req.params.id)) {
        resultForEach = 1;
        event = resForEach;
    }
});
if (resultForEach === 0) {
    res.status(404).send({error: 'L'event n'existe pas'});
} else {
    let insertResult = await col.updateOne(
        {_id: ObjectId(req.params.id)},
        {
            $set: {
                name,
                description,
                address,
                date,
                imageURL,
                price,
                sub_only,
                updatedAt
            }
        });
    let newEvent = await col.find({_id: ObjectId(req.params.id)}).toArray();
    res.send({
        newEvent,
        error: null
    });
}
} catch (err) {
res.send({error: err});
}
client.close();
});