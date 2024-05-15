import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./SliderSymbolThoura.css";
import axios from "axios";


export default function SliderTakrem() {
     const [lastNews, setLastNews] = useState([]);
     const [num, setNum] = useState(5);
     const navigate = useNavigate();
     useEffect(() => {
       async function getAllLastNews() {
         await axios
           .get(
             `https://syrianrevolution1.com/lists/search?category=takrem&limit=${num}`
           )
           .then((result) => {
             setLastNews(result?.data);
           })
           .catch((error) => console.log(error));
       }
       getAllLastNews();
     }, [num]);


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "gray" }}
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
        style={{ ...style, display: "block",color:'gray' }}
        onClick={onClick}
      />
    );
  }
  let settings = {
    dots: false,
    infinite:
      lastNews.length > 1 ? true : false,
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
    <div className="mb-5">
      <div className="container">
        <div className="slider-container px-4 position-relative">
          <Slider {...settings}>
            {lastNews
              .filter((e) => e.category === "takrem")
              .map((sym, i) => (
                <div className="slide mx-2" key={i}>
                  <div className="image mb-2 mx-2 ">
                    <img
                      src={`https://syrianrevolution1.com/postImages/${sym.selfImg}`}
                      alt="symbolThowra"
                      className=" w-100 slide-image"
                      style={{height:'250px'}}
                    />
                  </div>
                  <p className="px-2 text-center">
                    {sym?.name ? sym?.name : ""}
                    <br />
                    <small className="datedSlider">
                      {sym?.createdAt && sym?.createdAt.slice(0,10)}
                    </small>
                    <button
                      className="d-inline-block mx-1 px-3 rounded-3 btu"
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
