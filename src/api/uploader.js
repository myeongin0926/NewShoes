const cloudinaryPreset = import.meta.env.VITE_APP_CLOUDINARY_PRESET;
const cloudinaryURL = import.meta.env.VITE_APP_CLOUDINARY_URL;


export async function uploadImage(file) {
    const data = new FormData()
    data.append('file', file)
    data.append("upload_preset", cloudinaryPreset);

    const result = await fetch(cloudinaryURL, {
        method: "POST",
        body:data
    });
    result.json()
    return result.url
}