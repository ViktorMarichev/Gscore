import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ArrowButton from "./components/ArrowButton";
import Subscribe from "src/types/subscribe";
import { useAppSelector, useAppDispatch } from "src/redux/store";
import { SubscribesSelectors, setCurrentSubscribe } from "src/redux/Subscribes";
import { ResizePlugin } from "src/sliderPlugins";
import Card from "./components/Card";
const _ = require("lodash");
type CardsSliderProps = {
  subscribes: Array<Subscribe>;
};

const CardsSlider: React.FC<CardsSliderProps> = ({ subscribes }) => {
  const [loaded, setLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const currentSlide: Subscribe = useAppSelector(
    (state) => SubscribesSelectors.getCurrentSubscribe(state)!
  );

  const slideNext = () => {
    slider.current?.next();
  };
  const slidePrev = () => {
    slider.current?.prev();
  };
  const [refCallback, slider] = useKeenSlider(
    {
      initial: 0,
      loop: false,
      disabled: subscribes.length <= 2 ? true : false,
      slideChanged(slider) {
        dispatch(
          setCurrentSubscribe({
            currentSubscribe: subscribes[slider.track.details.rel],
          })
        );
      },
      mode: "free-snap",
      breakpoints: {
        "(max-width:740px)": {
          slides: {
            perView: 1,
            spacing: 28,
          },
        },
      },
      optionsChanged(slider) {
        setIsDisabled(slider.options.disabled!);
      },
      slides: {
        spacing: 28,
        origin: 0,
        perView: 2.1,
      },
      range: {
        min: 0,
        max: subscribes.length - 1,
      },

      created: (slider) => {
        setLoaded(true);
        slider.track.init();
      },
    },
    [ResizePlugin]
  );

  return (
    <SliderWrapper>
      <Slider ref={refCallback} className="keen-slider">
        {subscribes.map((elem) => {
          return (
            <Card
              key={elem.id}
              subscribe={elem}
              isSlide={subscribes.length > 2}
            />
          );
        })}
      </Slider>
      {isDisabled ? null : (
        <PagesView>
          <ArrowButton
            direction="left"
            currentSlide={subscribes.findIndex(
              (elem) => elem.id === (currentSlide ? currentSlide.id : null)
            )}
            lastSlide={subscribes.length - 1}
            onClick={slidePrev}
          />
          <PageView>
            <CurrentSlide>
              {subscribes.findIndex(
                (elem) => elem.id === (currentSlide ? currentSlide.id : null)
              ) + 1}
            </CurrentSlide>
            <LastSlide>/{subscribes.length}</LastSlide>
          </PageView>
          <ArrowButton
            direction="right"
            currentSlide={subscribes.findIndex(
              (elem) => elem.id === (currentSlide ? currentSlide.id : null)
            )}
            lastSlide={subscribes.length - 1}
            onClick={slideNext}
          />
        </PagesView>
      )}
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 100%;
  z-index: 5;
`;
const PagesView = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  @media (max-width: 640px) {
    justify-content: center;
  }
`;
const Slider = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const PageView = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 22px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;
const CurrentSlide = styled.span`
  color: white;
`;
const LastSlide = styled.span`
  color: ${({ theme }) => theme.colors.grayBrown};
`;
export default CardsSlider;
