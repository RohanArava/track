import { useEffect, useState } from "react";


export default function Status({ state }) {
    const getStatus = {
        "0": "Order Placed",
        "1": "Picked Up",
        "2": "Delivered"
    }

    const [myOrders, setMyOrders] = useState(null);
    const [orderId, setOrderId] = useState(0);
    const [orderStatuses, setOrderStatuses] = useState(null);
    useEffect(() => {
        async function getProducingJS() {
            const p = await state.contract.getOrdersOfUser();
            const newp = await Promise.all(p.map(async(element)=>{
                return [...element,  await state.contract.getMostRecentStatus(element.orderId)];
            }));
            setMyOrders(newp);
            console.log("myStatus: ")
            console.log(newp[0][5][0].toString());
        }
        getProducingJS();
    }, [state.contract]);

    async function getStatuses(orderId){
        setOrderId(orderId);
        const p = await state.contract.getStatuses(orderId);
        console.log(p);
        
        setOrderStatuses([...p]);
    }

    return <div className="orders"><div className="px-8">Your Orders:
        <table className="table-auto">
            
            <thead>
                <tr>
                    <th className="border-b px-8 py-4">Order Id  </th>
                    <th className="border-b px-8 py-4">Product Id  </th>
                    <th className="border-b px-8 py-4">Status</th>
                    <th className="border-b px-8 py-4">Address</th>
                    <th className="border-b px-8 py-4">Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {myOrders && myOrders.map((element, index) => {
                    return <tr onClick={()=>{getStatuses(element[0]);}} key={index}>
                        <td className="px-8 py-4">{element[0].toString()}</td>
                        <td className="px-8 py-4">{element[1].toString()}</td>
                        <td className="px-8 py-4">{getStatus[element[5][0].toString()]}</td>
                        <td className="px-8 py-4">{element[5][2].toString()==""?"-":element[5][2].toString()}</td>
                        <td className="px-8 py-4">{(new Date(element[5][1].toString() * 1000 + 5.5*60*60*1000)).toUTCString().slice(0,-3)} IST</td>
                        </tr>
                })}
            </tbody>
        </table>
    </div>
    <div className="orderStatus">
        History of Order {orderId.toString()}:
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="border-b px-8 py-4">Status</th>
                    <th className="border-b px-8 py-4">Address</th>
                    <th className="border-b px-8 py-4">Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {orderStatuses && orderStatuses.map((element, index) => {
                    return <tr key={index}>
                        <td className="px-4 py-4">{getStatus[element[0].toString()]}</td>
                        <td className="px-4 py-4">{element[2].toString()==""?"-":element[2].toString()}</td>
                        <td className="px-4 py-4">{(new Date(element[1].toString() * 1000 + 5.5*60*60*1000)).toUTCString().slice(0,-3)} IST</td>
                        </tr>
                })}
            </tbody>
        </table>
        {/* {orderStatuses && orderStatuses.toString()} */}
        </div>
    </div>;
}

