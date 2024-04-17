import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [cityData, setCityData] = useState<any>([]);
  const [lastIndex, setLastIndex] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/exports/json"
        )
        .then((response) => {
          setIsError(false);
          setCityData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset === 0) {
        setLastIndex(20);
      } else if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        setLastIndex(lastIndex + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastIndex]);

  const filteredCities = cityData.filter((city: any) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <Header />
      <div className="homeMainContainer">
        <input
          type="text"
          className="homeInput"
          placeholder="Search for city..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="hometext1">
          {cityData
            ? `Total Cities Found ${filteredCities.length}`
            : "Some Error Occured please refresh the page"}
        </div>

        <div className="homeTableContainer">
          <table className="homeTable">
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Timezone</th>
                <th>Population</th>
                <th>Country Code</th>
                <th>Coordinates</th>
              </tr>
            </thead>
            {!isError && !loading ? (
              <tbody>
                {filteredCities
                  .slice(0, lastIndex)
                  .map((city: any, index: number) => (
                    <tr key={index}>
                      <td style={{ cursor: "pointer" }}>
                        <Link
                          to={
                            {
                              pathname: `/weather`,
                              search: `?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}`,
                            } as any
                          }>
                          {city.name}
                        </Link>
                      </td>
                      <td>{city.cou_name_en}</td>
                      <td>{city.timezone}</td>
                      <td>{city.population}</td>
                      <td>{city.country_code}</td>
                      <td>
                        {`Lat: ${city.coordinates?.lat}`}
                        <br />
                        {`Lon: ${city.coordinates?.lon}`}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : loading ? (
              <div className="homeLoadingText">Loading...</div>
            ) : (
              <div className="homeLoadingText">Some Error Occured</div>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
