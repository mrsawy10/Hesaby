
const Slider = ({
  background,
  titleAsImage,
  price,
  url,
}: {
  background: string;
  titleAsImage?: string;
  price: string;
  url: string;
}) => {
  return (
    <div data-src={background} style={{ backgroundImage: `url(${background})` }}>
      testt
      {/* <div className="m-auto text-center lg:m-1 lg:w-1/3"> */}
      {/* <img src={titleAsImage} /> */}
      {/* <SliderButton price={price} url={url} /> */}
      {/* </div> */}
    </div>
  );
};

export default Slider;
