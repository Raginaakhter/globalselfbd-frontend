import OrderDetails from "@/components/Dashboard/pages/OrderDetails";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetails orderId={decodeURIComponent(id)} />;
}
