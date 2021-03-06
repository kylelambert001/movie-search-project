import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Slider.css";

import SliderContent from "../SliderContent/SliderContent";
import Slide from "../Slide/Slide";
import Arrow from "../Arrow/Arrow";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      translation: 0,
      transition: 0.45,
      slidesPerView: 0,
      sliderWidth: 0,
      timeoutEvent: null,
    };
  }

  setSliderWidth = () => {
    const slider = document.querySelector(".Slider");
    this.setState({ sliderWidth: slider.clientWidth });
  };

  setSlidesPerView = () => {
    const { sliderWidth } = this.state;
    let num = 0;

    switch (true) {
      case sliderWidth <= 375:
        num = 1;
        break;
      case sliderWidth > 375 && sliderWidth <= 565:
        num = 2;
        break;
      case sliderWidth > 565 && sliderWidth <= 768:
        num = 3;
        break;
      case sliderWidth > 768 && sliderWidth <= 1024:
        num = 4;
        break;
      case sliderWidth > 1024 && sliderWidth <= 1226:
        num = 5;
        break;
      case sliderWidth > 1226 && sliderWidth <= 1440:
        num = 5;
        break;
      case sliderWidth > 1440:
        num = 6;
        break;
      default:
        num = 7;
        break;
    }
    this.setState({ slidesPerView: num });
  };

  componentDidMount() {
    this.setSliderWidth();
    this.setSlidesPerView();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setSliderWidth();
    this.setSlidesPerView();

    const timeoutEvent = setTimeout(() => {
      this.setState({ ...this.state, transition: 0.45 });
    }, 250);

    this.setState((state) => ({
      ...state,
      translation: 0,
      transition: 0,
      activeIndex: 0,
      timeoutEvent: timeoutEvent,
    }));
  };

  clearTimeoutEvent = () => {
    const { timeoutEvent } = this.state;
    if (!timeoutEvent) return false;
    clearTimeout(timeoutEvent);
    this.setState({ timeoutEvent: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sliderWidth !== this.state.sliderWidth) {
      this.setSlidesPerView();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.clearTimeoutEvent();
  }

  getWidth = () => this.state.sliderWidth / this.state.slidesPerView;

  disableNextButton = () => {
    const { activeIndex, slidesPerView } = this.state;
    const { items } = this.props;
    return activeIndex + slidesPerView > items.length - 1;
  };

  disablePrevButton = () => {
    const { activeIndex } = this.state;
    return activeIndex === 0;
  };

  nextSlide = () => {
    if (!this.disableNextButton()) {
      this.setState((prevState) => ({
        ...prevState,
        activeIndex: prevState.activeIndex + this.state.slidesPerView,
        translation:
          (prevState.activeIndex + this.state.slidesPerView) * this.getWidth(),
      }));
    }
  };

  prevSlide = () => {
    if (!this.disablePrevButton()) {
      this.setState((prevState) => ({
        ...prevState,
        activeIndex: prevState.activeIndex - this.state.slidesPerView,
        translation:
          (prevState.activeIndex - this.state.slidesPerView) * this.getWidth(),
      }));
    }
  };

  render() {
    return (
      <div className="Slider">
        <div className="Slider-arrows">
          <Arrow
            direction="left"
            disabled={this.disablePrevButton()}
            handleClick={this.prevSlide}
          />
          <Arrow
            direction="right"
            disabled={this.disableNextButton()}
            handleClick={this.nextSlide}
          />
        </div>
        <SliderContent
          translation={this.state.translation}
          transition={this.state.transition}
          width={(100 / this.state.slidesPerView) * this.props.items.length}>
          {this.props.items.map((item) => (
            <Slide
              key={uuidv4()}
              item={item}
              width={100 / this.props.items.length}
              type={this.props.type}
            />
          ))}
        </SliderContent>
      </div>
    );
  }
}

export default Slider;
