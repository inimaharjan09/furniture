import { Button, Rating, Textarea } from '@material-tailwind/react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useAddReviewMutation } from '../product/productApi';
import toast from 'react-hot-toast';

export default function AddReview({ id }) {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="font-poppins flex flex-col items-center">
      <div className="max-w-2xl w-full mt-10">
        <Formik
          initialValues={{ review: '', rating: 0 }}
          onSubmit={async (val) => {
            try {
              await addReview({
                id,
                token: user?.token,
                body: {
                  comment: val.review,
                  rating: Number(val.rating),
                  username: user?.username,
                },
              }).unwrap();
              toast.success('Review added successfully');
            } catch (err) {
              toast.error(err.data?.message || 'failed');
            }
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="pt-5 text-xl font-semibold text-center">
                Leave a Review
              </h1>
              <Rating
                name="rating"
                value={values.rating}
                onChange={(val) => setFieldValue('rating', val)}
              />
              <Textarea
                onChange={handleChange}
                name="review"
                label="Your Review"
                value={values.review}
              />
              <Button loading={isLoading} type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
