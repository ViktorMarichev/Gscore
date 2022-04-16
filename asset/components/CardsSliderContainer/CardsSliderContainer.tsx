import React from "react";
import styled from "styled-components";
import CardsSlider from "./components/CardsSlider";
import Subscribe from "asset/types/subscribe";

const CardsSliderContainer: React.FC = () => {
  const subscribes: Array<Subscribe> = [
    {
      id: 80,
      userId: 95,
      productId: 1,
      currentPeriodStart: "1650011409",
      currentPeriodEnd: "1681547409",
      status: "ACTIVE",
      product: {
        id: 1,
        sitesCount: 1,
        name: "One cite",
        prices: [
          {
            id: 1,
            isActive: true,
            productId: 1,
            price: "52",
          },
        ],
      },
      codes: [
        {
          id: 392,
          code: "64332672-4563-47ef-82f3-515de4395b43",
          origin: null,
          status: "INACTIVE",
          subscribeId: 80,
          userId: 95,
        },
      ],
    } as Subscribe,
    {
      id: 81,
      userId: 95,
      productId: 2,
      currentPeriodStart: "1650013625",
      currentPeriodEnd: "1681549625",
      status: "ACTIVE",
      product: {
        id: 2,
        sitesCount: 3,
        name: "Three cites",
        prices: [
          {
            id: 2,
            isActive: true,
            productId: 2,
            price: "17",
          },
        ],
      },
      codes: [
        {
          id: 393,
          code: "dc3cf61d-d363-4ec7-9754-6f9a04fd05e2",
          origin: null,
          status: "INACTIVE",
          subscribeId: 81,
          userId: 95,
        },
        {
          id: 394,
          code: "037662f6-33c2-4c2d-a9c4-e788dab0d484",
          origin: null,
          status: "INACTIVE",
          subscribeId: 81,
          userId: 95,
        },
        {
          id: 395,
          code: "24d2bd9f-44fd-4a5b-88ae-8ab9a13a0be2",
          origin: null,
          status: "INACTIVE",
          subscribeId: 81,
          userId: 95,
        },
      ],
    } as Subscribe,
    
  ];

  return <CardsSlider subscribes={subscribes} />;
};
export default CardsSliderContainer;
