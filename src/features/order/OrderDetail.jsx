import { useParams } from 'react-router';
import { useGetOrderDetailQuery } from './orderApi.js';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';
import { baseUrl } from '../../app/mainApi.js';

export default function OrderDetail() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetOrderDetailQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.data?.message || error?.error}</h1>;

  return (
    <div className="min-h-screen flex items-start justify-center mt-20 px-4">
      <div className="w-full max-w-md space-y-6">
        <Typography variant="h4">Order Detail</Typography>
        <hr />
        <p className="text-sm">Order ID: {data._id}</p>

        <Card className="w-full mt-4">
          <List>
            {data.orderItems &&
              data.orderItems.map((item) => (
                <ListItem key={item._id}>
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt={item.title}
                      src={`${baseUrl}${item.image}`}
                    />
                  </ListItemPrefix>
                  <div className="space-y-1">
                    <Typography variant="h6" color="blue-gray">
                      {item.title}
                    </Typography>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <p>Rs. {item.price}</p>
                      <p>×</p>
                      <p>Qty: {item.qty}</p>
                    </div>
                  </div>
                </ListItem>
              ))}
          </List>
        </Card>

        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total</span>
          <span>Rs. {data.total}</span>
        </div>
      </div>
    </div>
  );
}
