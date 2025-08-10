import { getAllRestaurantsThunk, setSelectedRestaurantAction } from '@/doman/store/restaurantPage';
import { Store } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadRestaurant = () => {
  const state = useSelector((state) => state.restaurantReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.isRequest) return;
    dispatch(getAllRestaurantsThunk());
  }, [state.isRequest]);

  const setSelectedRestaurant = (data) => {
    dispatch(setSelectedRestaurantAction(data));
  }
  const metrics = useMemo(() => {
    return [
      {
        id: 'restaurant',
        count: state.restaurants.length,
        rate: null,
        title: 'Total Restaurantes',
        icon: Store,
        color: 'text-muted-foreground',
        textColor: 'text-muted-foreground',
        description: null,
      },
      {
        id: 'store-active',
        count: state.restaurants.filter((r) => r.status).length,
        rate: null,
        title: 'Restaurantes Activos',
        icon: Store,
        color: 'text-muted-foreground',
        textColor: 'text-muted-foreground',
        description: null,
      },
    ]
  }, [state.metrics, state.restaurants]);

  return {
    isLoading: state.isLoading,
    restaurants: state.restaurants,
    selectedRestaurant: state.selectedRestaurant,
    metrics,

    // Function
    setSelectedRestaurant,
  }
}
