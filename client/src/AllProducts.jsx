import { useEffect, useState } from "react";


export default function Products({ state, isAdmin }) {
    const [producing, setProducing] = useState(null);
    useEffect(() => {
        async function getProductsJS() {
            const p = await state.contract.getProducts();
            setProducing(p);
            console.log(producing)
            // await state.contract.buyProduct(2);
        }
        getProductsJS();

    }, [state.contract]);

    async function buyProduct(pid) {
        await state.contract.buyProduct(pid);
        window.location.reload();
    }
    return <div><div className="px-8">Products:
        <table className="table-auto">

            <thead>
                <tr>
                    <th className="border-b px-8 py-4">Product Id  </th>
                    <th className="border-b px-8 py-4">Product Name  </th>
                    {isAdmin || <th className="border-b px-8 py-4">Buy</th>}
                </tr>
            </thead>
            <tbody>
                {producing && producing.map((element, index) => {
                    return <tr key={index}>
                        <td className="px-4 py-4">{element.productId.toString()}</td>
                        <td className="px-4 py-4">{element.productName}</td>
                        {isAdmin || <td className="px-4 py-4"><button onClick={() => buyProduct(parseInt(element.productId.toString()))}>Buy</button></td>}
                        {/* <td className="border px-8 py-4">{element.currentStatus.toString()}</td> */}
                    </tr>
                })}
            </tbody>
        </table>
    </div></div>;
}

