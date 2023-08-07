const cloudinaryPreset = import.meta.env.VITE_APP_CLOUDINARY_PRESET;
const cloudinaryURL = import.meta.env.VITE_APP_CLOUDINARY_URL;
export async function uploadImage(file) {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", cloudinaryPreset);

    const result = await fetch(cloudinaryURL, {
      method: "POST",
      body: data,
    });

    const jsonData = await result.json();

    return jsonData.url;
  } catch (e) {
    console.log(e);
  }
}
