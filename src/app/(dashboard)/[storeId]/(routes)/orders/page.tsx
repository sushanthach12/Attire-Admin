import { format } from "date-fns"

import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { FC } from "react";
import { OrdersColumn } from "./components/columns";
import { priceFormatter } from "@/lib/utils";

interface OrdersPageProps {
    params: {
        storeId: string
    }
}

const OrdersPage: FC<OrdersPageProps> = async ({ params }) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrdersColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItems.map(item => item.product.name).join(', '),
        totalPrice: priceFormatter.format(
            item.orderItems.reduce((total, item) => {
                return total + Number(item.product.price)
            }, 0)
        ),
        createdAt: format(item.createdAt, "MMM do, yyyy")
    }))

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedOrders} />
        </div>
    </div>
}

export default OrdersPage;