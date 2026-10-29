# 🚀 Biteora — Vercel Deployment Guide

This guide covers how to deploy the entire Biteora platform (Customer Storefront, Admin Dashboard, and Express Backend) on [Vercel](https://vercel.com).

---

## 🏗️ Deployment Architecture

Biteora is structured as a monorepo with three independent sub-projects:

| Component | Directory | Tech Stack | Vercel Framework Preset | Live Production URL |
| :--- | :--- | :--- | :--- | :--- |
| **Backend REST API** | `backend` | Express 5 Serverless | **Other / Node.js** | [https://biteorabackend.vercel.app](https://biteorabackend.vercel.app) |
| **Customer Storefront** | `frontend` | React 19 + Vite 7 | **Vite** | [https://biteora-frontend.vercel.app](https://biteora-frontend.vercel.app) |
| **Admin Dashboard** | `admin` | React 19 + Vite 7 | **Vite** | [https://biteora-admin.vercel.app](https://biteora-admin.vercel.app) |

Each component is deployed as an independent Vercel project linked to your GitHub repository [`https://github.com/Nandhakishore-A/Biteora`](https://github.com/Nandhakishore-A/Biteora).

---

## 1. Deploy the Backend REST API

Deploy the backend first so you have its live production URL (`https://biteorabackend.vercel.app`) to plug into the frontend and admin.

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** ➔ **Project**.
2. Select your repository: **`Nandhakishore-A/Biteora`**.
3. Under **Project Name**, enter: `biteorabackend`.
4. In **Root Directory**, click **Edit** and select **`backend`**.
5. Framework Preset: **Other**.
6. Expand **Environment Variables** and add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://<username>:<password>@cluster0.k07nk6k.mongodb.net/biteora?retryWrites=true&w=majority` | Your MongoDB Atlas connection URI |
| `JWT_SECRET` | `your_secure_random_jwt_secret` | Secret key for signing customer JWT tokens |
| `ADMIN_SECRET_KEY` | `your_secure_admin_secret_key` | Admin authentication secret key |
| `ADMIN_PASSWORD` | `your_admin_login_password` | Admin login password |
| `CLOUDINARY_CLOUD_NAME` | `your_cloudinary_cloud_name` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `your_cloudinary_api_key` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | `your_cloudinary_api_secret` | Cloudinary Secret Key |
| `CLOUDINARY_FOLDER` | `mern_stack_project_storage/Biteora` | Storage folder |
| `FRONTEND_URL` | `https://biteora-frontend.vercel.app` | Deployed customer storefront URL |
| `ADMIN_URL` | `https://biteora-admin.vercel.app` | Deployed admin dashboard URL |

7. Click **Deploy**.
8. Once finished, verify by visiting `https://biteorabackend.vercel.app/api/health`.

---

## 2. Deploy the Customer Storefront

1. In Vercel, click **Add New...** ➔ **Project** and select **`Nandhakishore-A/Biteora`**.
2. Under **Project Name**, enter: `biteora-frontend`.
3. In **Root Directory**, click **Edit** and select **`frontend`**.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build` (default).
6. Output Directory: `dist` (default).
7. Under **Environment Variables**, add:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://biteorabackend.vercel.app` |

8. Click **Deploy**.
9. The included `frontend/vercel.json` automatically ensures all client-side routes (like `/order`, `/myorders`, `/verify`) resolve without 404 errors.

---

## 3. Deploy the Restaurant Admin Dashboard

1. In Vercel, click **Add New...** ➔ **Project** and select **`Nandhakishore-A/Biteora`**.
2. Under **Project Name**, enter: `biteora-admin`.
3. In **Root Directory**, click **Edit** and select **`admin`**.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build` (default).
6. Output Directory: `dist` (default).
7. Under **Environment Variables**, add:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://biteorabackend.vercel.app` |

8. Click **Deploy**.
9. The included `admin/vercel.json` provides seamless Single Page Application routing for `/dashboard`, `/add`, `/list`, and `/orders`.

---

## ⚙️ Included Vercel Configurations

The codebase includes pre-configured routing files:

- `frontend/vercel.json` — Rewrites all SPA paths to `/index.html`.
- `admin/vercel.json` — Rewrites admin paths to `/index.html`.
- `backend/vercel.json` & `backend/api/index.js` — Routes API traffic to the serverless Express engine.
- `vercel.json` — Top-level fallback for one-click root deployments.
