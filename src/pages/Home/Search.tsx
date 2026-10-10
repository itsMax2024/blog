// SearchPage.js
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Title from "../../components/Title/Title";
import { useAuth } from "../../contexts/AuthContext";

function Search() {
  const { isAuthenticated, user, logout } = useAuth();

  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <section className="search-section">
        <div className="all-articles">
          <Title title={`نتایج جستجو برای ${query}`} />
          {loading && <p>Loading...</p>}
          {!loading && results.length === 0 && (
            <p>نتیجه ای یافت نشد! "{query}".</p>
          )}
          {results.map((article) => (
            <div className="article">
              <Link to={`/post/${article.id}`}>
                <div className="article-context">
                  <img src="/assets/fire.png" alt="" />
                  <h2>{article.title}</h2>
                </div>
                <div className="article-info">
                  <div className="comments-wrapper">
                    <img src="/assets/comment.png" alt="" />
                    <p>20</p>
                  </div>
                  <div className="date-wrapper">
                    <img src="/assets/date.png" alt="" />
                    <p>{article.created}</p>
                  </div>
                </div>
                <div className="article-img">
                  <img
                    src={`http://127.0.0.1:8000${article.image}`}
                    alt={article.title}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Search;
