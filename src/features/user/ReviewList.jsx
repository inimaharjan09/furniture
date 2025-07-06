import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  IconButton,
} from '@material-tailwind/react';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDeleteReviewMutation } from '../product/productApi';
import toast from 'react-hot-toast';

export default function ReviewList({ product }) {
  const { user } = useSelector((state) => state.userSlice);
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (review) => {
    try {
      await deleteReview({
        id: product._id,
        token: user.token,
        username: review.username,
      }).unwrap();
      toast.success('Review deleted');
    } catch (err) {
      toast.error(err.data?.message || err.data);
    }
  };

  return (
    <div className="font-poppins mt-10 flex flex-col items-center gap-6">
      {product.reviews.map((review) => (
        <Card
          key={review._id}
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem] border border-white"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2"
          >
            <FaUserCircle size={28} className="text-gray-800" />
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col">
                <Typography variant="h6" color="blue-gray">
                  {review.username}
                </Typography>
                <Rating value={review.rating} readonly />
              </div>
              {user?.username === review.username && (
                <IconButton
                  variant="text"
                  color="red"
                  onClick={() => handleDelete(review)}
                >
                  <FaTrashAlt size={18} />
                </IconButton>
              )}
            </div>
          </CardHeader>
          <CardBody className="mb-2 p-0">
            <Typography>{review.comment}</Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
