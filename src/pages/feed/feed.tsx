import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds, getFeedsList } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders: TOrder[] = useSelector(getFeedsList);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetAllFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllFeeds;
      }}
    />
  );
};
