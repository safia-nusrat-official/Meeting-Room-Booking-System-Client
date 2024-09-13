import Lottie from "react-lottie";

const LottieAnimation = ({
  width = 200,
  height = 200,
  animationData,
}: {
  animationData: any;
  width?: number;
  height?: number;
}) => {
  const defaultOptions = {
    animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
