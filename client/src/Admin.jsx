import Products from './AllProducts'

export default function Admin({ state }) {
    return <div className='admin'>
        <div className='sidebyside'>
            <div className="products"><Products state={state} isAdmin={true} /></div>
            <div className="statuses"><AllOrders state={state} /></div>
        </div>
    </div>;
}

import { useEffect, useState } from "react";


function AllOrders({ state }) {
    const getStatus = {
        "0": "Order Placed",
        "1": "Picked Up",
        "2": "Delivered"
    }

    const [myOrders, setMyOrders] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState(0);
    const [address, setAddress] = useState("");


    useEffect(() => {
        async function getProducingJS() {
            const p = await state.contract.getOrders();
            const newp = await Promise.all(p.map(async (element) => {
                return [...element, await state.contract.getMostRecentStatus(element.orderId)];
            }));
            setMyOrders(newp);
            console.log("myStatus: ")
            console.log(newp[0][5][0].toString());
        }
        getProducingJS();
    }, [state.contract]);

    async function updateStatus(){
        await state.contract.addStatus(parseInt(orderId), parseInt(status), address);
    }

    return <div className="ordersAdmin"><div className="px-8 ordersAdminInner">All Orders:
        <table className="table-auto">

            <thead>
                <tr>
                    <th className="border-b px-8 py-4">Buyer Id  </th>
                    <th className="border-b px-8 py-4">Order Id  </th>
                    <th className="border-b px-8 py-4">Product Id  </th>
                    <th className="border-b px-8 py-4">Status</th>
                    <th className="border-b px-8 py-4">Address</th>
                    <th className="border-b px-8 py-4">Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {myOrders && myOrders.map((element, index) => {
                    return <tr key={index}>
                        <td className="px-8 py-4">{element[2].toString()}</td>
                        <td className="px-8 py-4">{element[0].toString()}</td>
                        <td className="px-8 py-4">{element[1].toString()}</td>
                        <td className="px-8 py-4">{getStatus[element[5][0].toString()]}</td>
                        <td className="px-8 py-4">{element[5][2].toString() == "" ? "-" : element[5][2].toString()}</td>
                        <td className="px-8 py-4">{(new Date(element[5][1].toString() * 1000 + 5.5 * 60 * 60 * 1000)).toUTCString().slice(0, -3)} IST</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>

        <div className="form statusChange">

            <table className='table-auto'>
                <tr className='p-4'><td>Update Status:</td></tr>
                <tr>
                    <td className='p-4'><label htmlFor="orderId">Order Id: </label></td>
                    <td className='p-4'><input value={orderId} onChange={(e) => { setOrderId(e.target.value) }} type="number" name="orderId"></input></td></tr>
                <tr><td className='p-4'><label htmlFor="status">Status: </label></td>
                    <td className='p-4'><select value={status} onChange={(e) => { setStatus(e.target.value) }}>
                        <option value={0}>Not Picked Up</option>
                        <option value={1}>Picked Up</option>
                        <option value={2}>Delivered</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td className='p-4'><label htmlFor="address">Address: </label></td>
                    <td className='p-4'><input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" name="address"></input></td>
                </tr>
                <tr>
                    <td></td>
                    <td className='p-4'><button onClick={()=>{
                        console.log(orderId);
                        console.log(status);
                        console.log(address);
                        updateStatus()
                    }} type="button" className='button float-right'>Change</button></td>
                </tr>
            </table>
        </div>
    </div>;
}

