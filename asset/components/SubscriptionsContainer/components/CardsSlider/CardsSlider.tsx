import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ArrowButton from "./components/ArrowButton";
import Subscribe from "asset/types/subscribe";
import Card from "./components/Card";

type CardsSliderProps = {
  subscribes: Array<Subscribe>;
};
const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update();
  });

  slider.on("created", () => {
    observer.observe(slider.container);
  });
  slider.on("destroyed", () => {
    observer.unobserve(slider.container);
  });
};
const CardsSlider: React.FC<CardsSliderProps> = ({ subscribes }) => {
  const [loaded, setLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideNext = () => {
    slider.current?.next();
  };
  const slidePrev = () => {
    slider.current?.prev();
  };
  const [refCallback, slider] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      disabled: subscribes.length <= 2 ? true : false,
      slideChanged(slider) {
        console.log("slide changed");
        setCurrentSlide(slider.track.details.rel);
      },
      mode: "free-snap",
      breakpoints: {
        "(max-width: 1340px)": {
          disabled: subscribes.length <= 2 ? false : true,
          slides: {
            perView: subscribes.length <= 2 ? 1 : 2,
            spacing: 15,
          },
        },
      },
      optionsChanged(slider) {
        setIsDisabled(slider.options.disabled!);
      },
      slides: {
        perView: subscribes.length <= 3 ? 2 : 3,
        spacing: 15,
      },

      created: () => {
        setLoaded(true);
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
            currentSlide={currentSlide}
            lastSlide={subscribes.length - 1}
            onClick={slidePrev}
          />
          <PageView>
            <CurrentSlide>{currentSlide + 1}</CurrentSlide>
            <LastSlide>/{subscribes.length}</LastSlide>
          </PageView>
          <ArrowButton
            direction="right"
            currentSlide={currentSlide}
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
`;
const PagesView = styled.div`
  width: 100%;
  display: flex;
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
  color: #393939;
`;
export default CardsSlider;
