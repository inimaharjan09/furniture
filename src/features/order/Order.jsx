import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from '@material-tailwind/react';
import { useGetUserOrderQuery } from './orderApi';

const TABLE_HEAD = ['OrderId', 'OrderDate', 'Total', 'Order Detail'];

export default function Order({ user }) {
  const { data, isLoading, error } = useGetUserOrderQuery(user.token);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="font-poppins">
      <div className="col-span-2 mt-20 px-4">
        <h1 className="text-center text-2xl font-bold mb-5">Order History</h1>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ _id, total, createdAt }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/myorders/${_id}`}>
                        <Button size="sm" variant="text">
                          View Detail
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
