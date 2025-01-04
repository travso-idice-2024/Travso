export const getCroppedImg = (imageSrc, crop) => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = url;
      });
  
    return new Promise(async (resolve, reject) => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = crop.width;
      canvas.height = crop.height;
  
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
  
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return reject(new Error("Canvas is empty"));
        }
        blob.name = "croppedImage.png";
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  };
  