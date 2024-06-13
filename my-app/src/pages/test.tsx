import React, { useEffect, useState } from 'react';

const ShowSignedImage = ({ imageKey }: { imageKey: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  imageKey = "image_1718232596416.jpg"

  useEffect(() => {
    const fetchImageUrl = async () => {
      const res = await fetch(`/api/s3-get-url?key=${imageKey}`);
      const data = await res.json();
      setImageUrl(data.url);
    };

    fetchImageUrl();
  }, [imageKey]);

  if (!imageUrl) return <p>Loading...</p>;

  return (
    <div>
      <img src={imageUrl} alt="Uploaded to S3" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default ShowSignedImage;
