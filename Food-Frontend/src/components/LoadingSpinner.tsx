import Letter from "../assets/letter.png";
import Spoon from "../assets/spoon.png";
import Fork from "../assets/fork.png";
import Toque from "../assets/toque.png";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex items-center justify-center">
        <img
          className="absolute w-28 bottom-8 animate-color-change-right"
          src={Letter}
          alt="Letter"
          loading='lazy'
        />
        <img className="absolute w-5 right-5" src={Spoon} alt="Spoon"loading='lazy' />
        <div className="animate-spin rounded-full h-20 w-20 md:w-40 lg:h-52 md:h-40 lg:w-52 border-t-4 border-orange-500"></div>
        <img className="absolute w-5 left-5" src={Fork} alt="Fork" loading='lazy'/>
        <img
          className="absolute w-28 top-4 animate-color-change-right"
          src={Toque}
          alt="Toque"
          loading='lazy'
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
