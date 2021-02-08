import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

    interface widgetProp {
        offer: any
        merchant: any
        id: number
        image: string
        shipping: any
    }

    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://search-api.fie.future.net.uk/widget.php?id=review&model_name=xbox_one_s&area=GB").then(response => setData(response.data.widget.data.offers))
    }, []);

    const renderImage = (image:string, name: string) => {
        if (image !== null) {
            return (
                <div>
                    <img src={image} alt={name}/>
                </div>
            )
        }

        return (
            <div>
                Image is not available
            </div>
        )
    }


    const renderRows = () => {
        return data.map((item: widgetProp) => {
            return (
                <div key={item.id}>
                    {
                        renderImage(item.image, item.offer.name)
                    }
                    <div>
                        {item.offer.name}
                    </div>
                    <div>
                        {item.offer.price} <span dangerouslySetInnerHTML={{__html: `${item.offer.currency_symbol}`}}/>
                    </div>
                    {item.shipping.prime && (
                        <div><a href={item.shipping.url} target="_blank">Prime shipping</a></div>
                    )}
                    <div>
                        <a href={item.offer.link} target="_blank">
                            <button className="btn btn-primary">
                                Buy on {item.merchant.name}
                            </button>
                        </a>
                    </div>
                    <div>
                        <a href={item.offer.link}><img src={item.merchant.logo_url} alt={item.merchant.name}/></a>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="offers">
            Offers
            {renderRows()}
        </div>
    );
}

export default App;
