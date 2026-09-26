import ProductForm from "@/components/Dashboard/pages/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductForm productId={decodeURIComponent(id)} />;
}
