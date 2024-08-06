import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Dummy data for slider (replace with actual data or component as needed)
  const sliderImages = [
    "https://images.pexels.com/photos/834897/pexels-photo-834897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/851213/pexels-photo-851213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // CSS Styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#0698f9",
      padding: "10px 20px",
      color: "#fff",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
    },
    navLinks: {
      listStyleType: "none",
      display: "flex",
    },
    navLinkItem: {
      marginRight: "20px",
    },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
    },
    welcome: {
      backgroundColor: "rgb(55 44 78)",
      padding: "40px 20px",
      textAlign: "center",
    },
    welcomeHeading: {
      fontSize: "36px",
      marginBottom: "20px",
      color: "#0698f9",
    },
    welcomeText: {
      fontSize: "18px",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    welcomeLink: {
      color: "#0698f9",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
    },
    slider: {
      margin: "40px 0",
    },
    sliderContainer: {
      display: "flex",
      width:"99%",
      height:"359px",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    },
    sliderImage: {
      // minWidth: "100%",
      scrollSnapAlign: "start",
      marginRight: "10px",
      borderRadius: "8px",
    },
    posts: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    post: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    postImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderBottom: "1px solid #ddd",
    },
    postContent: {
      padding: "20px",
    },
    postTitle: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    postDescription: {
      fontSize: "16px",
      color: "#666",
      lineHeight: "1.6",
    },
    readMoreButton: {
      backgroundColor: "#0698f9",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    readMoreButtonHover: {
      backgroundColor: "#0578c8",
    },
  };

  return (
    <div style={styles.container}>
 
      {/* Welcome Section */}
      <div style={styles.welcome}>
        <div style={styles.welcomeContent}>
          <h1 style={styles.welcomeHeading}>Welcome to Our Blog</h1>
          <p style={styles.welcomeText}>
            Explore our latest articles on various topics. Join our community
            and start reading today.
          </p>
          <p>
            Ready to dive in?{" "}
            <Link to="/blog" style={styles.welcomeLink}>
              Start Reading
            </Link>
          </p>
        </div>
      </div>

      {/* Slider */}
      <div style={styles.slider}>
        <div style={styles.sliderContainer}>
          {sliderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={styles.sliderImage}
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      <div style={styles.posts}>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div style={styles.post} key={post.id}>
              <div className="img">
                <img
                  src={`../upload/${post.img}`}
                  alt=""
                  style={styles.postImage}
                />
              </div>
              <div style={styles.postContent}>
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 style={styles.postTitle}>{post.title}</h1>
                </Link>
                <p style={styles.postDescription}>{getText(post.desc)}</p>
                <button style={styles.readMoreButton}>Read More</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
