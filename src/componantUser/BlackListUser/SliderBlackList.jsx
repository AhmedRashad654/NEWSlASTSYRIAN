import React from "react";
import Slider from "react-slick";
import './SliderBlackList.css'
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
export default function SliderBlackList() {

  const navigate = useNavigate();
  const [num, setNum] = useState(10);
  ///////////////////////////////////////////
  function getAllLastNews() {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=Traitors&limit=${num}`
    );
  }
  const { data } = useQuery("Traitors3", getAllLastNews, {
    cacheTime: 1800000,
  });
  
 /////////////////////////////////
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={() => {
          setNum((e) => e + 5);
          onClick();
        }}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  let settings = {
    dots: false,
    infinite:
      data?.data.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div>
      <div className="container">
        <div className="slider-container px-4 position-relative">
          <Slider {...settings}>
            {data?.data
         
              .map((sym, i) => (
                <div className="slide mx-2" key={i}>
                  <div className="image mb-2 mx-2 ">
                    <img
                      src={`https://syrianrevolution1.com/postImages/${sym.selfImg}`}
                      alt="symbolThowra"
                      className=" w-100 slide-image"
                      style={{ height: "250px" }}
                    />
                  </div>
                  <p className="px-2" style={{ textAlign: "center" }}>
                    {sym?.name ? sym?.name : ""}
                    <br />
                    <small className="datedSlider">
                      {sym?.createdAt && sym?.createdAt.slice(0, 10)}
                    </small>
                    <button
                      className=" d-inline-block mx-1  rounded-3 btu"
                      onClick={() => navigate(`/newsDetails/${sym._id}`)}
                    >
                      المزيد
                    </button>
                  </p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
