import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from '@material-tailwind/react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { baseUrl } from '../../app/mainApi';
import { useUpdateProductsMutation } from '../product/productApi';
import toast from 'react-hot-toast';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  price: Yup.number().required('price is required'),
  description: Yup.string().required('description is required'),
  category: Yup.string().required('category is required'),
  size: Yup.string().required('size is required'),
  color: Yup.string().required('color is required'),
  image: Yup.mixed().test('fileType', 'Unsupported File Format', (value) => {
    if (!value) return true;
    return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
      value.type
    );
  }),
});

export default function ProductEditForm({ product }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [updateProduct, { isLoading }] = useUpdateProductsMutation();

  return (
    <div className="max-w-[500px] pt-20 mx-auto">
      <Formik
        initialValues={{
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: '',
          size: product.size || '',
          color: product.color || '',
          imagePrev: product.image,
        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('name', val.name);
          formData.append('price', Number(val.price));
          formData.append('description', val.description);
          formData.append('category', val.category);
          //formData.append('image', val.image);
          try {
            if (val.image) {
              formData.append('image', val.image);
              await updateProduct({
                id: product._id,
                token: user.token,
                body: formData,
              }).unwrap();
            } else {
              await updateProduct({
                id: product._id,
                token: user.token,
                body: formData,
              }).unwrap();
            }
            toast.success('Updated Successfully');
            nav(-1);
          } catch (err) {
            toast.error(err.data?.message || err.data);
          }
        }}
        validationSchema={productSchema}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          values,
          setFieldValue,
          errors,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                onChange={handleChange}
                value={values.name}
                label="Name"
                name="name"
              />
              {touched.name && errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <Input
                onChange={handleChange}
                value={values.price}
                label="Price"
                name="price"
              />
              {touched.price && errors.price && (
                <p className="text-red-500">{errors.price}</p>
              )}
            </div>

            <Textarea
              onChange={handleChange}
              value={values.description}
              label="Description"
              name="description"
            />
            {touched.description && errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}

            <div>
              <Select
                value={values.category}
                onChange={(e) => setFieldValue('category', e)}
                label="Select Category"
              >
                <Option value="crafts">Crafts</Option>
                <Option value="design">Design</Option>
                <Option value="handmade">Handmade</Option>
                <Option value="wood">Wood</Option>
                <Option value="interior">Interior</Option>
              </Select>
              {touched.category && errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Size Field */}
            <div>
              <Select
                value={values.size}
                onChange={(e) => setFieldValue('size', e)}
                label="Select Size"
              >
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
              {touched.size && errors.size && (
                <p className="text-red-500">{errors.size}</p>
              )}
            </div>

            {/* Color Field */}
            <div>
              <Select
                value={values.color}
                onChange={(e) => setFieldValue('color', e)}
                label="Select Color"
              >
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
                <Option value="red">Red</Option>
                <Option value="yellow">Yellow</Option>
                <Option value="black">Black</Option>
              </Select>
              {touched.color && errors.color && (
                <p className="text-red-500">{errors.color}</p>
              )}
            </div>

            <div>
              <Input
                label="Image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imagePrev', URL.createObjectURL(file));
                  setFieldValue('image', file);
                }}
                name="image"
                type="file"
              />
              {touched.image && errors.image && (
                <p className="text-red-500">{errors.image}</p>
              )}
            </div>
            <div>
              {!errors.image && values.imagePrev && (
                <img
                  className="w-[200px] h-[200px] object-cover"
                  src={
                    values.image
                      ? values.imagePrev
                      : `${baseUrl}${values.imagePrev}`
                  }
                  alt=""
                />
              )}
            </div>

            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
