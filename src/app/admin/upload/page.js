"use client";
import React, { useEffect, useState } from "react";

export default function ReviewImageManager() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const API = "https://api.primevistajourney.com/api/reviews";

  const fetchImages = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    let current = 0;
    const fakeProgress = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 95) {
        current = 95;
        clearInterval(fakeProgress);
      }
      setProgress(Math.floor(current));
    }, 200);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      clearInterval(fakeProgress);

      if (res.ok) {
        setProgress(100);
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 400);
        setFile(null);
        setPreview("");
        fetchImages();
      } else {
        setUploading(false);
        setProgress(0);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Delete failed");
      }
      fetchImages();
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Review Image Manager
        </h1>

        {/* Upload Section */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <input type="file" onChange={handleChange} />

          {preview && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={preview}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <button
                onClick={() => {
                  setPreview("");
                  setFile(null);
                }}
                style={{ background: "red", color: "white", marginTop: "5px" }}
              >
                Remove
              </button>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "black",
              color: "white",
            }}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploading && (
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  background: "#e5e7eb",
                  height: "8px",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    background: "black",
                    height: "8px",
                    width: `${progress}%`,
                    borderRadius: "4px",
                  }}
                />
              </div>
              <p>{progress}%</p>
            </div>
          )}
        </div>

        {/* Image Grid - PLAIN HTML, NO TAILWIND */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                background: "white",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div style={{ height: "150px" }}>
                <img
                  src={img.image_url}
                  alt="review"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "block",
                }}
                onMouseOver={(e) => (e.target.style.background = "#b91c1c")}
                onMouseOut={(e) => (e.target.style.background = "#dc2626")}
              >
                {deletingId === img.id ? "Deleting..." : "DELETE"}
              </button>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}
          >
            No images uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}
