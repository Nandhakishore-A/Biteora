import { assets } from "../../assets/assets";
import "./Add.css";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CATEGORIES = [
  "Salad",
  "Rolls",
  "Desserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
  "Biryani",
  "Pizza",
  "Burger",
  "Beverages"
];

const PREP_TIMES = ["10-15 mins", "15-20 mins", "20-25 mins", "25-30 mins", "30-40 mins"];

const Add = ({ url, token: propToken }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    isVeg: true,
    prepTime: "20-25 mins",
    calories: "350 kcal"
  });

  const handleImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, or WEBP)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file size exceeds 2MB limit. Please choose a smaller image.");
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleImageChange(file);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const adjustPrice = (amount) => {
    const current = Number(data.price) || 0;
    const updated = Math.max(0, current + amount);
    setData((prev) => ({ ...prev, price: String(updated) }));
  };

  const resetForm = () => {
    setData({
      name: "",
      description: "",
      price: "",
      category: "Salad",
      isVeg: true,
      prepTime: "20-25 mins",
      calories: "350 kcal"
    });
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image for this dish");
      return;
    }

    if (!data.name.trim()) {
      toast.error("Please enter a valid dish name");
      return;
    }

    const priceNum = Number(data.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toast.error("Price must be a positive number greater than 0");
      return;
    }

    setLoading(true);
    const token = propToken || localStorage.getItem("adminToken");

    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("price", priceNum);
      formData.append("category", data.category);
      formData.append("isVeg", data.isVeg);
      formData.append("prepTime", data.prepTime);
      formData.append("calories", data.calories);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          token,
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success(response.data.message || `"${data.name}" added to menu successfully!`);
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to add food item");
      }
    } catch (error) {
      console.error("Add food error:", error);
      toast.error(error.response?.data?.message || "Failed to publish dish to Biteora");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page panel-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalog Management</p>
          <h2>Add New Dish</h2>
        </div>
        <p className="section-note">
          Fill in dish details, upload a photo to Cloudinary, and publish instantly to the live Biteora catalog.
        </p>
      </div>

      <div className="add-content-grid">
        {/* Left Column: Form */}
        <form className="add-form" onSubmit={onSubmitHandler}>
          {/* Image Upload Area */}
          <div className="form-group">
            <label className="form-label">
              Dish Image <span className="req">*</span>
            </label>
            <div
              className={`dropzone ${isDragging ? "dragging" : ""} ${imagePreview ? "has-image" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                onChange={handleFileSelect}
                type="file"
                accept="image/*"
                hidden
              />
              {imagePreview ? (
                <div className="preview-container">
                  <img src={imagePreview} alt="Dish Preview" className="uploaded-preview" />
                  <div className="preview-overlay">
                    <button type="button" className="action-btn change-btn" onClick={() => fileInputRef.current?.click()}>
                      Change Photo
                    </button>
                    <button type="button" className="action-btn remove-btn" onClick={removeImage}>
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="dropzone-placeholder">
                  <div className="upload-icon-circle">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="dropzone-title">Click or drag image here to upload</p>
                  <p className="dropzone-hint">JPG, PNG, WEBP up to 2MB (Streamed directly to Cloudinary)</p>
                </div>
              )}
            </div>
          </div>

          {/* Dish Name */}
          <div className="form-group">
            <div className="label-with-meta">
              <label className="form-label" htmlFor="dish-name">
                Dish Title <span className="req">*</span>
              </label>
              <span className="char-count">{data.name.length}/60</span>
            </div>
            <input
              id="dish-name"
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="e.g. Signature Truffle Paneer Bowl"
              maxLength={60}
              required
              className="text-input"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <div className="label-with-meta">
              <label className="form-label" htmlFor="dish-desc">
                Description & Ingredients <span className="req">*</span>
              </label>
              <span className="char-count">{data.description.length}/200</span>
            </div>
            <textarea
              id="dish-desc"
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows={4}
              placeholder="Detailed description of flavors, culinary style, and core ingredients..."
              maxLength={200}
              required
              className="textarea-input"
            />
          </div>

          {/* Category & Diet Row */}
          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">
                Category <span className="req">*</span>
              </label>
              <select
                name="category"
                value={data.category}
                onChange={onChangeHandler}
                className="select-input"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Dietary Type</label>
              <div className="segmented-control">
                <button
                  type="button"
                  className={`segment-btn ${data.isVeg ? "active veg" : ""}`}
                  onClick={() => setData((p) => ({ ...p, isVeg: true }))}
                >
                  <span className="diet-dot veg-dot"></span> Vegetarian
                </button>
                <button
                  type="button"
                  className={`segment-btn ${!data.isVeg ? "active non-veg" : ""}`}
                  onClick={() => setData((p) => ({ ...p, isVeg: false }))}
                >
                  <span className="diet-dot non-veg-dot"></span> Non-Veg
                </button>
              </div>
            </div>
          </div>

          {/* Price, Prep Time, and Calories */}
          <div className="form-row three-col">
            <div className="form-group">
              <label className="form-label">
                Price (₹) <span className="req">*</span>
              </label>
              <div className="price-input-wrap">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  placeholder="249"
                  min="1"
                  required
                  className="text-input price-input"
                />
              </div>
              <div className="quick-price-chips">
                <button type="button" onClick={() => adjustPrice(20)}>+₹20</button>
                <button type="button" onClick={() => adjustPrice(50)}>+₹50</button>
                <button type="button" onClick={() => adjustPrice(100)}>+₹100</button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Prep Time</label>
              <select
                name="prepTime"
                value={data.prepTime}
                onChange={onChangeHandler}
                className="select-input"
              >
                {PREP_TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Calories</label>
              <input
                type="text"
                name="calories"
                value={data.calories}
                onChange={onChangeHandler}
                placeholder="e.g. 350 kcal"
                className="text-input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="publish-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Streaming to Cloudinary...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Publish Dish to Biteora
                </>
              )}
            </button>
            <button type="button" className="reset-btn" onClick={resetForm} disabled={loading}>
              Reset
            </button>
          </div>
        </form>

        {/* Right Column: Live Storefront Card Preview */}
        <div className="preview-column">
          <div className="preview-sticky-card">
            <div className="preview-header">
              <span className="preview-badge">Live Storefront Preview</span>
              <span className="preview-hint">How customers will see this item</span>
            </div>

            <div className="mockup-card">
              <div className="mockup-image-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Mockup preview" className="mockup-img" />
                ) : (
                  <div className="mockup-placeholder">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Upload an image to see card preview</span>
                  </div>
                )}
                <div className="mockup-category-tag">{data.category || "Category"}</div>
                <div className={`mockup-diet-tag ${data.isVeg ? "veg" : "non-veg"}`}>
                  <span className="diet-dot"></span>
                </div>
              </div>

              <div className="mockup-details">
                <div className="mockup-title-row">
                  <h4 className="mockup-title">{data.name || "Delicious Dish Name"}</h4>
                  <div className="mockup-rating">★ 4.8</div>
                </div>

                <p className="mockup-desc">
                  {data.description || "Fresh ingredients cooked to perfection with chef signature spices and seasoning."}
                </p>

                <div className="mockup-meta-row">
                  <span>⏱ {data.prepTime || "20-25 mins"}</span>
                  <span>🔥 {data.calories || "350 kcal"}</span>
                </div>

                <div className="mockup-footer">
                  <div className="mockup-price">
                    <span className="currency">₹</span>
                    <span className="val">{data.price || "0"}</span>
                  </div>
                  <button type="button" className="mockup-add-btn" tabIndex="-1">
                    + Add
                  </button>
                </div>
              </div>
            </div>

            <div className="preview-footer-note">
              <span>✓ Fully responsive in Biteora storefront grid</span>
              <span>✓ Synchronized with Cloudinary image cache</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
