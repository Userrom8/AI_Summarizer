import { useState, useEffect, useRef } from "react";

import { copy, loader, tick, linkIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const delHistory = () => {
    localStorage.clear();

    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    } else setAllArticles([]);
  };

  const [showDeletion, setshowDeletion] = useState(false);

  const acknowledgeDeletion = () => {
    setshowDeletion(true);
    setTimeout(() => {
      setshowDeletion(false);
    }, 3000);
  };

  const showHistory = () => {
    if (localStorage.length > 0)
      return (
        <div className="flex items-center justify-between w-full px-4">
          <p className="text-sm text-gray-600 sm:text-xs text-center">
            History
          </p>
          <button
            className="flex items-center justify-center w-8 h-8 rounded text-gray-400 hover:text-gray-600 transition-all"
            // onClick={() => delHistory()}
            // onClick={() => acknowledgeDeletion()}
            onClick={() => {
              delHistory();
              acknowledgeDeletion();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      );
  };

  const historySection = (item, index) => {
    return (
      <div
        key={`link-${index}`}
        onClick={() => setArticle(item)}
        className="link_card"
      >
        <div className="copy_btn" onClick={() => handleCopy(item.url)}>
          <img
            src={copied === item.url ? tick : copy}
            alt="copy_icon"
            className="w-[40%] h-[40%] object-contain"
          />
        </div>
        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm turncate">
          {item.url}
        </p>
      </div>
    );
  };

  const showHistorySection = () => {
    return allArticles.map(historySection);
  };

  const summaryRef = useRef(null);

  useEffect(() => {
    if (article.summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [article.summary]);

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            id="input"
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn
             peer-focus:border-gray-700
              peer-focus:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-corner-down-left"
            >
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </button>
        </form>

        {/* Browse URL History */}

        <div className="flex items-center justify-center">{showHistory()}</div>

        <div className="flex-col gap-1 max-h-60 overflow-y-auto">
          {showHistorySection()}
        </div>
      </div>

      {/* Display Results */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            well, that wasn&apos;t supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div ref={summaryRef} className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      {showDeletion && (
        <div className="sticky bottom-10 flex justify-center items-center animate-slide-in-from-bottom">
          <div className="py-2 px-4 bg-white rounded shadow flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1"
                x1="9.858"
                x2="38.142"
                y1="9.858"
                y2="38.142"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#9dffce"></stop>
                <stop offset="1" stopColor="#50d18d"></stop>
              </linearGradient>
              <path
                fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              ></path>
              <linearGradient
                id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2"
                x1="13"
                x2="36"
                y1="24.793"
                y2="24.793"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".824" stopColor="#135d36"></stop>
                <stop offset=".931" stopColor="#125933"></stop>
                <stop offset="1" stopColor="#11522f"></stop>
              </linearGradient>
              <path
                fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)"
                d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
              ></path>
            </svg>
            <p>History deleted successfully !</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
