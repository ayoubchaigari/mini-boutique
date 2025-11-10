import { useParams, Navigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import productsData from '../data/products.json';

const ProductPage = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
