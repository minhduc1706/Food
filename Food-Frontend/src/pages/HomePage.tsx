import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { searchForm } from "src/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useGetAllRestaurant } from "src/api/RestaurantListApi";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValue: searchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  const { restaurants } = useGetAllRestaurant();

  const allCity = new Set<string>();

  restaurants?.forEach((r) => {
    allCity.add(r.city);
  });
  const uniqueCities = Array.from(allCity);

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="md:text-3xl lg:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a take away today
        </h1> 
        <span className="text-xl">Food is just a click!</span>
        <SearchBar
          placeHolder="Search by city or town"
          onSubmit={handleSearchSubmit}
          suggestions={uniqueCities}
          searchType="city"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="mobileImage" loading='lazy'/>
        <div className="flex flex-col items-center justify-center gap-4 text-center">   
          <span className="font-bold text-3xl tracking-tighter">
            Order take away even faster!
          </span>
          <span className="text-lg">
            Download the {<span className="text-orange-500 font-bold">DeliGo</span>} App for faster ordering and personalized
            recommendations
          </span>
          <img src={appDownloadImage} alt="downloadImage" loading='lazy'/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
