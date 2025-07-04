import { IconButton } from '@material-tailwind/react';
import React from 'react';
import { useRemoveProductsMutation } from '../product/productApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function RemoveButton({ id }) {
  const [removeProduct, { isLoading }] = useRemoveProductsMutation();
  const { user } = useSelector((state) => state.userSlice);

  const handleRemove = async () => {
    try {
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success('Removed Successfully');
    } catch (err) {
      toast.error(err.data?.message || 'failed');
      console.log(err);
    }
  };

  return (
    <IconButton onClick={handleRemove} size="sm" color="red">
      <i className="fa fa-trash"></i>
    </IconButton>
  );
}
