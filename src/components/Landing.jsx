import React from "react";
import { Link } from "react-router-dom";
import { IconUserCheck, IconCodeMinus } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import LanguageList from "./LanguageList";
import "@fontsource/ibm-plex-sans/200.css";
import { TextGenerateEffectDemo } from "./TextGeneration";
const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">{children}</div>
  );
};

const HeroSection = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="relative bg-gray-900" id="home">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-30"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-blue-900 via-indigo-900 to-indigo-700 opacity-80"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-800 via-indigo-900 to-indigo-800 opacity-80"></div>
      </div>
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-100 font-bold text-5xl md:text-6xl xl:text-6xl homeTitle">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Accelerate Development
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                with Innovation
              </span>
            </h1>
            <p className="mt-8 text-gray-300">
              <TextGenerateEffectDemo />
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              {!isLoggedIn ? (
                <Link to="/auth" className="z-50">
                  <button
                    type="button"
                    class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    <span className="md:text-xl text-sm flex items-center mx-1 px-1">
                      <IconUserCheck />
                      Sign up for Free
                    </span>
                  </button>
                </Link>
              ) : null}
              <Link to="/code-editor" className="z-10">
                <button
                  type="button"
                  class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  <span className="md:text-xl text-sm flex items-center mx-1 px-1">
                    <IconCodeMinus />
                    Demo
                  </span>
                </button>
              </Link>
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-white">
                  The lowest price
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-white">
                  The fastest on the market
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-white">
                  The most loved
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/microsoft.svg"
                className="h-12 w-auto mx-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/airbnb.svg"
                className="h-12 w-auto mx-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
            <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/google.svg"
                className="h-9 w-auto m-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/ge.svg"
                className="h-12 w-auto mx-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
            <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/netflix.svg"
                className="h-8 w-auto m-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
              <img
                src="./images/clients/google-cloud.svg"
                className="h-12 w-auto mx-auto"
                loading="lazy"
                alt="client logo"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Stats = () => {
  return (
    <div id="solution" className="bg-gray-900 relative pb-28">
      <Container>
        <div className="space-y-6 justify-between text-gray-300 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center relative z-20">
          {/* Gradient background divs */}

          {/* Pie image div */}
          <div className="md:5/12 lg:w-1/2 relative z-30">
            <img
              src="./images/pie.svg"
              alt="image"
              loading="lazy"
              width=""
              height=""
              className="w-full"
            />
          </div>

          {/* Text content div */}
          <div className="md:7/12 lg:w-1/2 relative z-30">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Nuxt development is carried out by passionate developers
            </h2>
            <p className="my-8 text-gray-300">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p>
            <div className="divide-y space-y-4 divide-gray-800">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                    Real Time Location
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-indigo-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm.75 4.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                    Chat Anytime
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const HeroStatsPage = () => {
  return (
    <div>
      <HeroSection />

      <Stats />
      <LanguageList />
    </div>
  );
};

export default HeroStatsPage;
