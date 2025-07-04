import { useParams } from 'react-router';
import { useGetProductQuery } from '../product/productApi';
import ProductEditForm from './ProductEditForm';

export default function ProductEdit() {
  const { id } = useParams();

  const { isLoading, error, data } = useGetProductQuery(id);

  if (isLoading) return <h1 className="pt-20">Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  return <div>{data && <ProductEditForm product={data} />}</div>;
}
