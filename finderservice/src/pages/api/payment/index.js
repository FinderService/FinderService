import mercadopago from "mercadopago"

mercadopago.configure({
    access_token: process.env.PAYMENT_ACCESS_TOKEN,
})

export default async function handler(req, res) {

    switch (req.method) {

        case "POST":

        const items = req.body.items;
        const preference = {
            items: items,
            back_urls:{
                success:'http://localhost:3000',
                failure:'http://localhost:3000',
                pending:'http://localhost:3000',
            },
            auto_return:'approved'
        };

        try{
            const response = await mercadopago.preferences.create(preference);
            res.status(200).json({init_point: response.body.init_point})

        }catch(error){
            return res.status(400).json({ error: error.message });
        }
            
    }
}